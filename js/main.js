/* SPA offline: classic scripts, hash routes, demand-first loading.
 * Page contract: registerPage(appId, pageId, { render(root, ctx), features, afterRender }).
 * render/afterRender may return a cleanup function (sync or async).
 * ctx: lang, signal, data, onCleanup(fn), navigate(appId, pageId).
 * Features are opt-in: {carousel: true|options, beerslider: true|options}.
 * Markup: [data-carousel] and [data-beer-slider] (BeerSlider's two-child structure).
 * No data-bs-ride: the lifecycle owns initialization and disposal.
 * App/page data files are scripts assigning Exhibition.data; no fetch under file:///.
 */
(function () {
  'use strict';
  const router = window.ExhibitionRoutes;
  const config = router.config;
  const apps = (config.apps || []).filter(app => app.enabled !== false);
  const root = document.getElementById(config.shell.root);
  const pages = new Map(), resources = new Map(), jobs = new Map(), positions = new Map();
  const queue = [];
  let running = 0, backgroundRunning = 0, current = null, generation = 0;
  let language = 'vi';
  try { language = localStorage.getItem('exhibition.language') === 'en' ? 'en' : 'vi'; } catch (_) {}
  const messages = {
    vi: {loading:'Đang tải nội dung…', empty:'Chưa có ứng dụng được cấu hình.', missing:'Không tìm thấy trang.', error:'Không thể tải trang.', retry:'Thử lại', home:'Trang chủ'},
    en: {loading:'Loading content…', empty:'No applications configured yet.', missing:'Page not found.', error:'Unable to load page.', retry:'Retry', home:'Home'}
  };
  function text(key) { return messages[language][key]; }
  function appById(id) { return apps.find(app => app.id === id); }
  function keyOf(app, page) { return app + '/' + page; }
  function guard(signal) { if (signal.aborted) throw new DOMException('Aborted', 'AbortError'); }
  function pump() {
    queue.sort((a,b) => a.priority - b.priority);
    while (running < 2) {
      const index = queue.findIndex(job => job.priority === 0 || backgroundRunning === 0);
      if (index < 0) return;
      const job = queue.splice(index,1)[0];
      const background = job.priority > 0;
      job.started = true; running++; if (background) backgroundRunning++;
      Promise.resolve().then(job.run).then(job.resolve, error => {
        jobs.delete(job.key); job.reject(error);
      }).finally(() => { running--; if (background) backgroundRunning--; pump(); });
    }
  }
  function schedule(key, run, priority) {
    let job = jobs.get(key);
    if (job) { job.priority = Math.min(job.priority,priority); pump(); return job.promise; }
    job = {key, run, priority};
    job.promise = new Promise((resolve,reject) => { job.resolve=resolve; job.reject=reject; });
    jobs.set(key,job); queue.push(job); pump(); return job.promise;
  }
  function resource(url, css = false) {
    const absolute = new URL(url, document.baseURI).href;
    if (!['file:', 'http:', 'https:'].includes(new URL(absolute).protocol)) throw new Error('Invalid resource URL');
    // HTTP local preview is supported; external hosts are not part of this offline loader.
    if (new URL(absolute).origin !== location.origin) throw new Error('External resource: ' + url);
    if (resources.has(absolute)) return resources.get(absolute).promise;
    const existing = [...document.querySelectorAll(css ? 'link[rel="stylesheet"]' : 'script[src]')]
      .find(element => new URL(css ? element.href : element.src, document.baseURI).href === absolute);
    if (existing) {
      const entry = {node:existing, css, shared:css};
      entry.promise = Promise.resolve(existing);
      resources.set(absolute,entry);
      return entry.promise;
    }
    const node = document.createElement(css ? 'link' : 'script');
    if (css) { node.rel='stylesheet'; node.href=absolute; node.media='not all'; }
    else { node.src=absolute; node.async=false; }
    const entry = {node, css};
    entry.promise = new Promise((resolve,reject) => {
      const timer = setTimeout(() => fail(),30000);
      function fail() { clearTimeout(timer); node.remove(); resources.delete(absolute); reject(new Error('Cannot load ' + url)); }
      node.onload=() => { clearTimeout(timer); resolve(node); }; node.onerror=fail;
      document.head.appendChild(node);
    });
    resources.set(absolute,entry); return entry.promise;
  }
  async function loadList(items, css) { for (const url of items || []) await resource(url,css); }
  async function loadPage(app, pageId) {
    const page = app.pages[pageId];
    await loadList(app.styles,true); await loadList(app.scripts,false);
    await loadList(page.styles,true); await loadList(page.data,false);
    if (page.script) await resource(page.script);
    if (!pages.has(keyOf(app.id,pageId))) throw new Error('Page did not register: ' + keyOf(app.id,pageId));
    return pages.get(keyOf(app.id,pageId));
  }
  function ensurePage(app,page,priority=0) { return schedule(keyOf(app.id,page),() => loadPage(app,page),priority); }
  function preload(activeApp) {
    const ordered = [...apps].sort((a,b) => Number(b.id===activeApp)-Number(a.id===activeApp));
    ordered.forEach(app => Object.keys(app.pages).forEach(page => {
      ensurePage(app,page,1).catch(error => console.warn('Background preload:', error.message));
    }));
  }
  function activateStyles(app, page) {
    const active = new Set([...(app?.styles||[]),...(page?.styles||[])].map(url => new URL(url,document.baseURI).href));
    resources.forEach((entry,url) => { if (entry.css && !entry.shared) entry.node.media = active.has(url) ? 'all' : 'not all'; });
  }
  async function library(script,style,signal) {
    if (style) { const node = await resource(style,true); guard(signal); resources.get(node.href).shared=true; node.media='all'; }
    if (script) await resource(script); guard(signal);
  }
  function savePosition() {
    if (!current?.ready) return;
    positions.set(current.key, {x:window.scrollX,y:window.scrollY,
      slides:[...current.element.querySelectorAll('[data-carousel]')].map(el => [...el.querySelectorAll('.carousel-item')].findIndex(item => item.classList.contains('active'))),
      beers:[...current.element.querySelectorAll('[data-beer-slider] input[type=range]')].map(el=>el.value)});
  }
  function dispose() {
    if (!current) return;
    current.controller.abort();
    current.cleanups.reverse().forEach(fn => { try { fn(); } catch(error) { console.error(error); } });
    current = null;
  }
  function status(message, retry=false) {
    const box=document.createElement('div'); box.className='spa-message'; box.setAttribute('role','status'); box.textContent=message;
    if (retry) { const button=document.createElement('button'); button.textContent=text('retry'); button.onclick=()=>render(); box.append(' ',button); }
    root.replaceChildren(box);
  }
  function navigation() {
    document.documentElement.lang=language;
    document.title=language==='vi'?'Nội dung trưng bày':'Exhibition contents';
    const nav=document.getElementById(config.shell.navigation);
    if(nav){
      nav.replaceChildren();
      nav.setAttribute('aria-label',language==='vi'?'Ứng dụng':'Applications');
      apps.forEach(app=>{const a=document.createElement('a');a.href=router.href(app.id);a.textContent=typeof app.title==='object'?(app.title[language]||app.title.vi):app.title||app.id;nav.appendChild(a);});
    }
    const button=document.getElementById(config.shell.languageButton);
    if(button){
      button.textContent=language==='vi'?'English':'Tiếng Việt';
      button.setAttribute('aria-label',language==='vi'?'Switch to English':'Chuyển sang tiếng Việt');
    }
  }
  async function afterRender(element,definition,context,saved) {
    const dictionary=definition.messages?.[context.lang]||{};
    element.querySelectorAll('[data-i18n]').forEach(node=>{const value=dictionary[node.dataset.i18n];if(value!==undefined)node.textContent=value;});
    const features=definition.features||{};
    const beers=[], carousels=[];
    if (features.carousel && element.querySelector('[data-carousel]')) {
      await library('./js/libs/bootstrap/bootstrap.bundle.min.js','./css/libs/bootstrap/bootstrap.min.css',context.signal);
      element.querySelectorAll('[data-carousel]').forEach((node,index)=>{
        node.removeAttribute('data-bs-ride');
        const items=[...node.querySelectorAll('.carousel-item')];
        if (saved?.slides[index]>=0 && items[saved.slides[index]]) {
          items.forEach((item,i)=>item.classList.toggle('active',i===saved.slides[index]));
          node.querySelectorAll('[data-bs-slide-to]').forEach(indicator=>{
            const active=Number(indicator.dataset.bsSlideTo)===saved.slides[index];
            indicator.classList.toggle('active',active);
            if(active)indicator.setAttribute('aria-current','true');else indicator.removeAttribute('aria-current');
          });
        }
        const instance=new bootstrap.Carousel(node,{interval:false,ride:false,...(typeof features.carousel==='object'?features.carousel:{})});
        carousels.push(instance);context.onCleanup(()=>{
          // Bootstrap dispose() leaves timers running; finish transitions while the instance is valid.
          instance.pause();
          node.querySelectorAll('.carousel-item-start, .carousel-item-end').forEach(item=>{
            item.dispatchEvent(new Event('transitionend',{bubbles:true}));
          });
          // A pending slid handler can restart cycling when the transition finishes.
          instance.pause();
          clearTimeout(instance.touchTimeout);
          instance.dispose();
        });
      });
    }
    if (features.beerslider && element.querySelector('[data-beer-slider]')) {
      await library('./js/libs/beerslider/beerslider.js','./css/libs/beerslider/beerslider.css',context.signal);
      // Original BeerSlider has anonymous window.resize handlers and no destroy.
      // Override only its automatic lifecycle; retain its layout/drag implementation.
      class ScopedBeer extends window.BeerSlider { onImagesLoad() {} addListeners() {} }
      for (const [index,node] of [...element.querySelectorAll('[data-beer-slider]')].entries()) {
        if (node.children.length!==2 || !node.children[1].children.length) continue;
        const slider=new ScopedBeer(node,{...(typeof features.beerslider==='object'?features.beerslider:{}),start:saved?.beers[index]||node.dataset.beerStart||50});
        const images=[...node.querySelectorAll('img')];
        const refresh=()=>{if(!context.signal.aborted && node.getBoundingClientRect().width>0) slider.setImgWidth();};
        slider.init();
        const start=saved?.beers[index] ?? node.dataset.beerStart;
        if(start!==undefined){slider.range.value=String(Math.max(0,Math.min(100,Number(start)||0)));slider.move();}
        beers.push(slider);
        slider.range.setAttribute('aria-label',context.lang==='vi'?'Tỷ lệ ảnh so sánh':'Image comparison percentage');
        for (const event of ['input','change']) slider.range.addEventListener(event,()=>slider.move(),{signal:context.signal});
        images.forEach(img=>img.addEventListener('load',refresh,{signal:context.signal}));
        const observer=new ResizeObserver(refresh); observer.observe(node);context.onCleanup(()=>observer.disconnect());
        // Avoid triggering carousel swipes while dragging the comparison handle.
        ['pointerdown','touchstart','mousedown'].forEach(event=>slider.range.addEventListener(event,event=>event.stopPropagation(),{signal:context.signal}));
      }
    }
    if (beers.length && carousels.length) {
      element.addEventListener('slid.bs.carousel',()=>beers.forEach(slider=>{if(slider.element.getBoundingClientRect().width>0)slider.setImgWidth();}),{signal:context.signal});
    }
    if (typeof definition.afterRender==='function') {
      const cleanup=await definition.afterRender(element,context); context.onCleanup(cleanup);
    }
    guard(context.signal);
  }
  async function render() {
    const ticket=++generation; savePosition();dispose();navigation();
    const selected=router.current(); const app=selected&&appById(selected.app); const page=app?.pages[selected.page];
    if ((!selected || !app || !page) && location.hash !== '#/') {
      router.navigate('/');
      return;
    }
    activateStyles(null,null);
    if (!selected || !page) {root.setAttribute('aria-busy','false');status(text(selected?'missing':'empty'));window.scrollTo({left:0,top:0,behavior:"instant"});preload(null);return;}
    const controller=new AbortController(),cleanups=[];
    const element=document.createElement('section');element.dataset.app=app.id;
    current={key:keyOf(app.id,selected.page),controller,cleanups,element,ready:false};
    const saved=positions.get(current.key);
    const context={lang:language,signal:controller.signal,data:api.data,navigate:api.navigate,
      onCleanup(fn) { if(typeof fn!=='function')return;if(controller.signal.aborted)fn();else cleanups.push(fn); }};
    root.setAttribute('aria-busy','true');window.ExhibitionComponents.Loader.show(root,text('loading'));
    try {
      const definition=await ensurePage(app,selected.page);guard(controller.signal);
      const cleanup=await definition.render(element,context);context.onCleanup(cleanup);guard(controller.signal);
      activateStyles(app,page);root.replaceChildren(element);
      await afterRender(element,definition,context,saved);guard(controller.signal);
      context.onCleanup(window.ExhibitionComponents.Preview.attach(element,language,controller.signal));
      root.focus({preventScroll:true});window.scrollTo({left:saved?.x||0,top:saved?.y||0,behavior:"instant"});
      current.ready=true;
    } catch(error) {
      if (controller.signal.aborted || ticket!==generation) return;
      dispose();status(text('error')+' '+error.message,true);console.error(error);
    } finally {
      if(ticket===generation){window.ExhibitionComponents.Loader.hide(root);root.setAttribute('aria-busy','false');preload(app.id);}
    }
  }
  const api=window.Exhibition={
    data:{},
    registerPage(app,page,definition) {
      if(typeof definition.render!=='function')throw new Error('Page requires render()');
      const key=keyOf(app,page);if(pages.has(key))throw new Error('Duplicate page: '+key);pages.set(key,definition);
    },
    navigate: router.navigate,
    setLanguage(value) {if(!['vi','en'].includes(value)||value===language)return;language=value;try{localStorage.setItem('exhibition.language',value);}catch(_){}return render();},
    get language(){return language;},
    afterRender,
    preload:()=>preload(router.current()?.app)
  };
  const languageButton=document.getElementById(config.shell.languageButton);
  if(languageButton)languageButton.addEventListener('click',()=>api.setLanguage(language==='vi'?'en':'vi'));
  router.subscribe(render);
  window.addEventListener('pagehide',()=>{savePosition();dispose();});
  window.addEventListener('pageshow',event=>{if(event.persisted)render();});
  // Fail early on ambiguous manifests, before loading app scripts.
  const ids=new Set();
  for(const app of apps){if(!app.id||ids.has(app.id)||!app.pages?.index)throw new Error('Invalid app manifest: '+app.id);ids.add(app.id);}
  render();
})();

(function(){
  'use strict';
  const app=Exhibition.dongchaydisan=Exhibition.dongchaydisan||{templates:{},data:{}};
  const href=name=>ExhibitionRoutes.href('50nam','dongchaydisan/'+name);
  app.page=name=>({render(root,context){
    const en=context.lang==='en';
    root.innerHTML=`<div class="dcd-screen ${name==='index'?'dcd-home':''}" lang="${en?'en':'vi'}">${app.templates[name](app.data[name])}</div>`;
    const screen=root.firstElementChild;
    // Preserve the source's inline sizing against shared framework utilities.
    screen.querySelectorAll('[style]').forEach(el=>{for(const property of [...el.style])el.style.setProperty(property,el.style.getPropertyValue(property),'important');});
    screen.querySelectorAll('[onclick]').forEach(el=>{el.remove();});
    screen.querySelectorAll('.lang').forEach(el=>{el.hidden=!el.classList.contains(en?'lang-eng':'lang-vi');el.classList.remove('hidden');});
    screen.querySelectorAll('a[href]').forEach(a=>{const m=a.getAttribute('href').match(/^#\/(page[123])?$/);if(m)a.href=href(m[1]||'index');});
    screen.querySelectorAll('img').forEach(img=>{if(img.src.includes('/logo.png'))img.alt=en?'Ho Chi Minh City Museum':'Bảo tàng Thành phố Hồ Chí Minh';});
    if(name==='index')screen.querySelectorAll('footer>a').forEach(a=>{const b=a.querySelector('button');if(b){a.className=b.className+' dcd-chapter';a.append(...b.childNodes);b.remove();}});
    const bar=document.createElement('div');bar.className='dcd-toolbar';bar.innerHTML=`<button type="button" data-dcd-language>${en?'Tiếng Việt':'English'}</button>`;screen.prepend(bar);
    bar.querySelector('button').addEventListener('click',()=>Exhibition.setLanguage(en?'vi':'en'),{signal:context.signal});
    let footer=screen.querySelector('main>footer');
    if(!footer){footer=document.createElement('footer');footer.className='dcd-page-footer';screen.querySelector('section').append(footer);footer.innerHTML=`<a class="dcd-footer-button" href="${href('index')}"><span class="material-symbols-outlined" aria-hidden="true">arrow_back</span>${en?'Back':'Quay lại'}</a>`;}
    if(name==='index')footer.insertAdjacentHTML('beforeend',`<a class="dcd-footer-button dcd-exhibitions-button" href="${ExhibitionRoutes.href('cacchuyendekhac','index')}"><span class="material-symbols-outlined" aria-hidden="true">grid_view</span>${en?'More exhibitions':'Các chuyên đề'}</a>`);
    if(name!=='index'){
      const languageButton=bar.querySelector('button');
      const matchButtonSize=()=>{const bounds=languageButton.getBoundingClientRect();screen.style.setProperty('--dcd-language-width',bounds.width+'px');screen.style.setProperty('--dcd-language-height',bounds.height+'px');};
      const buttonResize=new ResizeObserver(matchButtonSize);buttonResize.observe(languageButton);matchButtonSize();
      context.signal.addEventListener('abort',()=>buttonResize.disconnect(),{once:true});
    }
    const carousel=screen.querySelector('#carousel');if(!carousel)return;
    initCarousel(carousel,screen,app.data[name],en,context.signal);
  }});

  function initCarousel(carousel,screen,data,en,signal){
    if(carousel.dataset.initialized==='true')return;
    const originals=[...carousel.querySelectorAll('.carousel-slide')];
    const count=originals.length,dots=[...screen.querySelectorAll('.indicator-dot')];
    if(!count)return;
    carousel.dataset.initialized='true';
    originals.forEach((slide,i)=>{slide.querySelector('img').alt=data[i][en?'desc2':'desc1']||'';});
    // Three identical tracks allow crossing either edge without reversing direction.
    if(count>1){
      const copy=slide=>{const clone=slide.cloneNode(true);clone.setAttribute('aria-hidden','true');clone.querySelectorAll('[id]').forEach(el=>el.removeAttribute('id'));return clone;};
      carousel.prepend(...originals.map(copy));
      carousel.append(...originals.map(copy));
    }
    const slides=[...carousel.querySelectorAll('.carousel-slide')];
    const middle=count>1?count:0;
    let active=0,timer,settleTimer,frame,jumpFrame,interacting=false,ready=false,jumping=false;
    const stride=()=>count>1?slides[1].offsetLeft-slides[0].offsetLeft:slides[0].offsetWidth;
    const centerOffset=()=>Math.max(0,(carousel.clientWidth-slides[0].offsetWidth)/2);
    const position=()=>Math.round((carousel.scrollLeft+centerOffset())/stride());
    const target=index=>slides[index].offsetLeft-slides[0].offsetLeft-centerOffset();
    const update=()=>{
      active=((position()-middle)%count+count)%count;
      dots.forEach((dot,i)=>{dot.classList.toggle('dcd-active',i===active);dot.setAttribute('aria-current',String(i===active));});
    };
    const instant=left=>{
      jumping=true;carousel.classList.add('dcd-carousel-jumping');
      carousel.scrollTo({left,behavior:'instant'});
      cancelAnimationFrame(jumpFrame);
      jumpFrame=requestAnimationFrame(()=>{if(signal.aborted)return;carousel.classList.remove('dcd-carousel-jumping');jumping=false;update();});
    };
    const normalize=()=>{
      if(!ready||jumping||interacting||count===1||signal.aborted)return;
      const physical=position();
      if(physical<count)instant(carousel.scrollLeft+count*stride());
      else if(physical>=count*2)instant(carousel.scrollLeft-count*stride());
    };
    const go=physical=>carousel.scrollTo({left:target(physical),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
    const stop=()=>clearInterval(timer);
    const start=()=>{stop();if(ready&&count>1&&!document.hidden&&!interacting&&!signal.aborted)timer=setInterval(()=>{normalize();go(position()+1);},10000);};
    dots.forEach((dot,i)=>{
      dot.setAttribute('aria-label',`${en?'Image':'Ảnh'} ${i+1}`);
      dot.addEventListener('click',()=>{stop();go(middle+i);start();},{signal});
    });
    carousel.addEventListener('scroll',()=>{if(!ready||jumping)return;update();clearTimeout(settleTimer);settleTimer=setTimeout(normalize,150);},{signal});
    carousel.addEventListener('scrollend',normalize,{signal});
    carousel.addEventListener('pointerdown',()=>{interacting=true;stop();},{signal});
    const release=()=>{if(!interacting)return;interacting=false;normalize();start();};
    window.addEventListener('pointerup',release,{signal});window.addEventListener('pointercancel',release,{signal});
    document.addEventListener('visibilitychange',()=>document.hidden?stop():start(),{signal});
    const resize=new ResizeObserver(()=>{if(ready&&!signal.aborted){instant(target(middle+active));start();}});
    resize.observe(carousel);
    signal.addEventListener('abort',()=>{stop();clearTimeout(settleTimer);cancelAnimationFrame(frame);cancelAnimationFrame(jumpFrame);resize.disconnect();},{once:true});
    frame=requestAnimationFrame(()=>{if(signal.aborted)return;instant(target(middle));ready=true;update();start();});
  }
})();

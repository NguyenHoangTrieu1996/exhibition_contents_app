(function(){
  'use strict';
  const app=Exhibition.sieudothi=Exhibition.sieudothi||{templates:{},data:{}};
  const href=name=>ExhibitionRoutes.href('50nam','sieudothi/'+name);
  app.href=href;
  app.page=name=>({render(root,context){
    const en=context.lang==='en';
    root.innerHTML=`<div class="st-screen" lang="${en?'en':'vi'}">${app.templates[name](app.data[name])}</div>`;
    const screen=root.firstElementChild;
    screen.querySelectorAll('[style]').forEach(el=>{for(const p of [...el.style])el.style.setProperty(p,el.style.getPropertyValue(p),'important');});
    screen.querySelectorAll('[onclick]').forEach(el=>{if(el.getAttribute('onclick').includes('history'))el.remove();else el.remove();});
    screen.querySelectorAll('.lang').forEach(el=>{el.hidden=!el.classList.contains(en?'lang-eng':'lang-vi');el.classList.remove('hidden');});
    screen.querySelectorAll('img').forEach(img=>{
      if(img.src.includes('/logo.png'))img.alt=en?'Ho Chi Minh City Museum':'Bảo tàng Thành phố Hồ Chí Minh';
      else {const figure=img.closest('figure');if(figure)img.alt=figure.querySelector(en?'.lang-eng':'.lang-vi')?.textContent.trim()||'';}
    });
    const footer=document.createElement('footer');footer.className='st-page-controls';
    footer.innerHTML=`<a class="st-control st-back" href="${href('index')}"><span class="material-symbols-outlined" aria-hidden="true">arrow_back</span>${en?'Back':'Quay lại'}</a><button class="st-control" type="button" data-st-language>${en?'Tiếng Việt':'English'}</button>`;
    screen.append(footer);
    const button=footer.querySelector('button');button.addEventListener('click',()=>Exhibition.setLanguage(en?'vi':'en'),{signal:context.signal});
    const size=()=>{const b=button.getBoundingClientRect();screen.style.setProperty('--st-language-width',b.width+'px');screen.style.setProperty('--st-language-height',b.height+'px');};
    const observer=new ResizeObserver(size);observer.observe(button);size();context.signal.addEventListener('abort',()=>observer.disconnect(),{once:true});
  }});
})();

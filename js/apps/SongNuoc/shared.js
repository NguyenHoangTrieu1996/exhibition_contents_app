(function () {
  'use strict';
  const pages = [
    {id:'index', titleVi:'TRANG CHỦ · BẢN ĐỒ', titleEn:'HOME · MAPS', icon:'map'},
    {id:'tulieuhinhanh', titleVi:'TƯ LIỆU HÌNH ẢNH', titleEn:'IMAGE RESOURCES', icon:'image'},
    {id:'nhungcaycau', titleVi:'NHỮNG CÂY CẦU', titleEn:'THE BRIDGES IN HO CHI MINH CITY', icon:'ship'},
    {id:'vanhoasongnuoc', titleVi:'VĂN HÓA SÔNG NƯỚC', titleEn:'RIVER CULTURE', icon:'water'}
  ];
  const escape = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const bilingual = (tag, vi, en, className='') => `<${tag} class="lang lang-vi ${className}">${escape(vi)}</${tag}><${tag} class="lang lang-eng ${className}">${escape(en)}</${tag}>`;
  function photo(item) {
    return `<figure class="river-photo"><img src="${escape(item.image)}" alt="${escape(item.titleVi)}"><figcaption>${bilingual('h5',item.titleVi,item.titleEn)}${bilingual('p',item.descriptionVi,item.descriptionEn)}</figcaption></figure>`;
  }
  function carousel(slides) {
    return `<section class="customCarousel"><div id="river-carousel" class="carousel slide" data-carousel><div class="carousel-inner"><div class="overlay"></div>${slides.map((slide,i)=>`<div class="carousel-item${i===0?' active':''}">${slide}</div>`).join('')}</div><button class="carousel-control-prev" type="button" data-bs-target="#river-carousel" data-bs-slide="prev"><span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span></button><button class="carousel-control-next" type="button" data-bs-target="#river-carousel" data-bs-slide="next"><span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span></button></div></section>`;
  }
  function homeMarkup() {
    const data = window.SongNuocHome;
    // Preserve the full introduction in three readable portrait panels.
    const groups = [[0],[1,2],[3,4]];
    const slides = groups.map((indices,i)=>`<article class="river-slide-content river-introduction">${bilingual('h1',data.titleVi,data.titleEn,'river-slide-heading')}<div class="river-intro-body">${indices.map(index=>bilingual('p',data.introVi[index],data.introEn[index])).join('')}</div>${bilingual('span',`Giới thiệu · ${i+1} / 3`,`Introduction · ${i+1} / 3`,'river-section-note')}</article>`);
    data.maps.forEach(map=>slides.push(`<article class="river-slide-content river-map">${bilingual('h1','BẢN ĐỒ SÀI GÒN – THÀNH PHỐ HỒ CHÍ MINH QUA CÁC THỜI KỲ','MAPS OF SAIGON – HO CHI MINH CITY THROUGH THE AGES','river-slide-heading')}${photo(map)}</article>`));
    slides.push(`<article class="river-slide-content river-video">${bilingual('h1','SÔNG NGÒI – KÊNH RẠCH XƯA VÀ NAY','RIVERS AND CANALS, PAST AND PRESENT','river-slide-heading')}<video controls muted playsinline preload="none" aria-label="${escape(data.titleVi)}"><source src="${escape(data.video)}" type="video/mp4"></video>${bilingual('p','Tạm dừng trình chiếu để xem trọn video.','Pause the slideshow to watch the full video.','river-video-note')}</article>`);
    return carousel(slides);
  }
  function cultureMarkup() {
    const data = window.SongNuocCulture;
    const slides = [];
    for (let i=0;i<data.length;i+=2) slides.push(`<article class="river-slide-content">${bilingual('h1','VĂN HÓA SÔNG NƯỚC','RIVER CULTURE','river-slide-heading')}<div class="river-photo-grid">${data.slice(i,i+2).map(photo).join('')}</div></article>`);
    return carousel(slides);
  }
  function normalizeLegacy(screen, pageId) {
    const node = screen.querySelector('.carousel');
    node.id = 'river-carousel';
    node.querySelectorAll('[data-bs-target]').forEach(control => control.dataset.bsTarget='#river-carousel');
    [...node.querySelectorAll('.carousel-item')].forEach(slide => {
      // Keep the eight existing culture photos together on their dedicated page.
      if (pageId==='nhungcaycau' && slide.querySelector('h1.lang-vi')?.textContent.trim()==='VĂN HÓA SÔNG NƯỚC') {slide.remove();return;}
      const content = document.createElement('article');
      content.className = 'river-slide-content';
      slide.querySelectorAll('h1').forEach(heading => {heading.classList.add('river-slide-heading');content.appendChild(heading);});
      const grid = document.createElement('div');
      grid.className = 'river-photo-grid';
      slide.querySelectorAll('.shareScreen').forEach(card => {
        card.className = 'river-photo';card.removeAttribute('style');
        const caption = document.createElement('figcaption');
        [...card.children].filter(child => child.tagName!=='IMG').forEach(child=>caption.appendChild(child));
        card.appendChild(caption);
        card.querySelectorAll('img').forEach(img=>img.removeAttribute('style'));
        grid.appendChild(card);
      });
      content.appendChild(grid);slide.replaceChildren(content);
    });
  }
  function addNavigation(screen, context, currentPage) {
    const nav = document.createElement('nav');
    nav.className='river-navigation';nav.id='river-navigation';
    nav.setAttribute('aria-label',context.lang==='vi'?'Chuyên đề Sông nước':'Rivers and Waterways topics');
    const entries=[...pages,{id:'other',titleVi:'CHUYÊN ĐỀ KHÁC',titleEn:'OTHER EXHIBITIONS',icon:'list'}];
    entries.forEach((item,index)=>{
      const link=document.createElement('a');
      link.className='river-navigation-link';link.style.setProperty('--nav-index',index+1);
      link.href=ExhibitionRoutes.href(item.id==='other'?'cacchuyendekhac':'SongNuoc',item.id==='other'?'index':item.id);
      const title=context.lang==='vi'?item.titleVi:item.titleEn;
      link.setAttribute('aria-label',title);
      if(item.id===currentPage){link.classList.add('active');link.setAttribute('aria-current','page');}
      link.innerHTML=`<i class="river-icon la-${item.icon}" aria-hidden="true"></i><span class="river-navigation-label">${escape(title)}</span>`;
      nav.appendChild(link);
    });
    screen.appendChild(nav);
    const toggle=document.createElement('button');
    toggle.type='button';toggle.className='river-home';
    toggle.setAttribute('aria-controls',nav.id);toggle.setAttribute('aria-expanded','false');
    toggle.setAttribute('aria-label',context.lang==='vi'?'Mở chuyên đề':'Open topics');
    toggle.innerHTML='<i class="river-icon la-home" aria-hidden="true"></i>';
    const setOpen=open=>{nav.classList.toggle('is-open',open);toggle.setAttribute('aria-expanded',String(open));};
    toggle.addEventListener('click',()=>setOpen(!nav.classList.contains('is-open')),{signal:context.signal});
    screen.addEventListener('keydown',event=>{if(event.key==='Escape'){setOpen(false);toggle.focus();}},{signal:context.signal});
    screen.appendChild(toggle);
  }
  function render(root, context, page) {
    const assets=window.SongNuocAssets;
    const legacyKey=page.id==='tulieuhinhanh'?'index':'page2';
    const markup=page.id==='index'?homeMarkup():page.id==='vanhoasongnuoc'?cultureMarkup():window.SongNuocPages[legacyKey];
    root.innerHTML=`<div class="river-screen river-page-${page.id}" data-language="${context.lang}"><div class="river-logo"><img src="${assets.logo}" alt="Bảo tàng Thành phố Hồ Chí Minh"></div><button class="river-language" type="button" aria-label="${context.lang==='vi'?'Switch to English':'Chuyển sang tiếng Việt'}"><img src="${context.lang==='vi'?assets.language.en:assets.language.vi}" alt="${context.lang==='vi'?'English':'Tiếng Việt'}"></button>${markup}<div class="river-playback"><button class="river-pause" type="button" aria-pressed="false"></button><span class="river-slide-count" aria-live="off"></span></div></div>`;
    const screen=root.querySelector('.river-screen');
    if(page.id==='tulieuhinhanh'||page.id==='nhungcaycau')normalizeLegacy(screen,page.id);
    const node=screen.querySelector('.carousel');
    node.dataset.carousel='';node.removeAttribute('data-bs-ride');node.dataset.bsInterval='10000';
    node.querySelectorAll('[data-bs-interval]').forEach(item=>item.removeAttribute('data-bs-interval'));
    const background=page.id==='index'?window.SongNuocHome.maps[0].image:page.id==='vanhoasongnuoc'?window.SongNuocCulture[3].image:assets.backgrounds[legacyKey];
    screen.style.setProperty('--river-background',`url("${new URL(background,document.baseURI).href}")`);
    const slides=[...node.querySelectorAll('.carousel-item')];
    slides.forEach(slide=>slide.querySelectorAll('img').forEach(img=>{
      const caption=img.closest('.river-photo')?.querySelector(context.lang==='vi'?'h5.lang-vi':'h5.lang-eng');
      if(caption)img.alt=caption.textContent.replace(/\s+/g,' ').trim();
      img.loading=slide.classList.contains('active')?'eager':'lazy';img.decoding='async';
    }));
    node.querySelector('.carousel-control-prev .visually-hidden').textContent=context.lang==='vi'?'Ảnh trước':'Previous slide';
    node.querySelector('.carousel-control-next .visually-hidden').textContent=context.lang==='vi'?'Ảnh tiếp theo':'Next slide';
    node.addEventListener('slide.bs.carousel',event=>{
      event.relatedTarget?.querySelectorAll('img').forEach(img=>img.loading='eager');
      node.querySelectorAll('video').forEach(video=>video.pause());
    },{signal:context.signal});
    screen.querySelector('.river-language').addEventListener('click',()=>Exhibition.setLanguage(context.lang==='vi'?'en':'vi'),{signal:context.signal});
    addNavigation(screen,context,page.id);
  }
  function afterRender(root, context) {
    const node=root.querySelector('.carousel');
    const instance=bootstrap.Carousel.getInstance(node);
    const slides=[...node.querySelectorAll('.carousel-item')];
    const button=root.querySelector('.river-pause');
    let paused=false;
    function label(){button.textContent=context.lang==='vi'?(paused?'▶ Tiếp tục':'Ⅱ Tạm dừng'):(paused?'▶ Play':'Ⅱ Pause');button.setAttribute('aria-pressed',String(paused));}
    function update(){
      const index=slides.findIndex(slide=>slide.classList.contains('active'));
      root.querySelector('.river-slide-count').textContent=`${String(index+1).padStart(2,'0')} / ${String(slides.length).padStart(2,'0')}`;
      const video=slides[index]?.querySelector('video');
      if(video){video.currentTime=0;video.play().catch(()=>{});}
      if(paused)instance.pause();
    }
    button.addEventListener('click',()=>{paused=!paused;paused?instance.pause():instance.cycle();label();},{signal:context.signal});
    node.addEventListener('slid.bs.carousel',update,{signal:context.signal});
    label();update();
    context.onCleanup(()=>node.querySelectorAll('video').forEach(video=>video.pause()));
  }
  window.SongNuocApp={register(id){
    const page=pages.find(item=>item.id===id);
    Exhibition.registerPage('SongNuoc',id,{
      features:{carousel:{interval:10000,ride:'carousel',pause:false}},
      render(root,context){render(root,context,page);},afterRender
    });
  }};
})();

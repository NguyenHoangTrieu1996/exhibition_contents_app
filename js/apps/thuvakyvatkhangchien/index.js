(function () {
  'use strict';
  const {groups,items,quote}=window.ThuVaKyVatData;
  const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const href=page=>ExhibitionRoutes.href('thuvakyvatkhangchien',page);
  const itemBy=n=>items.find(item=>item.number===n);
  const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase();
  const pageIds=['index',...groups.map(g=>g.id),'bo-suu-tap',...items.map(i=>'hien-vat-'+i.number)];
  for(const page of pageIds) Exhibition.registerPage('thuvakyvatkhangchien',page,{
    render(root,ctx) {
      const lang=ctx.lang==='en'?'en':'vi', en=lang==='en';
      const t=(vi,eng)=>en?eng:vi;
      const field=(obj,key)=>obj[key][lang];
      const title=t('Thư và kỷ vật<br>kháng chiến','Letters & wartime<br>memorabilia');
      const image=(item,thumb=false,eager=false)=>item.images[0]?`<img src="${esc(item.images[0][thumb?'thumb':'src'])}" alt="${esc(field(item,'caption'))}" loading="${eager?'eager':'lazy'}" decoding="async">`:`<div class="tk-book"><span>${t('NHẬT KÝ','DIARY')}</span><strong>Đặng Thùy Trâm</strong><small>${t('Ảnh chưa được cung cấp','Image not supplied')}</small></div>`;
      const card=item=>`<article class="tk-card"><a class="tk-card-art" href="${href('hien-vat-'+item.number)}">${image(item,true)}<span class="tk-card-number">${String(item.number).padStart(2,'0')}</span></a><div class="tk-card-copy"><p class="tk-eyebrow">${esc(field(groups.find(g=>g.id===item.group),'title'))}</p><h3><a href="${href('hien-vat-'+item.number)}">${esc(field(item,'caption'))}</a></h3><a class="tk-text-link" href="${href('hien-vat-'+item.number)}">${t('Khám phá tư liệu','Explore this record')} <span aria-hidden="true">↗</span></a></div></article>`;
      const header=`<a class="tk-skip" href="#tk-main">${t('Đến nội dung','Skip to content')}</a><header class="tk-header"><a class="tk-brand" href="${href('index')}"><img src="./public/elements/temvebac/logo.png" width="609" height="277" alt="${t('Bảo tàng Thành phố Hồ Chí Minh','Museum of Ho Chi Minh City')}"></a><nav aria-label="${t('Điều hướng chuyên đề','Exhibition navigation')}"><a href="${href('index')}" ${page==='index'?'aria-current="page"':''}>${t('Giới thiệu','Introduction')}</a><a href="${href('bo-suu-tap')}" ${page==='bo-suu-tap'?'aria-current="page"':''}>${t('Bộ sưu tập','Collection')}</a><a href="#/cacchuyendekhac/index">${t('Chuyên đề khác','Other exhibitions')} ↗</a></nav><button type="button" class="tk-language" data-language>${en?'Tiếng Việt':'English'}</button></header>`;
      const footer=`<footer class="tk-footer"><a href="${href('index')}">${t('Thư và kỷ vật kháng chiến','Letters and wartime memorabilia')}</a><span>${t('Những kỷ vật đi cùng năm tháng','Memories preserved through the years')}</span><a href="${href('bo-suu-tap')}">${t('Xem toàn bộ sưu tập','View the full collection')} ↗</a></footer>`;
      let body='';
      if(page==='index') {
        body=`<main id="tk-main"><section class="tk-hero"><div class="tk-hero-copy"><p class="tk-eyebrow">${t('NHỮNG KỶ VẬT ĐI CÙNG NĂM THÁNG','MEMORIES THROUGH THE YEARS')}</p><h1>${title}</h1><p class="tk-intro">${t('Qua những lá thư, trang nhật ký và hình ảnh được gìn giữ, lắng nghe câu chuyện về lý tưởng, tình yêu và niềm tin vào ngày đoàn tụ.','Through preserved letters, diary pages and photographs, discover stories of ideals, love and hope for reunion.')}</p><a class="tk-button" href="${href('tien-tuyen')}">${t('Bắt đầu khám phá','Begin exploring')} <span aria-hidden="true">→</span></a><a class="tk-hero-secondary" href="${href('bo-suu-tap')}">${t('Xem bộ sưu tập','Browse the collection')} ↗</a></div><figure class="tk-hero-art"><div class="tk-photo-mat">${image(itemBy(4),false,true)}</div><figcaption><span>04 / 31</span> ${t('Trên đường Trường Sơn','Along the Truong Son Trail')}</figcaption><span class="tk-hero-stamp" aria-hidden="true">${t('KÝ ỨC<br>CÒN MÃI','MEMORIES<br>LIVE ON')}</span></figure></section><div class="tk-stats"><p><strong>02</strong><span>${t('Phần trưng bày','Exhibition parts')}</span></p><p><strong>31</strong><span>${t('Mục tư liệu','Historical records')}</span></p><p class="tk-stats-note">${t('Từng nét chữ.<br>Một thời không quên.','Every handwritten line.<br>An unforgettable time.')}</p></div><section class="tk-section"><div class="tk-section-heading"><div><p class="tk-eyebrow">${t('HÀNH TRÌNH KHÁM PHÁ','EXPLORE THE EXHIBITION')}</p><h2>${t('Ký ức qua từng trang viết','Memories on every page')}</h2></div><p>${t('Từ lời kêu gọi lên đường đến những lá thư gửi về hậu phương.','From the call to the front lines to letters sent home.')}</p></div><div class="tk-chapters">${groups.map((g,i)=>`<a class="tk-chapter" href="${href(g.id)}"><div class="tk-chapter-image">${image(itemBy(g.cover),true)}</div><div class="tk-chapter-copy"><p class="tk-eyebrow">${t('PHẦN','PART')} ${g.part} <span> / 0${i+1}</span></p><h3>${esc(field(g,'title'))}</h3><p>${esc(field(g,'description'))}</p><span class="tk-text-link">${t('Khám phá','Explore')} →</span></div></a>`).join('')}</div></section><section class="tk-feature"><div class="tk-feature-art">${image(itemBy(25),true)}</div><div><p class="tk-eyebrow">${t('LÁ THƯ VÀ NGÀY TRỞ VỀ','LETTERS AND HOMECOMING')}</p><h2>${t('Bắc – Nam tuy xa,<br>nhưng lòng ta vẫn gần.','Though North and South are far apart,<br>our hearts remain close.')}</h2><p>${t('Trích thư ông Trần Nhành gửi bà Nguyễn Thị Ngân, ngày 09/7/1957.','Excerpt from Tran Nhanh’s letter to Nguyen Thi Ngan, July 9, 1957.')}</p><a class="tk-button" href="${href('hien-vat-27')}">${t('Đọc câu chuyện','Read the story')} →</a></div></section></main>`;
      } else if(page==='bo-suu-tap') {
        body=`<main id="tk-main" class="tk-section tk-collection"><p class="tk-eyebrow">${t('KHO TƯ LIỆU','THE ARCHIVE')}</p><div class="tk-section-heading"><h1>${t('Những ký ức được gìn giữ','Memories preserved')}</h1><button class="tk-button" type="button" data-slideshow>${t('Trình chiếu','Slideshow')} ▷</button></div><p class="tk-intro">${t('31 mục tư liệu: thư, nhật ký và hình ảnh trong chuyên đề.','31 records: letters, diaries and photographs from the exhibition.')}</p><form class="tk-filters" role="search"><label>${t('Tìm trong sưu tập','Search the collection')}<input type="search" name="keyword" placeholder="${t('Tên nhân vật, năm, địa danh…','Person, year, place…')}" autocomplete="off"></label><label>${t('Nội dung','Category')}<select name="group"><option value="">${t('Tất cả nội dung','All categories')}</option>${groups.map(g=>`<option value="${g.id}">${esc(field(g,'title'))}</option>`).join('')}</select></label><button type="reset" class="tk-outline">${t('Xóa bộ lọc','Clear filters')}</button></form><p class="tk-results" role="status" aria-live="polite"></p><div class="tk-grid"></div></main>`;
      } else if(page.startsWith('hien-vat-')) {
        const item=itemBy(Number(page.slice(9))), group=groups.find(g=>g.id===item.group);
        body=`<main id="tk-main" class="tk-section tk-detail"><nav class="tk-breadcrumb" aria-label="${t('Đường dẫn','Breadcrumb')}"><a href="${href('bo-suu-tap')}">${t('Bộ sưu tập','Collection')}</a><span aria-hidden="true"> / </span><a href="${href(group.id)}">${esc(field(group,'title'))}</a></nav><div class="tk-detail-layout"><div class="tk-detail-images">${item.images.length?item.images.map((img,i)=>`<figure><button class="tk-image-button" type="button" data-view="${item.number}" data-index="${i}" aria-label="${t('Phóng lớn ảnh','Enlarge image')} ${i+1}"><img src="${esc(img.src)}" alt="${esc(field(item,'caption'))}" decoding="async" loading="${i?'lazy':'eager'}"><span>${t('Xem ảnh lớn','Enlarge image')} ↗</span></button>${item.images.length>1?`<figcaption>${t('Ảnh','Image')} ${i+1} / ${item.images.length}</figcaption>`:''}</figure>`).join(''):image(item)}</div><article class="tk-detail-copy"><p class="tk-eyebrow">${t('TƯ LIỆU','RECORD')} ${String(item.number).padStart(2,'0')} / 31</p><h1>${esc(field(item,'caption'))}</h1>${item.transcript?`<div class="tk-transcript"><p class="tk-eyebrow">${t('NỘI DUNG TRÍCH DẪN','TRANSCRIPT EXCERPT')}</p>${item.transcript[lang].map(p=>`<p>${esc(p)}</p>`).join('')}</div>`:''}</article></div><nav class="tk-pagination" aria-label="${t('Chuyển tư liệu','Record navigation')}">${item.number>1?`<a href="${href('hien-vat-'+(item.number-1))}">← ${t('Tư liệu trước','Previous record')}</a>`:'<span></span>'}<a href="${href('bo-suu-tap')}">${t('Bộ sưu tập','Collection')}</a>${item.number<31?`<a href="${href('hien-vat-'+(item.number+1))}">${t('Tư liệu tiếp theo','Next record')} →</a>`:'<span></span>'}</nav></main>`;
      } else {
        const group=groups.find(g=>g.id===page), index=groups.indexOf(group);
        body=`<main id="tk-main" class="tk-section"><nav class="tk-breadcrumb" aria-label="${t('Đường dẫn','Breadcrumb')}"><a href="${href('index')}">${t('Giới thiệu','Introduction')}</a> / ${t('Phần','Part')} ${group.part}</nav><p class="tk-eyebrow">${t('PHẦN','PART')} ${group.part} · ${t('CHẶNG','CHAPTER')} 0${index+1}</p><h1>${esc(field(group,'title'))}</h1><p class="tk-intro">${esc(field(group,'description'))}</p>${page==='tien-tuyen'?`<blockquote class="tk-quote">${quote[lang].map((p,i)=>i===quote[lang].length-1?`<cite>${esc(p)}</cite>`:`<p>${esc(p)}</p>`).join('')}</blockquote>`:''}${page==='nhat-ky'?`<div class="tk-chapter-note">${image(itemBy(5),true)}<p>${esc(field(itemBy(5),'caption'))}</p></div>`:''}<div class="tk-grid">${items.filter(i=>i.group===page).map(card).join('')}</div><nav class="tk-pagination" aria-label="${t('Chuyển chặng','Chapter navigation')}"><a href="${href(index?groups[index-1].id:'index')}">← ${t('Chặng trước','Previous chapter')}</a><a href="${href(index<3?groups[index+1].id:'bo-suu-tap')}">${t('Tiếp tục khám phá','Continue exploring')} →</a></nav></main>`;
      }
      root.innerHTML=`<div class="tk-app" lang="${lang}" data-lightgallery>${header}${body}${footer}</div>`;
      const app=root.querySelector('.tk-app');
      app.querySelector('[data-language]').addEventListener('click',()=>Exhibition.setLanguage(en?'vi':'en'),{signal:ctx.signal});
      app.querySelector('.tk-skip').addEventListener('click',event=>{event.preventDefault();const main=app.querySelector('main');main.tabIndex=-1;main.focus();main.scrollIntoView();},{signal:ctx.signal});
      let shown=items;
      const form=app.querySelector('.tk-filters');
      if(form) {
        const update=()=>{
          const query=normalize(form.elements.keyword.value.trim()), category=form.elements.group.value;
          shown=items.filter(i=>(!category||i.group===category)&&normalize([i.caption.vi,i.caption.en,...(i.transcript?.vi||[]),...(i.transcript?.en||[])].join(' ')).includes(query));
          app.querySelector('.tk-results').textContent=t(`${shown.length} / 31 mục tư liệu`,`${shown.length} / 31 records`);
          app.querySelector('.tk-grid').innerHTML=shown.length?shown.map(card).join(''):`<p class="tk-empty">${t('Chưa tìm thấy tư liệu phù hợp. Hãy thử từ khóa khác hoặc xóa bộ lọc.','No matching records. Try another keyword or clear the filters.')}</p>`;
          app.querySelector('[data-slideshow]').disabled=!shown.some(i=>i.images.length);
        };
        form.addEventListener('input',update,{signal:ctx.signal});
        form.addEventListener('submit',event=>event.preventDefault(),{signal:ctx.signal});
        form.addEventListener('reset',()=>{queueMicrotask(()=>{if(!ctx.signal.aborted)update();});},{signal:ctx.signal});
        update();
      }
      let viewer=null, timer=null, activeButton=null;
      const stop=()=>{clearInterval(timer);timer=null;};
      const close=()=>{stop();if(viewer){viewer.close();viewer.remove();viewer=null;}if(activeButton?.isConnected)activeButton.focus();};
      const open=(list,start,trigger)=>{
        close();activeButton=trigger;let current=start,zoomed=false;
        viewer=document.createElement('dialog');viewer.className='tk-viewer';viewer.lang=lang;
        viewer.setAttribute('aria-label',t('Xem ảnh tư liệu','Historical image viewer'));
        viewer.innerHTML=`<div class="tk-viewer-toolbar"><span class="tk-viewer-count" role="status" aria-live="polite"></span><button type="button" data-play>${t('Tự chạy','Play')} ▷</button><button type="button" data-zoom>${t('Phóng to','Zoom in')} ＋</button><button type="button" data-close>${t('Đóng','Close')} ✕</button></div><div class="tk-viewer-stage"><img alt=""></div><p class="tk-viewer-caption"></p><div class="tk-viewer-navigation"><button type="button" data-prev>← ${t('Ảnh trước','Previous')}</button><button type="button" data-next>${t('Ảnh tiếp','Next')} →</button></div>`;
        const modal=viewer;
        const syncPlay=()=>{modal.querySelector('[data-play]').textContent=timer?t('Tạm dừng Ⅱ','Pause Ⅱ'):t('Tự chạy ▷','Play ▷');};
        const draw=()=>{const {item,img,index}=list[current];zoomed=false;modal.querySelector('.tk-viewer-stage').classList.remove('tk-zoomed');modal.querySelector('[data-zoom]').textContent=t('Phóng to ＋','Zoom in ＋');const picture=modal.querySelector('img');picture.src=img.src;picture.alt=field(item,'caption');modal.querySelector('.tk-viewer-caption').textContent=field(item,'caption')+(item.images.length>1?` (${index+1}/${item.images.length})`:'');modal.querySelector('.tk-viewer-count').textContent=`${current+1} / ${list.length}`;};
        const step=direction=>{current=(current+direction+list.length)%list.length;draw();};
        modal.querySelector('[data-close]').onclick=close;
        modal.querySelector('[data-prev]').onclick=()=>step(-1);
        modal.querySelector('[data-next]').onclick=()=>step(1);
        modal.querySelector('[data-play]').onclick=()=>{if(timer)stop();else timer=setInterval(()=>step(1),8000);syncPlay();};
        modal.querySelector('[data-zoom]').onclick=()=>{zoomed=!zoomed;modal.querySelector('.tk-viewer-stage').classList.toggle('tk-zoomed',zoomed);modal.querySelector('[data-zoom]').textContent=zoomed?t('Thu nhỏ −','Zoom out −'):t('Phóng to ＋','Zoom in ＋');};
        modal.querySelector('[data-play]').disabled=list.length<2;
        modal.querySelector('[data-prev]').disabled=list.length<2;modal.querySelector('[data-next]').disabled=list.length<2;
        modal.addEventListener('cancel',event=>{event.preventDefault();close();});
        modal.addEventListener('click',event=>{if(event.target===modal)close();});
        modal.addEventListener('keydown',event=>{if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();step(event.key==='ArrowLeft'?-1:1);}});
        document.body.appendChild(modal);draw();modal.showModal();
      };
      const slides=records=>records.flatMap(item=>item.images.map((img,index)=>({item,img,index})));
      app.addEventListener('click',event=>{const button=event.target.closest('[data-view], [data-slideshow]');if(!button)return;if(button.hasAttribute('data-slideshow'))open(slides(shown),0,button);else open(slides([itemBy(Number(button.dataset.view))]),Number(button.dataset.index),button);},{signal:ctx.signal});
      document.addEventListener('visibilitychange',()=>{if(document.hidden){stop();if(viewer)viewer.querySelector('[data-play]').textContent=t('Tự chạy ▷','Play ▷');}},{signal:ctx.signal});
      ctx.onCleanup(close);
    }
  });
})();

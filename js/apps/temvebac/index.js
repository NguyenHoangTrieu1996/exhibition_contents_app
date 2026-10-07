(function () {
  'use strict';
  const pageIds = ['chan-dung', 'que-huong', 'nguoi-thanh-nien', 'bon-ba', 'lanh-dao-cach-mang', 'nhan-dan-quoc-te'];
  const pages = window.TemVeBacData.pages;
  const config = {...pages['chan-dung'].exhibition, heroImage: pages['chan-dung'].exhibition.hero.src};
  // Build lookup lists in memory only; each editable file keeps its text and
  // complete image objects together. A src is also the gallery lookup key.
  const sections = pageIds.map(id => ({...pages[id], cover: pages[id].cover.src}));
  const blocks = sections.flatMap(section => section.blocks.map(block => ({
    ...block,
    id: 'stt-' + block.stt,
    sectionId: section.id,
    images: block.images.map(image => ({...image, id: image.src, blockId: 'stt-' + block.stt, sectionId: section.id}))
  })));
  const images = blocks.flatMap(block => block.images);
  const byImage = new Map(images.map(image => [image.id, image]));
  for (const image of [...pageIds.map(id => pages[id].cover), config.hero]) {
    if (!byImage.has(image.src)) byImage.set(image.src, {...image, id: image.src});
  }
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // The router mounts one page at a time and resets its locale on every render.
  let lang = 'vi';
  const english = {
  "Điều hướng chuyên đề": "Exhibition navigation",
  "Giới thiệu chuyên đề": "Exhibition introduction",
  "Giới thiệu": "Introduction",
  "Bộ sưu tập": "Collection",
  "Chuyên đề khác ↗": "Other exhibitions ↗",
  "Hành trình theo chân Bác qua sưu tập tem và bưu ảnh": "Following Ho Chi Minh through stamps and postcards",
  "Về đầu chuyên đề ↑": "Back to exhibition home ↑",
  "Xem ảnh": "View image",
  "Ảnh": "Image",
  "Phóng lớn ↗": "Enlarge ↗",
  "Khám phá ↗": "Explore ↗",
  "Trưng bày chuyên đề · Tem và bưu ảnh": "Special exhibition · Stamps and postcards",
  "Khám phá những dấu mốc trong cuộc đời và sự nghiệp Chủ tịch Hồ Chí Minh qua những con tem, bưu ảnh và tư liệu được gìn giữ.": "Explore milestones in the life and career of President Ho Chi Minh through preserved stamps, postcards and historical materials.",
  "Bắt đầu hành trình →": "Begin the journey →",
  "HÀNH TRÌNH THEO CHÂN BÁC": "FOLLOWING HO CHI MINH",
  "Phóng lớn bưu ảnh Chủ tịch Hồ Chí Minh": "Enlarge the postcard of President Ho Chi Minh",
  "Một hành trình lớn, qua những con tem nhỏ.": "A great journey, told through small stamps.",
  "Phần nội dung": "Exhibition parts",
  "Chặng khám phá": "Journey chapters",
  "Ảnh tư liệu số hóa": "Digitized historical images",
  "Mục lục trưng bày": "Explore the exhibition",
  "Những dấu chân<br>đi cùng lịch sử.": "Footsteps<br>through history.",
  "Từ quê hương đến hành trình cứu nước, từ chân dung Người đến tình cảm của nhân dân và bạn bè quốc tế.": "From his homeland to his journey for national salvation; from portraits of Ho Chi Minh to the affection of the people and international friends.",
  "PHẦN": "PART",
  "Chân dung Chủ tịch Hồ Chí Minh": "Portraits of President Ho Chi Minh",
  "Hành trình theo chân Bác": "Following Ho Chi Minh",
  "Trong lòng nhân dân và bạn bè quốc tế": "In the hearts of the people and international friends",
  "Nhà sưu tập ": "Collector ",
  "Đường dẫn": "Breadcrumb",
  "Chuyên đề": "Exhibition",
  "Phần": "Part",
  "Chặng": "Chapter",
  "Các chặng trưng bày": "Exhibition chapters",
  "Chuyển chặng": "Chapter navigation",
  "← Chặng trước": "← Previous chapter",
  "← Về trang đầu": "← Back to home",
  "Chặng tiếp theo →": "Next chapter →",
  "Tiếp tục khám phá →": "Continue exploring →",
  "Toàn bộ sưu tập": "Full collection",
  "Kho ảnh chuyên đề": "Exhibition image archive",
  "Tem, bưu ảnh<br>& những câu chuyện.": "Stamps, postcards<br>& their stories.",
  "Tìm trong sưu tập": "Search the collection",
  "Nhập chủ đề, địa danh, năm…": "Enter a subject, place or year…",
  "Chặng trưng bày": "Exhibition chapter",
  "Tất cả các chặng": "All chapters",
  "Xóa bộ lọc": "Clear filters",
  "Đến nội dung": "Skip to content",
  "ảnh tư liệu": "historical images",
  "Chưa tìm thấy ảnh phù hợp. Hãy thử từ khóa khác hoặc chọn tất cả các chặng.": "No matching images found. Try another keyword or select all chapters."
};
  const t = value => lang === 'en' ? (english[value] ?? value) : value;
  const field = (item, key) => lang === 'en'
    ? (item?.[key + '-eng'] ?? ((key === 'caption' || key === 'text') ? item?.['title-eng'] : undefined) ?? item?.[key] ?? '')
    : (item?.[key] ?? '');
  const url = page => '#/temvebac/' + page;
  const imageTag = (id, eager = false) => {
    const item = byImage.get(id);
    return item ? `<img src="${escape(item.src)}" alt="${escape(field(item, "caption"))}" loading="${eager ? 'eager' : 'lazy'}" decoding="async">` : '';
  };
  const header = active => `<header class="tb-header"><a class="tb-brand" href="${url('index')}"><span class="tb-brand-logo" role="img" aria-label="${escape(field(config, "museum"))}"></span></a><nav aria-label="${t("Điều hướng chuyên đề")}"><a ${active === 'index' ? 'aria-current="page"' : ''} href="${url('index')}">${t("Giới thiệu")}</a><a ${active === 'bo-suu-tap' ? 'aria-current="page"' : ''} href="${url('bo-suu-tap')}">${t("Bộ sưu tập")}</a><a href="#/cacchuyendekhac/index">${t("Chuyên đề khác ↗")}</a></nav><div class="tb-languages"><button type="button" class="tb-language" data-tb-language="${lang === 'en' ? 'vi' : 'en'}" lang="${lang === 'en' ? 'vi' : 'en'}">${lang === 'en' ? 'Ti\u1ebfng Vi\u1ec7t' : 'English'}</button></div></header>`;
  const footer = () => `<footer class="tb-footer"><span>${escape(field(config, "museum"))}</span><span>${t("Hành trình theo chân Bác qua sưu tập tem và bưu ảnh")}</span><a href="${url('index')}">${t("Về đầu chuyên đề ↑")}</a></footer>`;
  const photoButton = (id, group, index) => `<button type="button" class="tb-photo" data-image="${escape(id)}" data-group="${escape(group)}" aria-label="${t("Xem ảnh")} ${index + 1}: ${escape(field(byImage.get(id), "caption"))}">${imageTag(id)}<span class="tb-photo-caption"><span>${t("Ảnh")} ${String(index + 1).padStart(2,'0')}</span><span aria-hidden="true">${t("Phóng lớn ↗")}</span></span></button>`;
  function sectionCard(section) {
    return `<a class="tb-section-card tb-part-${section.part}" href="${url(section.id)}"><div class="tb-card-image">${imageTag(section.cover)}<span class="tb-card-number">${section.number}</span></div><div class="tb-card-copy"><span class="tb-eyebrow">${escape(field(section, "period"))}</span><h3>${escape(field(section, "shortTitle"))}</h3><p>${escape(field(section, "intro"))}</p><span class="tb-text-link">${t("Khám phá ↗")}</span></div></a>`;
  }
  function home() {
    return `${header('index')}<main id="tb-content"><section class="tb-hero"><div class="tb-hero-copy"><span class="tb-eyebrow">${t("Trưng bày chuyên đề · Tem và bưu ảnh")}</span><h1>${escape(field(config, "title")).replace("theo chân", "<br>theo chân").replace(/Bác$/, "<em>Bác</em>")}</h1><p class="tb-hero-subtitle">${escape(field(config, "subtitle"))}</p><p class="tb-hero-description">${t("Khám phá những dấu mốc trong cuộc đời và sự nghiệp Chủ tịch Hồ Chí Minh qua những con tem, bưu ảnh và tư liệu được gìn giữ.")}</p><a class="tb-button" href="#tb-journey" data-scroll-journey>${t("Bắt đầu hành trình →")}</a><p class="tb-occasion">${escape(field(config, "commemoration"))}</p></div><div class="tb-hero-art"><div class="tb-postmark" aria-hidden="true">${t("HÀNH TRÌNH THEO CHÂN BÁC")}<span>1890 ✦ 2025</span></div><button class="tb-hero-stamp" data-image="${escape(config.heroImage)}" data-group="hero" aria-label="${t("Phóng lớn bưu ảnh Chủ tịch Hồ Chí Minh")}">${imageTag(config.heroImage,true)}</button><span class="tb-art-caption">${t("Một hành trình lớn, qua những con tem nhỏ.")}</span></div></section><div class="tb-intro-strip"><span><strong data-count="3" data-digits="2">03</strong> ${t("Phần nội dung")}</span><span><strong data-count="6" data-digits="2">06</strong> ${t("Chặng khám phá")}</span><span><strong data-count="${images.length}">${images.length}</strong> ${t("Ảnh tư liệu số hóa")}</span></div><section class="tb-journey tb-container" id="tb-journey"><div class="tb-section-heading"><span class="tb-eyebrow">${t("Mục lục trưng bày")}</span><h2>${t("Những dấu chân<br>đi cùng lịch sử.")}</h2><p>${t("Từ quê hương đến hành trình cứu nước, từ chân dung Người đến tình cảm của nhân dân và bạn bè quốc tế.")}</p></div>${[1,2,3].map(part=>`<div class="tb-part-heading"><span>${t("PHẦN")} ${String(part).padStart(2,'0')}</span><h3>${part===1?t("Chân dung Chủ tịch Hồ Chí Minh"):part===2?t("Hành trình theo chân Bác"):t("Trong lòng nhân dân và bạn bè quốc tế")}</h3></div><div class="tb-section-grid ${part!==2?'tb-single':''}">${sections.filter(s=>s.part===part).map(sectionCard).join('')}</div>`).join('')}</section></main>${footer()}`;
  }
  function blockMarkup(block) {
    const visibleImages = block.images.filter(image => !image.archiveOnly);
    const paragraphs = field(block, "text").split(/\n+/).filter(Boolean);
    const long = field(block, "text").length > 420;
    return `<section class="tb-source-block ${long?'tb-narrative':''}" id="tb-${block.id}">${long ? paragraphs.map(p=>`<p>${escape(p)}</p>`).join('') : `<h2>${escape(field(block, "text"))}</h2>`}${block.note && /NST/.test(block.note) ? `<p class="tb-credit">${escape(field(block, "note").replace(/^NST\s*/, t("Nhà sưu tập ")))}</p>` : ''}${visibleImages.length ? `<div class="tb-block-photos">${visibleImages.map((image,i)=>photoButton(image.id,block.id,i)).join('')}</div>` : ''}</section>`;
  }
  function chapter(section) {
    const index = sections.indexOf(section);
    return `${header(section.id)}<main id="tb-content"><div class="tb-container"><nav class="tb-breadcrumb" aria-label="${t("Đường dẫn")}"><a href="${url('index')}">${t("Chuyên đề")}</a><span>/</span><span>${t("Phần")} ${section.part}</span></nav><section class="tb-chapter-hero tb-part-${section.part}"><div><span class="tb-eyebrow">${t("Chặng")} ${section.number} · ${escape(field(section, "period"))}</span><h1>${escape(field(section, "title"))}</h1><p>${escape(field(section, "intro"))}</p></div><div class="tb-chapter-image">${photoButton(section.cover,'cover',0)}</div></section><nav class="tb-chapter-nav" aria-label="${t("Các chặng trưng bày")}">${sections.map(s=>`<a href="${url(s.id)}" ${s===section?'aria-current="page"':''}>${s.number} · ${escape(field(s, "shortTitle"))}</a>`).join('')}</nav><article class="tb-article">${blocks.filter(b=>b.sectionId===section.id).map(blockMarkup).join('')}</article><nav class="tb-next" aria-label="${t("Chuyển chặng")}">${index>0?`<a href="${url(sections[index-1].id)}"><small>${t("← Chặng trước")}</small>${escape(field(sections[index-1], "shortTitle"))}</a>`:`<a href="${url('index')}"><small>${t("← Về trang đầu")}</small>${t("Giới thiệu chuyên đề")}</a>`}${index<sections.length-1?`<a href="${url(sections[index+1].id)}"><small>${t("Chặng tiếp theo →")}</small>${escape(field(sections[index+1], "shortTitle"))}</a>`:`<a href="${url('bo-suu-tap')}"><small>${t("Tiếp tục khám phá →")}</small>${t("Toàn bộ sưu tập")}</a>`}</nav></div></main>${footer()}`;
  }
  function archive() {
    return `${header('bo-suu-tap')}<main id="tb-content" class="tb-container tb-archive"><span class="tb-eyebrow">${t("Kho ảnh chuyên đề")}</span><h1>${t("Tem, bưu ảnh<br>& những câu chuyện.")}</h1><p class="tb-lead">${lang === "en" ? `Explore ${images.length} historical images from each chapter of the journey.` : `Khám phá ${images.length} ảnh tư liệu theo từng chặng của hành trình.`}</p><form class="tb-filters" role="search"><label>${t("Tìm trong sưu tập")}<input type="search" id="tb-search" placeholder="${t("Nhập chủ đề, địa danh, năm…")}" autocomplete="off"></label><label>${t("Chặng trưng bày")}<select id="tb-section"><option value="">${t("Tất cả các chặng")}</option>${sections.map(s=>`<option value="${s.id}">${escape(field(s, "shortTitle"))}</option>`).join('')}</select></label><button type="reset" class="tb-reset">${t("Xóa bộ lọc")}</button></form><p class="tb-result-count" role="status" aria-live="polite"></p><div class="tb-archive-grid"></div></main>${footer()}`;
  }
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[đĐ]/g,'d').toLowerCase();
  for (const page of ['index', ...sections.map(s=>s.id), 'bo-suu-tap']) {
    Exhibition.registerPage('temvebac',page,{
      render(root, context) {
        lang = context.lang === "en" ? "en" : "vi";
        root.dataset.lightgallery = '';
        root.innerHTML = `<div class="temvebac-screen" lang="${lang}"><a class="tb-skip" href="#tb-content">${t("Đến nội dung")}</a>${page==='index'?home():page==='bo-suu-tap'?archive():chapter(sections.find(s=>s.id===page))}</div>`;
      },
      afterRender(root, context) {
        root.querySelectorAll('[data-tb-language]').forEach(button => {
          button.addEventListener('click', () => Exhibition.setLanguage(button.dataset.tbLanguage), {signal:context.signal});
        });
        let countFrame = 0, countObserver;
        const counters = [...root.querySelectorAll('[data-count]')];
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const writeCounts = progress => counters.forEach(node => {
          node.textContent = String(Math.round(Number(node.dataset.count) * progress)).padStart(Number(node.dataset.digits) || 1, '0');
        });
        if (counters.length && !reducedMotion && 'IntersectionObserver' in window) {
          const strip = root.querySelector('.tb-intro-strip');
          // Preserve accessible final values while the visual numbers animate.
          strip.setAttribute('aria-label', lang === "en" ? `3 exhibition parts, 6 journey chapters, ${images.length} digitized historical images` : `3 phần nội dung, 6 chặng khám phá, ${images.length} ảnh tư liệu số hóa`);
          counters.forEach(node => node.setAttribute('aria-hidden', 'true'));
          countObserver = new IntersectionObserver(entries => {
            if (!entries.some(entry => entry.isIntersecting)) return;
            countObserver.disconnect();
            const start = performance.now();
            const tick = now => {
              if (context.signal.aborted) return;
              const fraction = Math.min(1, (now - start) / 1400);
              writeCounts(1 - Math.pow(1 - fraction, 3));
              if (fraction < 1) countFrame = requestAnimationFrame(tick);
            };
            writeCounts(0);
            countFrame = requestAnimationFrame(tick);
          }, {threshold: 0.3});
          countObserver.observe(strip);
        }
        root.querySelector('[data-scroll-journey]')?.addEventListener('click', event => {
          event.preventDefault();
          const journey = root.querySelector('#tb-journey');
          journey.tabIndex = -1;
          journey.focus({preventScroll:true});
          journey.scrollIntoView({behavior:reducedMotion?'auto':'smooth',block:'start'});
        }, {signal:context.signal});
        const host = document.createElement('div');
        root.append(host);
        const gallery = window.lightGallery(host,{dynamic:true,dynamicEl:[],plugins:[window.lgZoom,window.lgThumbnail],download:false,thumbnail:true,zoom:true,actualSize:true,
          strings:lang === 'en' ? {closeGallery:'Close gallery',toggleMaximize:'Toggle maximize',previousSlide:'Previous image',nextSlide:'Next image',download:'Download',playVideo:'Play video',mediaLoadingFailed:'Unable to load this image.'} : {closeGallery:'Đóng thư viện ảnh',toggleMaximize:'Bật/tắt toàn màn hình',previousSlide:'Ảnh trước',nextSlide:'Ảnh tiếp theo',download:'Tải xuống',playVideo:'Phát video',mediaLoadingFailed:'Không thể tải ảnh này.'},
          zoomPluginStrings:lang === 'en' ? {zoomIn:'Zoom in',zoomOut:'Zoom out',viewActualSize:'View actual size'} : {zoomIn:'Phóng to',zoomOut:'Thu nhỏ',viewActualSize:'Xem kích thước thực'},
          thumbnailPluginStrings:{toggleThumbnails:lang === 'en' ? 'Toggle thumbnails' : 'Ẩn/hiện ảnh thu nhỏ'}
        });
        let lastTrigger, filtered = images;
        host.addEventListener('lgAfterClose',()=>{if(lastTrigger?.isConnected)lastTrigger.focus();},{signal:context.signal});
        root.addEventListener('click',event=>{
          const trigger = event.target.closest('[data-image]');
          if(!trigger || !root.contains(trigger))return;
          const selected = byImage.get(trigger.dataset.image);
          if(!selected)return;
          lastTrigger=trigger;
          const group = trigger.dataset.group;
          const set = group==='archive'?filtered:blocks.find(b=>b.id===group)?.images.filter(image=>!image.archiveOnly) || [selected];
          gallery.refresh(set.map(item=>({src:item.src,thumb:item.src,alt:field(item, "caption"),subHtml:`<p>${escape(field(item, "caption"))}</p>`})));
          gallery.openGallery(Math.max(0,set.indexOf(selected)));
        },{signal:context.signal});
        root.querySelector('.tb-skip').addEventListener('click',event=>{event.preventDefault();const main=root.querySelector('main');main.tabIndex=-1;main.focus();main.scrollIntoView();},{signal:context.signal});
        if(page==='bo-suu-tap') {
          const search=root.querySelector('#tb-search'),select=root.querySelector('#tb-section'),grid=root.querySelector('.tb-archive-grid');
          const update=()=>{
            const terms=normalize(search.value.trim()).split(/\s+/).filter(Boolean);
            filtered=images.filter(item=>(!select.value||item.sectionId===select.value)&&terms.every(term=>normalize([item.caption, item['title-eng'], blocks.find(b=>b.id===item.blockId).text, blocks.find(b=>b.id===item.blockId)['title-eng']].join(' ')).includes(term)));
            root.querySelector('.tb-result-count').textContent=`${filtered.length} / ${images.length} ${t("ảnh tư liệu")}`;
            grid.innerHTML=filtered.length?filtered.map((item,i)=>`<div class="tb-archive-item">${photoButton(item.id,'archive',i)}<p>${escape(field(item, "caption"))}</p></div>`).join(''):`<p class="tb-empty">${t("Chưa tìm thấy ảnh phù hợp. Hãy thử từ khóa khác hoặc chọn tất cả các chặng.")}</p>`;
          };
          search.addEventListener('input',update,{signal:context.signal});
          select.addEventListener('change',update,{signal:context.signal});
          root.querySelector('form').addEventListener('submit',e=>e.preventDefault(),{signal:context.signal});
          root.querySelector('form').addEventListener('reset',e=>{e.preventDefault();search.value='';select.value='';update();},{signal:context.signal});
          update();
        }
        return ()=>{countObserver?.disconnect();cancelAnimationFrame(countFrame);gallery.destroy();host.remove();};
      }
    });
  }
})();

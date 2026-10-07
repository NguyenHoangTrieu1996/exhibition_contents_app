(function () {
  'use strict';

  const pages = {
    index: {source:'index', vi:'Trang chủ', en:'Home'},
    nongnghiep: {source:'nongnghiep', vi:'Nông nghiệp', en:'Agriculture'},
    congnghiep: {source:'congnghiep', vi:'Công nghiệp', en:'Industry'},
    thuongmai: {source:'thuongmai', vi:'Thương mại', en:'Trade'},
    thuongcang: {source:'thuongcang', vi:'Thương cảng', en:'Commercial Port'},
    dichvu: {source:'dichvu', vi:'Dịch vụ', en:'Services'},
    'congnghiep/congnghiepnang': {source:'congnghiepnang', vi:'Công nghiệp nặng và nhẹ', en:'Heavy and Light Industry'},
    'congnghiep/kimhoan': {source:'kimhoan', vi:'Nghề kim hoàn', en:'Jewelry'},
    'congnghiep/lamgom': {source:'lamgom', vi:'Nghề làm gốm', en:'Pottery'},
    'congnghiep/thucong': {source:'thucong', vi:'Các ngành tiểu thủ công', en:'Handicraft Industries'},
    'congnghiep/khacgo': {source:'khacgo', vi:'Nghề chạm khắc gỗ', en:'Wood Engraving'},
    'congnghiep/ducdong': {source:'ducdong', vi:'Nghề đúc đồng', en:'Bronze Casting'},
    video: {source:'index', vi:'Tư liệu phim', en:'Video'}
  };

  const routeByFile = {
    './page1.html':'nongnghiep',
    './page2.html':'congnghiep',
    './page3.html':'thuongcang',
    './page4.html':'thuongmai',
    './page5.html':'dichvu',
    './congnghiep.html':'congnghiep/congnghiepnang',
    './kimhoan.html':'congnghiep/kimhoan',
    './lamgom.html':'congnghiep/lamgom',
    './thucong.html':'congnghiep/thucong',
    './khacgo.html':'congnghiep/khacgo',
    './ducdong.html':'congnghiep/ducdong',
    './video2/video.html':'video'
  };

  const childPages = new Set([
    'congnghiep/congnghiepnang',
    'congnghiep/kimhoan',
    'congnghiep/lamgom',
    'congnghiep/thucong',
    'congnghiep/khacgo',
    'congnghiep/ducdong'
  ]);

  function setUpLinks(screen, currentPage) {
    screen.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      const target = routeByFile[href];
      if (target) {
        link.href = ExhibitionRoutes.href('phongkinhte', target);
      } else if (href === '#') {
        link.href = ExhibitionRoutes.href('phongkinhte', currentPage);
      }
    });
  }

  function setUpOtherExhibitionsLink(screen) {
    screen.querySelectorAll('.portlofio-box[href="./video2/video.html"]').forEach(link => {
      const english = link.classList.contains('lang-eng');
      link.href = ExhibitionRoutes.href('cacchuyendekhac', 'index');
      link.textContent = english ? 'OTHER EXHIBITIONS' : 'CHUYÊN ĐỀ KHÁC';
      link.setAttribute('aria-label', english ? 'Other exhibitions' : 'Chuyên đề khác');
    });
  }

  function addControls(screen, context, currentPage) {
    const controls = document.createElement('div');
    controls.className = 'economy-controls';

    if (childPages.has(currentPage)) {
      const back = document.createElement('button');
      back.className = 'economy-back';
      back.type = 'button';
      back.setAttribute('aria-label', context.lang === 'vi' ? 'Quay lại Công nghiệp' : 'Back to Industry');
      back.innerHTML = '<i class="economy-back-icon la-long-arrow-alt-left" aria-hidden="true"></i>';
      back.addEventListener('click', () => {
        ExhibitionRoutes.navigate('phongkinhte', 'congnghiep');
      }, {signal:context.signal});
      controls.appendChild(back);
    } else if (currentPage !== 'index') {
      const menu = document.createElement('nav');
      menu.className = 'economy-navigation';
      menu.id = 'economy-navigation';
      menu.setAttribute('aria-label', context.lang === 'vi' ? 'Chuyên đề Phòng Kinh tế' : 'Economy topics');

      const navigationPages = [
        ['nongnghiep', 'seedling', 'NÔNG NGHIỆP', 'AGRICULTURE'],
        ['congnghiep', 'hammer', 'CÔNG NGHIỆP', 'INDUSTRY'],
        ['thuongcang', 'anchor', 'THƯƠNG CẢNG', 'COMMERCIAL PORT'],
        ['thuongmai', 'balance-scale', 'THƯƠNG MẠI', 'TRADE'],
        ['dichvu', 'money-bill', 'DỊCH VỤ', 'SERVICES'],
        ['other-exhibitions', 'list', 'CHUYÊN ĐỀ KHÁC', 'OTHER EXHIBITIONS']
      ];
      navigationPages.forEach(([route, icon, labelVi, labelEn]) => {
        const link = document.createElement('a');
        link.className = 'economy-navigation-link';
        link.href = route === 'other-exhibitions'
          ? ExhibitionRoutes.href('cacchuyendekhac', 'index')
          : ExhibitionRoutes.href('phongkinhte', route);
        link.setAttribute('aria-label', context.lang === 'vi' ? labelVi : labelEn);
        if (route === currentPage) link.setAttribute('aria-current', 'page');

        const symbol = document.createElement('i');
        symbol.className = `economy-navigation-symbol la-${icon}`;
        symbol.setAttribute('aria-hidden', 'true');
        const label = document.createElement('span');
        label.className = 'economy-navigation-label';
        label.textContent = context.lang === 'vi' ? labelVi : labelEn;
        link.append(symbol, label);
        menu.appendChild(link);
      });
      screen.appendChild(menu);

      const toggle = document.createElement('button');
      toggle.className = 'economy-home';
      toggle.type = 'button';
      toggle.setAttribute('aria-label', context.lang === 'vi' ? 'Mở chuyên đề' : 'Open topics');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-controls', menu.id);
      toggle.innerHTML = '<i class="economy-home-icon la-home" aria-hidden="true"></i>';
      toggle.addEventListener('click', () => {
        const isOpen = menu.classList.toggle('is-open');
        toggle.setAttribute('aria-expanded', String(isOpen));
      }, {signal:context.signal});
      controls.appendChild(toggle);
    }

    const language = document.createElement('button');
    language.className = 'economy-language';
    language.type = 'button';
    language.setAttribute('aria-label', context.lang === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt');
    language.innerHTML = `<img src="${window.EconomyBackgrounds[context.lang === 'vi' ? 'lang-eng' : 'lang-vi']}" alt="${context.lang === 'vi' ? 'English' : 'Tiếng Việt'}">`;
    language.addEventListener('click', () => {
      Exhibition.setLanguage(context.lang === 'vi' ? 'en' : 'vi');
    }, {signal:context.signal});
    controls.appendChild(language);
    screen.appendChild(controls);
  }

  function renderVideoNotice(content, language) {
    const heading = document.createElement('h1');
    heading.textContent = language === 'vi' ? 'TƯ LIỆU PHIM' : 'VIDEO';
    const message = document.createElement('p');
    message.textContent = language === 'vi'
      ? 'Tệp video tư liệu chưa có trong bộ tài nguyên của chuyên đề.'
      : 'The exhibition video files are not included in the available assets.';
    content.replaceChildren(heading, message);
  }

  function render(root, context, page, route) {
    if (!window.EconomyPages || !window.EconomyPages[page.source]) {
      throw new Error(`Không tìm thấy nội dung Phòng Kinh tế: ${page.source}.`);
    }

    root.innerHTML = `<div class="economy-screen" data-language="${context.lang}">${window.EconomyPages[page.source]}</div>`;
    const screen = root.querySelector('.economy-screen');
    screen.classList.toggle('economy-home-screen', route === 'index');
    const section = screen.querySelector('.bg-content');
    const languageClass = context.lang === 'en' ? 'eng' : 'vi';
    const background = new URL(
      window.EconomyBackgrounds[section.id] || window.EconomyBackgrounds.trangchu,
      document.baseURI
    );
    section.style.setProperty('--economy-background', `url("${background.href}")`);

    screen.querySelectorAll('.lang').forEach(element => element.style.removeProperty('display'));
    screen.querySelectorAll('.portlofio-content').forEach(grid => {
      if (!grid.querySelector(`.portlofio-box.lang-${languageClass}`)) grid.remove();
    });
    screen.querySelectorAll('img').forEach(image => {
      if (!image.hasAttribute('alt')) image.alt = '';
      image.loading = image.closest('.logo') ? 'eager' : 'lazy';
      image.decoding = 'async';
    });

    setUpOtherExhibitionsLink(screen);

    if (route === 'video') {
      const content = screen.querySelector('.content');
      const portfolio = screen.querySelector('.portlofio');
      if (portfolio) portfolio.remove();
      renderVideoNotice(content, context.lang);
    }

    setUpLinks(screen, route);
    addControls(screen, context, route);
  }

  Object.entries(pages).forEach(([route, page]) => {
    Exhibition.registerPage('phongkinhte', route, {
      render(root, context) {
        render(root, context, page, route);
      }
    });
  });
})();

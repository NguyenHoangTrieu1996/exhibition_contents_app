(function () {
  'use strict';

  const elementRoot = './public/elements/duongham/';
  const navigationItems = [
    {page:'index', vi:'Chuyên Đề', en:'Home', icon:'nav-home.svg'},
    {page:'kientrucxua', vi:'Kiến Trúc Xưa', en:'Architectural Structures', icon:'nav-kientrucxua.svg'},
    {page:'thaynguagiuadong', vi:'Đảo Chính', en:'Stage A Coup', icon:'nav-thaynguagiuadong.svg'},
    {page:'xaydungduongham', vi:'Xây Dựng', en:'Tunnel Construction', icon:'nav-xaydungduongham.svg'},
    {page:'ngoiphao', vi:'Ngòi Pháo', en:'The Spark', icon:'nav-ngoiphao.svg'},
    {app:'cacchuyendekhac', page:'index', vi:'Chuyên Đề Khác', en:'Other Exhibitions', icon:'nav-cacchuyendekhac.svg'}
  ];

  const collections = [
    {page:'index', renderer:'VaiNetVeDinh', data:'Datavainetvedinhgialong'},
    {page:'kientrucxua', renderer:'KienTrucXua', data:'Datakientrucxua'},
    {page:'thaynguagiuadong', renderer:'ThayNguaGiuaDong', data:'Datathaynguagiuadong'},
    {page:'xaydungduongham', renderer:'XayDungDuongHam', data:'Dataxaydungduongham'},
    {page:'ngoiphao', renderer:'NgoiPhao', data:'Datangoiphao'}
  ];

  function appendNavigation(screen, context, currentPage) {
    const list = screen.querySelector('.nav-list');
    navigationItems.forEach(item => {
      const app = item.app || 'duongham';
      const link = document.createElement('a');
      link.className = `nav-item${app === 'duongham' && item.page === currentPage ? ' active' : ''}`;
      link.href = ExhibitionRoutes.href(app, item.page);
      link.setAttribute('aria-label', context.lang === 'vi' ? item.vi : item.en);
      if (app === 'duongham' && item.page === currentPage) link.setAttribute('aria-current', 'page');

      const icon = document.createElement('img');
      icon.src = `${elementRoot}${item.icon}`;
      icon.alt = '';
      icon.setAttribute('aria-hidden', 'true');

      const vietnamese = document.createElement('p');
      vietnamese.className = 'lang lang-vi';
      vietnamese.textContent = item.vi;
      const english = document.createElement('p');
      english.className = 'lang lang-eng';
      english.textContent = item.en;
      link.append(icon, vietnamese, english);

      const entry = document.createElement('li');
      entry.appendChild(link);
      list.appendChild(entry);
    });
  }

  function appendGallery(container, items) {
    items.forEach((item, index) => {
      if (item.title1) {
        const vi = document.createElement('h2');
        vi.className = 'lang lang-vi';
        vi.innerHTML = item.title1;
        const en = document.createElement('h2');
        en.className = 'lang lang-eng';
        en.innerHTML = item.title2;
        container.append(vi, en);
        return;
      }

      const box = document.createElement('div');
      box.className = 'box';
      const image = document.createElement('img');
      image.className = 'd-block w-100';
      image.src = item.img;
      image.alt = String(item.decs1 || item.decs2 || index + 1).replace(/<[^>]*>/g, '');
      image.loading = index < 5 ? 'eager' : 'lazy';
      image.decoding = 'async';

      const vietnamese = document.createElement('p');
      vietnamese.className = 'lang lang-vi';
      vietnamese.innerHTML = item.decs1 || '';
      const english = document.createElement('p');
      english.className = 'lang lang-eng';
      english.innerHTML = item.decs2 || '';
      box.append(image, vietnamese, english);
      container.appendChild(box);
    });
  }

  function render(root, context, collection) {
    const items = window[collection.data];
    const renderContent = window[collection.renderer];
    if (!Array.isArray(items) || typeof renderContent !== 'function') {
      throw new Error(`Thiếu dữ liệu hoặc nội dung chuyên đề Đường hầm: ${collection.page}.`);
    }

    root.innerHTML = `
      <div class="duongham-screen" data-lang="${context.lang}">
        <div class="bg" aria-hidden="true"></div>
        <header class="logo">
          <img src="${elementRoot}logo.png" alt="Bảo tàng Thành phố Hồ Chí Minh">
        </header>
        <nav class="nav-bar" aria-label="${context.lang === 'vi' ? 'Các chuyên đề Đường hầm' : 'Tunnel exhibitions'}">
          <div class="nav-decor" aria-hidden="true"></div>
          <ul class="nav-list"></ul>
        </nav>
        <button class="duongham-language" type="button"
          aria-label="${context.lang === 'vi' ? 'Switch to English' : 'Chuyển sang tiếng Việt'}">
          <img src="${elementRoot}${context.lang === 'vi' ? 'language-en.png' : 'language-vi.png'}"
            alt="${context.lang === 'vi' ? 'English' : 'Tiếng Việt'}">
        </button>
        <div class="duongham-content">${renderContent()}</div>
      </div>`;

    const screen = root.querySelector('.duongham-screen');
    screen.querySelectorAll('.lang').forEach(element => element.style.removeProperty('display'));
    appendNavigation(screen, context, collection.page);
    appendGallery(screen.querySelector('#dataMap'), items);

    screen.querySelector('.duongham-language').addEventListener('click', () => {
      Exhibition.setLanguage(context.lang === 'vi' ? 'en' : 'vi');
    }, {signal:context.signal});
    screen.querySelectorAll('.readmore-btn').forEach(button => {
      button.addEventListener('click', () => {
        const wrapper = button.closest('.readmore-wrap');
        wrapper.classList.toggle('show');
        button.textContent = wrapper.classList.contains('show') ? button.dataset.close : button.dataset.open;
      }, {signal:context.signal});
    });
  }

  collections.forEach(collection => {
    Exhibition.registerPage('duongham', collection.page, {
      render(root, context) {
        render(root, context, collection);
      }
    });
  });
})();

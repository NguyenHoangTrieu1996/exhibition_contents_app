(function () {
  'use strict';

  const elementRoot = './public/elements/lansurong/';
  const imageRoot = './public/images/lansurong/';
  const videoRoot = './public/videos/lansurong/';
  const sections = [
    {page:'nguongoc', factory:'nguongoc', vi:'NGUỒN GỐC VÀ TRUYỀN THUYẾT', en:'ORIGIN AND LEGENDS'},
    {page:'chetac', factory:'chetac', vi:'CHẾ TÁC', en:'PRODUCTION'},
    {page:'bieudien', factory:'bieudien', vi:'BIỂU DIỄN', en:'PERFORMANCES'},
    {page:'doisong', factory:'doisong', vi:'TRONG ĐỜI SỐNG CỘNG ĐỒNG', en:'IN COMMUNITY LIFE'},
    {page:'index', factory:'index', vi:'NGHỆ THUẬT LÂN SƯ RỒNG', en:'LION, UNICORN & DRAGON DANCE'}
  ];

  function localizeMedia(markup) {
    return markup
      .replace(/\.\/public\/images\/(video\d+\.mp4)/g, `${videoRoot}$1`)
      .replace(/\.\/public\/images\//g, imageRoot)
      .replace(/loading=["']eager["']/g, 'loading="lazy"');
  }

  function render(root, context, section) {
    const pageFactory = window.Pages?.[section.factory];
    if (typeof pageFactory !== 'function') {
      throw new Error(`Không tìm thấy nội dung chuyên đề Lân Sư Rồng: ${section.page}.`);
    }

    const content = localizeMedia(pageFactory());
    const english = context.lang === 'en';
    const languageButtonAlt = english ? 'Tiếng Việt' : 'English';
    const navLabel = english ? 'Lion and Dragon Dance sections' : 'Các chuyên đề Lân Sư Rồng';

    root.innerHTML = `
      <div class="lion-screen" data-language="${context.lang}">
        <header class="lion-logo">
          <img src="${elementRoot}logo.png" alt="Bảo tàng Thành phố Hồ Chí Minh">
        </header>
        <button class="lion-language" type="button"
          aria-label="${english ? 'Chuyển sang tiếng Việt' : 'Switch to English'}">
          <img src="${elementRoot}${english ? 'language-vi.png' : 'language-en.png'}" alt="${languageButtonAlt}">
        </button>
        <nav class="lion-portfolio" aria-label="${navLabel}">
          <div class="lion-frame">
            <div class="lion-portfolio-content"></div>
          </div>
        </nav>
        <div class="lion-background-bottom" aria-hidden="true">
          <img src="${elementRoot}bg-bottom.png" alt="">
        </div>
        ${section.page === 'index' ? '' : `<div class="lion-child-background" aria-hidden="true"><img src="${elementRoot}bg-child.jpg" alt=""></div>`}
        <div class="lion-page">${content}</div>
      </div>`;

    const screen = root.querySelector('.lion-screen');
    const navigation = screen.querySelector('.lion-portfolio-content');
    sections.forEach(item => {
      const link = document.createElement('a');
      link.className = `lion-portfolio-box${item.page === section.page ? ' active' : ''}`;
      link.href = ExhibitionRoutes.href('lansurong', item.page);
      link.setAttribute('aria-label', english ? item.en : item.vi);
      if (item.page === section.page) link.setAttribute('aria-current', 'page');

      const vietnamese = document.createElement('p');
      vietnamese.className = 'lang lang-vi';
      vietnamese.textContent = item.vi;
      const englishLabel = document.createElement('p');
      englishLabel.className = 'lang lang-eng';
      englishLabel.textContent = item.en;
      link.append(vietnamese, englishLabel);
      navigation.appendChild(link);
    });

    const otherExhibitions = document.createElement('a');
    otherExhibitions.className = 'lion-portfolio-box lion-portfolio-return';
    otherExhibitions.href = ExhibitionRoutes.href('cacchuyendekhac', 'index');
    otherExhibitions.setAttribute('aria-label', english ? 'Other Exhibitions' : 'Chuyên Đề Khác');
    const otherExhibitionsVi = document.createElement('p');
    otherExhibitionsVi.className = 'lang lang-vi';
    otherExhibitionsVi.textContent = 'CHUYÊN ĐỀ KHÁC';
    const otherExhibitionsEn = document.createElement('p');
    otherExhibitionsEn.className = 'lang lang-eng';
    otherExhibitionsEn.textContent = 'OTHER EXHIBITIONS';
    otherExhibitions.append(otherExhibitionsVi, otherExhibitionsEn);
    navigation.appendChild(otherExhibitions);

    screen.querySelector('.lion-language').addEventListener('click', () => {
      Exhibition.setLanguage(english ? 'vi' : 'en');
    }, {signal:context.signal});

    const videos = [...screen.querySelectorAll('video')];
    videos.forEach(video => {
      video.preload = 'none';
      video.playsInline = true;
    });
    if (videos.length) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) entry.target.pause();
        });
      }, {threshold:0.3});
      videos.forEach(video => observer.observe(video));
      context.onCleanup(() => {
        observer.disconnect();
        videos.forEach(video => video.pause());
      });
    }

    if (section.page === 'index' && typeof window.initFireworks === 'function') {
      context.onCleanup(window.initFireworks());
    }

    screen.querySelectorAll('img').forEach((image, index) => {
      if (!image.hasAttribute('alt')) image.alt = '';
      if (image.closest('.lion-page')) {
        image.loading = index === 0 ? 'eager' : 'lazy';
        image.decoding = 'async';
      }
    });
  }

  sections.forEach(section => {
    Exhibition.registerPage('lansurong', section.page, {
      render(root, context) {
        render(root, context, section);
      }
    });
  });
})();

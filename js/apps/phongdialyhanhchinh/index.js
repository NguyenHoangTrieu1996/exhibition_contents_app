(function () {
  'use strict';

  const appId = 'phongdialyhanhchinh';
  const elementRoot = './public/elements/phongdialyhanhchinh/';
  let lastRenderedRouteChange = null;
  const menuItems = [
    {page:'index', title:'Ấn Tín', titleEn:'Seals', image:'button1.png', imageEn:'Asset 4.png'},
    {page:'bando', title:'Bản đồ', titleEn:'Maps', image:'button2.png', imageEn:'Asset 3.png'},
    {page:'sacphong', title:'Chiếu chỉ', titleEn:'Decrees', image:'button3.png', imageEn:'Asset 5.png'},
    {page:'saigon', title:'Sài Gòn xưa và nay', titleEn:'Saigon: Past and Present', image:'button4.png', imageEn:'Asset 1.png'},
    {app:'cacchuyendekhac', page:'index', title:'Tài liệu', titleEn:'Documents', image:'button5.png', imageEn:'Asset 2.png'}
  ];

  const collections = [
    {
      page:'index',
      data:'index',
      carouselId:'antin',
      title:'Ấn Tín',
      titleEn:'Seals',
      interval:5000
    },
    {
      page:'antin',
      data:'index',
      carouselId:'antin',
      title:'Ấn Tín',
      titleEn:'Seals',
      interval:5000
    },
    {
      page:'bando',
      data:'bando',
      carouselId:'bando',
      title:'Các Bản Đồ',
      titleEn:'Maps',
      interval:5000
    },
    {
      page:'sacphong',
      data:'sacphong',
      carouselId:'sacphong',
      title:'Sắc Phong',
      titleEn:'Decrees',
      interval:5000
    },
    {
      page:'saigon',
      data:'saigon',
      carouselId:'saingon',
      title:'Sài Gòn Xưa Và Nay',
      titleEn:'Saigon - Past And Present',
      interval:20000,
      comparison:true
    }
  ];

  function imageSource(source) {
    return source.replace(
      /^\.\/public\/images\/(antin|bando|sacphong)\//,
      './public/images/phongdialyhanhchinh/$1/'
    );
  }

  function render(root, context, collection) {
    const english = context.lang === 'en';
    const items = window.datas?.[collection.data];
    if (!Array.isArray(items) || items.length === 0) {
      throw new Error(`Không tìm thấy dữ liệu trưng bày: ${collection.data}.`);
    }
    const currentRouteChange = ExhibitionRoutes.changeId();
    const animateMenu = currentRouteChange !== lastRenderedRouteChange
      && ExhibitionRoutes.previous()?.app !== appId;
    lastRenderedRouteChange = currentRouteChange;

    root.innerHTML = `
      <div class="geography-screen${animateMenu ? ' geography-screen--animate-entry' : ''}">
        <div class="logo">
          <img src="${elementRoot}logo.png" alt="Bảo tàng Thành phố Hồ Chí Minh">
        </div>
        <div class="background-button">
          <div class="img-bg">
            <img src="${elementRoot}bg-button.png" alt="">
          </div>
          <nav class="geography-menu${animateMenu ? ' geography-menu--animate' : ''}" aria-label="${english ? 'Exhibition sections' : 'Các khu vực trưng bày'}"></nav>
        </div>
        <button class="geography-language" type="button"
          aria-label="${english ? 'Chuyển sang tiếng Việt' : 'Switch to English'}">
          <img src="${elementRoot}${english ? 'language-vi.png' : 'language-en.png'}"
            alt="${english ? 'Tiếng Việt' : 'English'}">
        </button>
        <section class="geography-exhibition">
          <h1>${english ? collection.titleEn : collection.title}</h1>
          <div id="${collection.carouselId}" class="carousel slide carousel-fade geography-carousel" data-carousel>
            <div class="background-top" aria-hidden="true"></div>
            <div class="carousel-inner"></div>
            <button class="carousel-control-prev" type="button"
              aria-label="${english ? 'Previous item' : 'Hiện vật trước'}">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button class="carousel-control-next" type="button"
              aria-label="${english ? 'Next item' : 'Hiện vật tiếp theo'}">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
          </div>
        </section>
      </div>`;

    const menu = root.querySelector('.geography-menu');
    const currentPage = collection.page === 'antin' ? 'index' : collection.page;
    menuItems.forEach(item => {
      const link = document.createElement('a');
      link.className = `nav-item${!item.app && item.page === currentPage ? ' active' : ''}`;
      link.href = ExhibitionRoutes.href(item.app || appId, item.page);
      link.setAttribute('aria-label', english ? item.titleEn : item.title);
      const image = document.createElement('img');
      image.src = `${elementRoot}${english ? item.imageEn : item.image}`;
      image.alt = english ? item.titleEn : item.title;
      link.appendChild(image);
      menu.appendChild(link);
    });

    root.querySelector('.geography-language').addEventListener('click', () => {
      Exhibition.setLanguage(english ? 'vi' : 'en');
    }, {signal:context.signal});

    const slides = root.querySelector('.carousel-inner');
    items.forEach((item, index) => {
      const slide = document.createElement('div');
      slide.className = `carousel-item${index === 0 ? ' active' : ''}`;

      if (collection.comparison) {
        const comparison = document.createElement('div');
        comparison.className = 'beer-slider';
        comparison.dataset.beerLabel = 'Before';

        const before = document.createElement('img');
        before.src = item.img2;
        before.alt = 'Saigon: past';
        comparison.appendChild(before);

        const reveal = document.createElement('div');
        reveal.className = 'beer-reveal';
        reveal.dataset.beerLabel = 'After';
        const after = document.createElement('img');
        after.src = item.img1;
        after.alt = 'Saigon: present';
        reveal.appendChild(after);
        comparison.appendChild(reveal);
        slide.appendChild(comparison);
      } else {
        const image = document.createElement('img');
        image.className = 'd-block w-100';
        image.src = imageSource(item.img);
        image.alt = `${collection.title} ${index + 1}`;
        slide.appendChild(image);
      }

      const caption = document.createElement('div');
      caption.className = 'carousel-caption d-block d-md-block';
      const description = document.createElement('p');
      description.textContent = collection.comparison
        ? (english ? item.desc2 : item.desc)
        : (english ? item.desc2 : item.desc1);
      caption.appendChild(description);
      slide.appendChild(caption);
      slides.appendChild(slide);
    });
  }

  collections.forEach(collection => {
    const definition = {
      features:{
        carousel:{interval:collection.interval, ride:'carousel', touch:!collection.comparison},
      },
      render(root, context) {
        render(root, context, collection);
      }
    };

    definition.afterRender = function (element, context) {
      const carousel = element.querySelector('[data-carousel]');
      const previous = carousel.querySelector('.carousel-control-prev');
      const next = carousel.querySelector('.carousel-control-next');
      previous.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        window.bootstrap.Carousel.getInstance(carousel).prev();
      }, {signal:context.signal});
      next.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        window.bootstrap.Carousel.getInstance(carousel).next();
      }, {signal:context.signal});

      if (!collection.comparison) return;

      const observers = [];
      const sliders = new WeakMap();
      class ScopedBeerSlider extends window.BeerSlider {
        onImagesLoad() {}
        addListeners() {}
      }

      function initializeActiveSlider() {
        const node = carousel.querySelector('.carousel-item.active .beer-slider');
        if (!node) return;

        let slider = sliders.get(node);
        if (!slider) {
          slider = new ScopedBeerSlider(node, {start:50});
          slider.init();
          sliders.set(node, slider);
          slider.range.setAttribute('aria-label',
            context.lang === 'vi' ? 'Tỷ lệ ảnh so sánh' : 'Image comparison percentage');
          for (const event of ['input','change']) {
            slider.range.addEventListener(event, () => slider.move(), {signal:context.signal});
          }
          ['pointerdown','touchstart','mousedown'].forEach(event => {
            slider.range.addEventListener(event, event => event.stopPropagation(), {signal:context.signal});
          });

          const refresh = () => {
            if (!context.signal.aborted && node.getBoundingClientRect().width > 0) {
              slider.setImgWidth();
            }
          };
          [...node.querySelectorAll('img')].forEach(image => {
            image.addEventListener('load', refresh, {signal:context.signal});
          });
          const observer = new ResizeObserver(refresh);
          observer.observe(node);
          observers.push(observer);
        }

        requestAnimationFrame(() => {
          if (!context.signal.aborted && node.getBoundingClientRect().width > 0) {
            slider.setImgWidth();
          }
        });
      }

      carousel.addEventListener('slid.bs.carousel', initializeActiveSlider, {signal:context.signal});
      window.addEventListener('resize', initializeActiveSlider, {signal:context.signal});
      initializeActiveSlider();
      return () => observers.forEach(observer => observer.disconnect());
    };

    Exhibition.registerPage(appId, collection.page, definition);
  });
})();

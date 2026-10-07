(function () {
  'use strict';

  const imageRoot = './public/images/trangphuccotrang/';
  const slideCount = 55;

  function render(root, context) {
    const slides = Array.from({length:slideCount}, (_, index) => {
      const imageNumber = index + 1;
      return `
        <div class="carousel-item${index === 0 ? ' active' : ''}">
          <img
            src="${imageRoot}1x/${imageNumber}.jpg"
            alt="Trang phục cổ trang - hình ${imageNumber} trên ${slideCount}"
            class="costume-slide-image"
            loading="${index === 0 ? 'eager' : 'lazy'}"
            decoding="async">
        </div>`;
    }).join('');

    const thumbnails = Array.from({length:slideCount}, (_, index) => {
      const imageNumber = index + 1;
      return `
        <button class="costume-thumbnail${index === 0 ? ' active' : ''}"
          type="button" data-slide-index="${index}"
          aria-label="${context.lang === 'vi' ? 'Hiển thị hình' : 'Show image'} ${imageNumber}"
          aria-current="${index === 0 ? 'true' : 'false'}">
          <img src="${imageRoot}1x/${imageNumber}.jpg"
            alt="" loading="${index < 8 ? 'eager' : 'lazy'}" decoding="async">
        </button>`;
    }).join('');

    root.innerHTML = `
      <section class="costume-screen" aria-label="${context.lang === 'vi' ? 'Trang phục cổ trang' : 'Historical costumes'}">
        <a class="costume-return" href="${ExhibitionRoutes.href('cacchuyendekhac', 'index')}"
          aria-label="${context.lang === 'vi' ? 'Quay về Các chuyên đề khác' : 'Return to Other Exhibitions'}">
          <i class="fa-solid fa-list" aria-hidden="true"></i>
          <span>${context.lang === 'vi' ? 'CHUYÊN ĐỀ KHÁC' : 'OTHER EXHIBITIONS'}</span>
        </a>

        <div class="costume-carousel carousel slide" data-carousel id="costume-carousel">
          <div class="carousel-inner">${slides}</div>
          <button class="carousel-control-prev" type="button"
            data-bs-target="#costume-carousel" data-bs-slide="prev"
            aria-label="${context.lang === 'vi' ? 'Ảnh trước' : 'Previous image'}">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          </button>
          <button class="carousel-control-next" type="button"
            data-bs-target="#costume-carousel" data-bs-slide="next"
            aria-label="${context.lang === 'vi' ? 'Ảnh tiếp theo' : 'Next image'}">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
          </button>
          <div class="costume-countdown" aria-hidden="true">
            <svg viewBox="0 0 100 100">
              <circle class="costume-countdown-progress" cx="50" cy="50" r="45"></circle>
            </svg>
            <span class="costume-countdown-number">5</span>
          </div>
        </div>

        <nav class="costume-thumbnails" aria-label="${context.lang === 'vi' ? 'Chọn ảnh trang phục' : 'Choose a costume image'}">
          ${thumbnails}
        </nav>
      </section>`;
  }

  function afterRender(root, context) {
    const screen = root.querySelector('.costume-screen');
    const carousel = screen.querySelector('.costume-carousel');
    const thumbnailStrip = screen.querySelector('.costume-thumbnails');
    const thumbnails = [...screen.querySelectorAll('.costume-thumbnail')];
    const number = screen.querySelector('.costume-countdown-number');
    const progress = screen.querySelector('.costume-countdown-progress');
    const carouselInstance = bootstrap.Carousel.getInstance(carousel);
    const circumference = 2 * Math.PI * 45;
    let countdownInterval;
    let countdownRun = 0;

    progress.style.strokeDasharray = String(circumference);
    const updateActiveThumbnail = index => {
      thumbnails.forEach((thumbnail, thumbnailIndex) => {
        const active = thumbnailIndex === index;
        thumbnail.classList.toggle('active', active);
        thumbnail.setAttribute('aria-current', String(active));
      });
      const thumbnail = thumbnails[index];
      if (thumbnail) {
        thumbnailStrip.scrollTo({
          left:thumbnail.offsetLeft - thumbnailStrip.clientWidth / 2 + thumbnail.clientWidth / 2,
          behavior:'smooth'
        });
      }
    };

    const stopCountdown = () => {
      window.clearInterval(countdownInterval);
      countdownInterval = undefined;
      countdownRun += 1;
      progress.style.transition = 'none';
      progress.style.strokeDashoffset = '0';
    };

    const startCountdown = () => {
      stopCountdown();
      const run = countdownRun;
      let remaining = 5;
      number.textContent = '5';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (context.signal.aborted || run !== countdownRun) return;
          progress.style.transition = `stroke-dashoffset ${remaining}s linear`;
          progress.style.strokeDashoffset = String(circumference);
        });
      });

      countdownInterval = window.setInterval(() => {
        remaining -= 1;
        number.textContent = String(remaining);
        if (remaining <= 0) {
          window.clearInterval(countdownInterval);
          countdownInterval = undefined;
          carouselInstance.next();
        }
      }, 1000);
    };

    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        const index = Number(thumbnail.dataset.slideIndex);
        if (thumbnail.classList.contains('active')) {
          startCountdown();
        } else {
          carouselInstance.to(index);
        }
      }, {signal:context.signal});
    });

    carousel.addEventListener('slide.bs.carousel', event => {
      stopCountdown();
      number.textContent = '5';
      event.relatedTarget?.querySelector('img')?.setAttribute('loading', 'eager');
    }, {signal:context.signal});

    carousel.addEventListener('slid.bs.carousel', event => {
      updateActiveThumbnail(event.to);
      startCountdown();
    }, {signal:context.signal});

    startCountdown();
    context.onCleanup(stopCountdown);
  }

  Exhibition.registerPage('TrangPhucCoTrang', 'index', {
    features:{carousel:{interval:false, ride:false, pause:true, touch:true, wrap:true}},
    render,
    afterRender
  });
})();

(function () {
  'use strict';
  const languageClasses = {
    vi: ['lang-vi', 'lang-vi-block', 'lang-vi-flex'],
    en: ['lang-eng', 'lang-eng-block', 'lang-eng-flex']
  };
  const genericImageAlt = /^(anh|hinh anh|hinhanh|image|photo|picture)$/i;

  function escapeHtml(value) {
    return value.replace(/[&<>"']/g, character => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[character]);
  }

  function galleryCaption(image, language) {
    const alt = image.alt.trim();
    if (alt && !genericImageAlt.test(alt)) return alt;

    const caption = image.closest('.hinhanh')?.previousElementSibling;
    if (caption) {
      const languageSelector = language === 'vi'
        ? '.lang-vi-block, .lang-vi-flex, .lang-vi'
        : '.lang-eng-block, .lang-eng-flex, .lang-eng';
      const translated = [...caption.querySelectorAll(languageSelector)]
        .find(node => node.textContent.trim() && getComputedStyle(node).display !== 'none');
      return (translated || caption).textContent.trim();
    }
    const heading = image.closest('.aboutus')?.querySelector('h1, h2, h3');
    if (heading?.innerText.trim()) return heading.innerText.trim();
    return alt;
  }

  window.VanHoa = {
    register(page, markup) {
      Exhibition.registerPage('vanhoa', page, {
        render(root) {
          root.innerHTML = `<div class="vanhoa-screen">${markup}</div>`;
          // Animated content creates a stacking context and a containing block
          // for fixed elements. Keep modals outside it, but inside the theme
          // so scoped styles, language switching and gallery lookup still work.
          const modalContainer = root.querySelector('#theme_switch_dark') || root.querySelector('.vanhoa-screen');
          root.querySelectorAll('.modal').forEach(modal => modalContainer.appendChild(modal));
          root.querySelectorAll('section.carousel[data-carousel]').forEach(node => {
            node.removeAttribute('data-carousel');
          });
        },
        features: { carousel: { interval: 6000, ride: 'carousel' } },
        afterRender(root, context) {
          const visible = languageClasses[context.lang];
          root.querySelectorAll('.lang, .lang-vi, .lang-eng, .lang-vi-block, .lang-eng-block, .lang-vi-flex, .lang-eng-flex')
            .forEach(node => { node.style.display = 'none'; });
          root.querySelectorAll(`.${visible[0]}`).forEach(node => { node.style.display = 'inline'; });
          root.querySelectorAll(`.${visible[1]}`).forEach(node => { node.style.display = 'block'; });
          root.querySelectorAll(`.${visible[2]}`).forEach(node => { node.style.display = 'flex'; });

          const languageSwitch = root.querySelector('#lang_switch');
          if (languageSwitch) {
            const toggleLanguage = event => {
              event.preventDefault();
              Exhibition.setLanguage(context.lang === 'vi' ? 'en' : 'vi');
            };
            languageSwitch.addEventListener('click', toggleLanguage);
            context.onCleanup(() => languageSwitch.removeEventListener('click', toggleLanguage));
          }

          const scrollLinks = [];
          root.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(link => {
            const href = link.getAttribute('href');
            if (href.startsWith('#/')) return;
            const target = root.ownerDocument.getElementById(href.slice(1));
            if (!target || !root.contains(target)) return;
            const scrollToTarget = event => {
              event.preventDefault();
              target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            };
            link.addEventListener('click', scrollToTarget);
            scrollLinks.push(() => link.removeEventListener('click', scrollToTarget));
          });

          // The ceremony and engagement lists are separate galleries in the source.
          const linkedGalleries = [];
          [['static-thumbnails', '.lightimg'], ['static-thumbnailss', '.lighting']].forEach(([id, selector]) => {
            const host = root.querySelector('#' + id);
            if (!host || !host.querySelector(selector + '[data-src]')) return;
            root.dataset.lightgallery = '';
            const instance = window.lightGallery(host, {
              selector,
              plugins: [window.lgZoom, window.lgThumbnail],
              exThumbImage: 'data-exthumbimage',
              download: false,
              thumbnail: true,
              zoom: true
            });
            linkedGalleries.push(instance);
            host.querySelectorAll(selector).forEach(link => {
              link.href = link.dataset.src;
              link.removeAttribute('data-bs-dismiss');
              link.addEventListener('keydown', event => {
                if (event.key === ' ') { event.preventDefault(); link.click(); }
              }, { signal: context.signal });
            });
            // Suspend the Bootstrap focus trap while the gallery is above its modal.
            const modal = host.closest('.modal');
            if (modal) {
              host.addEventListener('lgBeforeOpen', () => {
                window.bootstrap.Modal.getInstance(modal)?.hide();
              }, { signal: context.signal });
              host.addEventListener('lgAfterClose', () => {
                if (!context.signal.aborted) window.bootstrap.Modal.getOrCreateInstance(modal).show();
              }, { signal: context.signal });
            }
          });

          const photos = [...root.querySelectorAll('img')].filter(image =>
            image.getAttribute('src')?.trim()
            && !image.closest('nav, header, button, a, [aria-hidden="true"], #lang_switch, [data-source-missing]')
          );
          let gallery;
          let galleryHost;
          let lastOpenedImage;

          if (photos.length) {
            const dynamicEl = photos.map(image => {
              const src = image.currentSrc || image.src;
              const caption = galleryCaption(image, context.lang);
              return {
                src,
                thumb: src,
                alt: caption,
                subHtml: caption ? `<p>${escapeHtml(caption)}</p>` : ''
              };
            });
            galleryHost = root.ownerDocument.createElement('div');
            galleryHost.className = 'vanhoa-lightgallery-host';
            root.dataset.lightgallery = '';
            root.appendChild(galleryHost);
            gallery = window.lightGallery(galleryHost, {
              dynamic: true,
              dynamicEl,
              plugins: [window.lgZoom, window.lgThumbnail],
              download: false,
              thumbnail: true,
              zoom: true
            });

            photos.forEach((image, index) => {
              const caption = dynamicEl[index].alt;
              image.classList.add('vanhoa-lightgallery-image');
              image.tabIndex = 0;
              image.setAttribute('role', 'button');
              image.setAttribute('aria-label', `${context.lang === 'vi' ? 'Xem ảnh lớn' : 'View larger image'}${caption ? ': ' + caption : ''}`);

              const openGallery = () => {
                lastOpenedImage = image;
                gallery.openGallery(index);
              };
              image.addEventListener('click', openGallery, { signal: context.signal });
              image.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openGallery();
                }
              }, { signal: context.signal });
            });
            galleryHost.addEventListener('lgAfterClose', () => lastOpenedImage?.focus(), { signal: context.signal });
          }

          return () => {
            scrollLinks.forEach(removeListener => removeListener());
            linkedGalleries.forEach(instance => instance.destroy());
            gallery?.destroy();
            galleryHost?.remove();
          };
        }
      });
    }
  };
})();

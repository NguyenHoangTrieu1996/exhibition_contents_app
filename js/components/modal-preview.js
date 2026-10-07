(function () {
  'use strict';

  window.ExhibitionComponents = window.ExhibitionComponents || {};

  const labels = {
    vi: {open:'Xem ảnh lớn', close:'Đóng ảnh', dialog:'Xem trước hình ảnh'},
    en: {open:'View larger image', close:'Close image', dialog:'Image preview'}
  };

  function isPreviewable(image) {
    return image.alt.trim() !== ''
      && !image.closest('nav, header, button, a, [aria-hidden="true"], [data-lightgallery], .logo, .background-button, .img-bg, .background-top, .bg');
  }

  function attach(root, language, signal) {
    const strings = labels[language] || labels.vi;
    let dialog = null;
    let activeImage = null;

    function close() {
      if (!dialog) return;
      if (dialog.open) dialog.close();
      dialog.remove();
      dialog = null;
      if (activeImage?.isConnected) activeImage.focus();
      activeImage = null;
    }

    function ensureDialog() {
      if (dialog) return dialog;

      dialog = document.createElement('dialog');
      dialog.className = 'image-preview-dialog';
      dialog.setAttribute('aria-label', strings.dialog);

      const closeButton = document.createElement('button');
      closeButton.className = 'image-preview-close';
      closeButton.type = 'button';
      closeButton.textContent = strings.close;
      closeButton.addEventListener('click', close);

      const figure = document.createElement('figure');
      figure.className = 'image-preview-figure';

      const previewImage = document.createElement('img');
      previewImage.className = 'image-preview-content';
      previewImage.alt = '';
      previewImage.decoding = 'async';

      const caption = document.createElement('figcaption');
      caption.className = 'image-preview-caption';
      figure.append(previewImage, caption);
      dialog.append(closeButton, figure);
      dialog.addEventListener('click', event => {
        if (event.target === dialog) close();
      });
      dialog.addEventListener('cancel', event => {
        event.preventDefault();
        close();
      });
      dialog.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
          event.preventDefault();
          close();
        }
      });
      document.body.appendChild(dialog);
      return dialog;
    }

    function open(image) {
      const source = image.currentSrc || image.src;
      if (!source) return;

      const preview = ensureDialog();
      activeImage = image;
      const previewImage = preview.querySelector('.image-preview-content');
      previewImage.src = source;
      previewImage.alt = image.alt;
      preview.querySelector('.image-preview-caption').textContent = image.alt;
      preview.showModal();
    }

    root.querySelectorAll('img').forEach(image => {
      if (!isPreviewable(image)) return;
      image.classList.add('previewable-image');
      image.tabIndex = 0;
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', `${strings.open}: ${image.alt}`);
    });

    root.addEventListener('click', event => {
      const image = event.target.closest('img.previewable-image');
      if (image) open(image);
    }, {signal});
    root.addEventListener('keydown', event => {
      const image = event.target.closest('img.previewable-image');
      if (image && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        open(image);
      }
    }, {signal});

    return close;
  }

  window.ExhibitionComponents.Preview = {attach};
})();

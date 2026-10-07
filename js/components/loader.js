(function () {
  'use strict';

  window.ExhibitionComponents = window.ExhibitionComponents || {};

  window.ExhibitionComponents.Loader = {
    show(root, message) {
      const loader = document.createElement('div');
      loader.className = 'spa-loader';
      loader.setAttribute('role', 'status');
      loader.setAttribute('aria-live', 'polite');

      const spinner = document.createElement('span');
      spinner.className = 'spa-loader-spinner';
      spinner.setAttribute('aria-hidden', 'true');

      const label = document.createElement('span');
      label.textContent = message;

      loader.append(spinner, label);
      root.replaceChildren(loader);
    },

    hide(root) {
      root.querySelector('.spa-loader')?.remove();
    }
  };
})();

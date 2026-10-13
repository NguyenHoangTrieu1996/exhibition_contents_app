(function () {
  'use strict';
  window.ExhibitionComponents = window.ExhibitionComponents || {};
  // Preserve the original portrait exhibition on large vertical displays.
  // Phones, tablets and landscape displays continue to use the reflow layout.
  const exhibitionDisplay = window.matchMedia('(min-width:1000px) and (max-aspect-ratio:3/4)');
  const originalTypography = new WeakMap();
  function mountControls(root, signal) {
    const groups = [
      ['.economy-screen', '.economy-home,.economy-back,.economy-language'],
      ['.lion-screen', '.lion-logo,.lion-language'],
      ['.river-screen', '.river-home,.river-language'],
      ['.dcd-screen', '.dcd-footer-button,.dcd-toolbar'],
      ['.st-screen', '.st-page-controls']
    ];
    const layouts = [];
    groups.forEach(([selector, controls]) => {
      const screen = root.querySelector(selector);
      if (!screen || screen.querySelector('.exhibition-controls')) return;
      const buttons = [...screen.querySelectorAll(controls)];
      if (!buttons.length) return;
      const bar = document.createElement('div');
      bar.className = 'exhibition-controls';
      const positions = buttons.map(button => {
        const marker = document.createComment('control position');
        button.before(marker);
        return {button, marker};
      });
      layouts.push({screen, bar, positions});
    });
    function updateLayout() {
      layouts.forEach(({screen, bar, positions}) => {
        if (exhibitionDisplay.matches) {
          positions.forEach(({button, marker}) => marker.after(button));
          bar.remove();
        } else {
          bar.append(...positions.map(position => position.button));
          screen.prepend(bar);
        }
      });
      root.querySelectorAll('.dcd-screen,.st-screen').forEach(normalizeText);
    }
    updateLayout();
    exhibitionDisplay.addEventListener('change', updateLayout, {signal});
  }
  // Local SVGs avoid missing ligatures in subsetted icon fonts when offline.
  function normalizeIcons(root) {
    const paths = {
      arrow_back: 'M19 12H5m7-7-7 7 7 7',
      expand_more: 'm6 9 6 6 6-6',
      grid_view: 'M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z',
      event: 'M4 5h16v16H4zM8 3v4m8-4v4M4 10h16m-12 4h3v3H8z',
      language: 'M3 12h18M12 3c-6 6-6 12 0 18 6-6 6-12 0-18M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18',
      lightbulb: 'M8 17h8m-7 4h6M8 17c0-3-3-4-3-8a7 7 0 0 1 14 0c0 4-3 5-3 8',
      handshake: 'm3 8 5-4 4 2 4-2 5 4-4 9-3 3-8-5zm5-4-1 6 3 1 3-4 7 7M3 8l-2 6 5 3m15-9 2 6-6 4',
      hub: 'M9 9h6v6H9zM3 3h3v3H3zM18 3h3v3h-3zM3 18h3v3H3zM18 18h3v3h-3zM6 6l3 3m6 6 3 3M6 18l3-3m6-6 3-3'
    };
    root.querySelectorAll('.material-symbols-outlined').forEach(element => {
      const path = paths[element.textContent.trim()];
      if (!path) return;
      element.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="display:block;width:1em;height:1em"><path d="${path}"/></svg>`;
      element.setAttribute('aria-hidden', 'true');
    });
  }
  // Older exhibition templates use viewport units for text. Keep their typeface
  // and emphasis while giving text readable bounds at phone and desktop sizes.
  function normalizeText(root) {
    let originals = originalTypography.get(root);
    if (!originals) { originals = new Map(); originalTypography.set(root, originals); }
    if (exhibitionDisplay.matches) {
      originals.forEach((properties, element) => properties.forEach(({value, priority}, property) => {
        if (value) element.style.setProperty(property, value, priority);
        else element.style.removeProperty(property);
      }));
      return;
    }
    function setStyle(element, property, value) {
      let properties = originals.get(element);
      if (!properties) { properties = new Map(); originals.set(element, properties); }
      if (!properties.has(property)) properties.set(property, {
        value: element.style.getPropertyValue(property), priority: element.style.getPropertyPriority(property)
      });
      element.style.setProperty(property, value, 'important');
    }
    root.querySelectorAll('*').forEach(element => {
      const viewportClass = [...element.classList].some(name => /^!?text-\[[\d.]+vw\]$/.test(name));
      const viewportStyle = element.style.fontSize.includes('vw');
      if (!viewportClass && !viewportStyle && !element.style.lineHeight.includes('vw')) return;
      const tag = element.tagName;
      let size = 'clamp(14px, 1.3vw, 20px)', leading = '1.5';
      if (tag === 'H1') { size = 'clamp(28px, 4vw, 64px)'; leading = '1.25'; }
      else if (tag === 'H2') { size = 'clamp(24px, 2.8vw, 44px)'; leading = '1.3'; }
      else if (tag === 'H3') { size = 'clamp(20px, 2.2vw, 32px)'; leading = '1.4'; }
      else if (tag === 'P') { size = 'clamp(16px, 1.5vw, 22px)'; leading = '1.75'; }
      else if (element.classList.contains('material-symbols-outlined')) size = '24px';
      if (viewportClass || viewportStyle) setStyle(element, 'font-size', size);
      setStyle(element, 'line-height', leading);
    });
    root.querySelectorAll('h1,h2,h3').forEach(element => {
      const height = element.style.lineHeight;
      if (height && Number(height) < 1.2) setStyle(element, 'line-height', '1.25');
    });
  }
  window.ExhibitionComponents.Responsive = {normalizeText, normalizeIcons, mountControls};
})();

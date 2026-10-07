(function () {
  'use strict';
  Exhibition.registerPage('thuvakyvatkhangchien', 'index', {
    render(root, context) {
      root.innerHTML = `<section class="exhibition-placeholder"><p class="museum-eyebrow">BẢO TÀNG THÀNH PHỐ HỒ CHÍ MINH</p><h1>${context.lang === 'vi' ? 'Thư và kỷ vật kháng chiến' : 'Letters and Wartime Memorabilia'}</h1><p>${context.lang === 'vi' ? 'Nội dung chuyên đề đang được chuẩn bị để tích hợp.' : 'Exhibition content is being prepared for integration.'}</p></section>`;
    }
  });
})();

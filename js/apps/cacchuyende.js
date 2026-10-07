(function () {
  'use strict';

  const groups = [
    {
      id: 'current',
      number: '01',
      title: 'Nội dung đang trưng bày',
      titleEn: 'Now on view',
      description: 'Những không gian và câu chuyện đang mở cửa đón khách tham quan.',
      descriptionEn: 'Explore the galleries and stories currently welcoming visitors.',
      exhibitions: [
        {id:'vanhoa', title:'Văn hóa', titleEn:'Culture', detail:'Bản sắc và đời sống văn hóa Sài Gòn – Thành phố Hồ Chí Minh.', detailEn:'The cultural identity and everyday life of Saigon and Ho Chi Minh City.', category:'ĐANG TRƯNG BÀY'},
        {id:'phongkinhte', title:'Phòng Kinh tế', titleEn:'Economy Gallery', detail:'Dấu ấn giao thương, lao động và phát triển của thành phố.', detailEn:'Trade, work and the development of the city.', category:'KHÔNG GIAN TRƯNG BÀY'},
        {id:'phongdialyhanhchinh', title:'Phòng Địa lý - Hành chính', titleEn:'Geography and Administration', detail:'Diện mạo vùng đất và hành trình hình thành đô thị.', detailEn:'The character of the land and the making of the city.', category:'KHÔNG GIAN TRƯNG BÀY'},
        {id:'duongham', title:'Đường hầm', titleEn:'The Tunnel', detail:'Khám phá một không gian trưng bày giàu dấu ấn lịch sử.', detailEn:'Discover a gallery shaped by powerful historical memories.', category:'KHÔNG GIAN TRẢI NGHIỆM'},
        {id:'50nam', page:'dongchaydisan/index', title:'50 năm — Dòng chảy di sản và bản lĩnh đô thị', titleEn:'50 Years — Heritage Flow and Urban Resilience', detail:'Dấu ấn lịch sử, đổi mới và hội nhập qua nửa thế kỷ phát triển.', detailEn:'History, innovation and international integration across half a century.', category:'CHUYÊN ĐỀ'},
        {id:'50nam', page:'sieudothi/index', title:'50 năm — Siêu đô thị', titleEn:'50 Years — Megacity', detail:'Siêu đô thị tích hợp — động lực quốc gia.', detailEn:'Integrated megacity — national dynamics.', category:'CHUYÊN ĐỀ'}
      ]
    },
    {
      id: 'past',
      number: '02',
      title: 'Nội dung đã trưng bày',
      titleEn: 'From our past exhibitions',
      description: 'Cùng nhìn lại những chuyên đề và câu chuyện từng được giới thiệu tại bảo tàng.',
      descriptionEn: 'Revisit exhibitions and stories previously presented at the museum.',
      exhibitions: [
        {id:'lansurong', title:'Lân Sư Rồng', titleEn:'Lion and Dragon Dance', detail:'Nghệ thuật trình diễn dân gian trong nhịp sống đô thị.', detailEn:'A traditional performance art woven into city life.', category:'CHUYÊN ĐỀ ĐÃ GIỚI THIỆU'},
        {id:'SongNuoc', title:'Sông nước', titleEn:'Rivers and Waterways', detail:'Văn hóa sông nước và mối gắn kết với vùng đất phương Nam.', detailEn:'Waterway culture and its enduring ties to the southern land.', category:'CHUYÊN ĐỀ ĐÃ GIỚI THIỆU'},
        {id:'TrangPhucCoTrang', title:'Trang phục cổ trang', titleEn:'Historical Costumes', detail:'Dấu ấn thẩm mỹ và trang phục trong dòng chảy lịch sử.', detailEn:'Clothing and aesthetics through changing eras.', category:'CHUYÊN ĐỀ ĐÃ GIỚI THIỆU'},
        {id:'thuvakyvatkhangchien', title:'Thư và kỷ vật kháng chiến', titleEn:'Wartime Letters and Keepsakes', detail:'Những hiện vật lưu giữ ký ức và câu chuyện của một thời.', detailEn:'Personal objects preserving memories and stories of their time.', category:'CHUYÊN ĐỀ ĐÃ GIỚI THIỆU'},
        {id:'temvebac', title:'Tem về Bác', titleEn:'Stamps about President Ho Chi Minh', detail:'Hình ảnh Chủ tịch Hồ Chí Minh qua những con tem.', detailEn:'Portraits of President Ho Chi Minh through postage stamps.', category:'CHUYÊN ĐỀ ĐÃ GIỚI THIỆU'}
      ]
    }
  ];

  function makeCard(exhibition, index, lang) {
    const card = document.createElement(exhibition.available === false ? 'article' : 'a');
    card.className = 'exhibition-card';
    if (exhibition.available !== false) card.href = ExhibitionRoutes.href(exhibition.id, exhibition.page || 'index');
    else {card.classList.add('exhibition-card--pending');card.setAttribute('aria-disabled','true');}
    card.setAttribute('aria-label', `${lang === 'vi' ? exhibition.title : exhibition.titleEn}. ${exhibition.available === false ? (lang === 'vi' ? 'Sắp ra mắt' : 'Coming soon') : (lang === 'vi' ? 'Mở chuyên đề' : 'Open exhibition')}`);
    card.style.setProperty('--card-delay', `${index * 45}ms`);

    const category = document.createElement('span');
    category.className = 'exhibition-card__category';
    category.textContent = lang === 'vi' ? exhibition.category : (exhibition.available === false ? 'COMING SOON' : 'EXHIBITION');

    const title = document.createElement('h3');
    title.className = 'exhibition-card__title';
    title.textContent = lang === 'vi' ? exhibition.title : exhibition.titleEn;

    const detail = document.createElement('p');
    detail.className = 'exhibition-card__detail';
    detail.textContent = lang === 'vi' ? exhibition.detail : exhibition.detailEn;

    const action = document.createElement('span');
    action.className = 'exhibition-card__action';
    action.setAttribute('aria-hidden', 'true');
    action.textContent = exhibition.available === false ? '…' : '↗';

    card.append(category, title, detail, action);
    if (exhibition.id === 'SongNuoc') {
      const wrapper = document.createElement('article');
      wrapper.className = 'exhibition-card-shell exhibition-card-shell--waterways';
      const modelButton = document.createElement('button');
      modelButton.type = 'button';
      modelButton.className = 'exhibition-model-button';
      modelButton.dataset.openModel = 'true';
      modelButton.setAttribute('aria-haspopup', 'dialog');
      modelButton.textContent = lang === 'vi' ? '◇  Xem mô hình 3D' : '◇  Explore in 3D';
      wrapper.append(card, modelButton);
      return wrapper;
    }
    return card;
  }

  let viewerModule;
  function loadLocalScript(src, signal, receive) {
    return new Promise((resolve, reject) => {
      if (signal?.aborted) {reject(new DOMException('Aborted', 'AbortError'));return;}
      const script = document.createElement('script');
      script.src = new URL(src, document.baseURI).href;
      script.modelChunkReceiver = receive;
      const clean = () => {
        script.remove();
        script.modelChunkReceiver = null;
        signal?.removeEventListener('abort', abort);
      };
      const abort = () => {clean();reject(new DOMException('Aborted', 'AbortError'));};
      script.onload = () => {clean();resolve();};
      script.onerror = () => {clean();reject(new Error('Unable to load local resource'));};
      signal?.addEventListener('abort', abort, {once:true});
      document.head.append(script);
    });
  }

  async function loadFileModel(signal, progress) {
    const directory = './public/models/SongNuoc/kenhrach.local/';
    let manifest;
    await loadLocalScript(`${directory}manifest.js`, signal, data => {manifest = data;});
    if (!manifest || !Number.isInteger(manifest.count) || manifest.count <= 0) throw new Error('Invalid local model manifest');
    const chunks = [];
    let bytes = 0;
    for (let index = 0; index < manifest.count; index++) {
      let received = false;
      await loadLocalScript(`${directory}chunk-${index}.js`, signal, base64 => {
        const binary = atob(base64);
        const chunk = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) chunk[i] = binary.charCodeAt(i);
        chunks.push(chunk);
        bytes += chunk.byteLength;
        received = true;
      });
      if (!received) throw new Error('Missing local model chunk');
      progress(Math.round((index + 1) / manifest.count * 100));
    }
    if (signal.aborted) throw new DOMException('Aborted', 'AbortError');
    if (bytes !== manifest.bytes) throw new Error('Incomplete local model');
    return URL.createObjectURL(new Blob(chunks, {type:'model/gltf-binary'}));
  }

  function attachModelModal(page, context) {
    const vi = context.lang === 'vi';
    let dialog;
    let opener;
    let modelController;
    let modelURL;
    const close = () => {
      if (!dialog) return;
      modelController?.abort();
      if (modelURL) {URL.revokeObjectURL(modelURL);modelURL = null;}
      dialog.close();
      dialog.remove();
      dialog = null;
      if (opener?.isConnected) opener.focus();
    };
    context.signal.addEventListener('abort', close, {once:true});
    page.querySelector('[data-open-model]').addEventListener('click', async event => {
      if (dialog) return;
      opener = event.currentTarget;
      dialog = document.createElement('dialog');
      dialog.className = 'exhibition-model-dialog';
      dialog.lang = vi ? 'vi' : 'en';
      dialog.setAttribute('aria-labelledby', 'waterways-model-title');
      dialog.innerHTML = `<header><div><p>${vi ? 'SÔNG NƯỚC · KHÔNG GIAN 3D' : 'WATERWAYS · 3D EXPERIENCE'}</p><h2 id="waterways-model-title">${vi ? 'Kênh rạch' : 'Canals and waterways'}</h2></div><button type="button" class="exhibition-model-close" aria-label="${vi ? 'Đóng' : 'Close'}">×</button></header><div class="exhibition-model-stage"></div><p class="exhibition-model-status" role="status">${vi ? 'Đang tải mô hình 3D…' : 'Loading the 3D model…'}</p><footer>${vi ? 'Kéo để xoay · Cuộn hoặc chụm tay để phóng to, thu nhỏ' : 'Drag to rotate · Scroll or pinch to zoom'}</footer>`;
      document.body.append(dialog);
      dialog.querySelector('button').addEventListener('click', close);
      dialog.addEventListener('cancel', event => {event.preventDefault();close();});
      dialog.addEventListener('click', event => {
        const rect = dialog?.getBoundingClientRect();
        if (event.target === dialog && rect && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) close();
      });
      dialog.showModal();
      const current = dialog;
      const status = current.querySelector('[role="status"]');
      modelController = new AbortController();
      const modelSignal = modelController.signal;
      try {
        viewerModule ||= (location.protocol === 'file:'
          ? loadLocalScript('./js/libs/model-viewer/model-viewer.classic.js')
          : import(new URL('./js/libs/model-viewer/model-viewer.min.js', document.baseURI).href)
        ).catch(error => {viewerModule = null;throw error;});
        await viewerModule;
        if (context.signal.aborted || dialog !== current) return;
        const viewer = document.createElement('model-viewer');
        viewer.setAttribute('alt', vi ? 'Mô hình 3D kênh rạch Sông nước' : '3D model of canals and waterways');
        viewer.setAttribute('camera-controls', '');
        viewer.setAttribute('interaction-prompt', 'none');
        viewer.setAttribute('shadow-intensity', '0.6');
        viewer.setAttribute('loading', 'eager');
        viewer.addEventListener('load', () => {
          status.hidden = true;
          setupRoomCamera(viewer, current, vi);
        }, {once:true});
        viewer.addEventListener('progress', event => {
          const percent = Math.round(event.detail.totalProgress * 100);
          status.textContent = `${vi ? 'Đang tải mô hình' : 'Loading model'}… ${percent}%`;
        });
        viewer.addEventListener('error', () => {status.hidden = false;status.textContent = vi ? 'Không tải được mô hình. Vui lòng đóng và thử lại.' : 'Unable to load the model. Please close and try again.';});
        if (location.protocol === 'file:') {
          const url = await loadFileModel(modelSignal, percent => {
            status.textContent = `${vi ? 'Đang đọc mô hình local' : 'Reading local model'}… ${percent}%`;
          });
          if (modelSignal.aborted || dialog !== current) {URL.revokeObjectURL(url);return;}
          modelURL = url;
          viewer.src = url;
        } else {
          viewer.src = new URL('./public/models/SongNuoc/kenhrach.glb', document.baseURI).href;
        }
        current.querySelector('.exhibition-model-stage').append(viewer);
      } catch (error) {
        if (dialog === current) status.textContent = vi ? 'Không tải được trình xem 3D. Vui lòng thử lại.' : 'Unable to load the 3D viewer. Please try again.';
      }
    }, {signal:context.signal});
  }

  function setupRoomCamera(viewer, dialog, vi) {
    // A small orbit around each eye position allows looking around from inside
    // the room. Zoom changes the lens rather than moving through the walls.
    const size = viewer.getDimensions();
    const center = viewer.getBoundingBoxCenter();
    const alongX = size.x >= size.z;
    const length = alongX ? size.x : size.z;
    const radius = Math.max(Math.min(size.x, size.y, size.z) * 0.002, 0.001);
    const eyeY = center.y - size.y / 2 + size.y * 0.42;
    let fov = 75;
    const controls = document.createElement('div');
    controls.className = 'exhibition-room-controls';
    controls.setAttribute('role', 'group');
    controls.setAttribute('aria-label', vi ? 'Vị trí xem trong phòng' : 'Room viewpoints');
    controls.innerHTML = `<div class="exhibition-room-positions"><button type="button" data-position="start">${vi ? 'Đầu phòng' : 'Room entrance'}</button><button type="button" data-position="center">${vi ? 'Chính giữa' : 'Room center'}</button><button type="button" data-position="end">${vi ? 'Cuối phòng' : 'Room end'}</button></div><div class="exhibition-room-zoom"><button type="button" data-zoom="out" aria-label="${vi ? 'Thu nhỏ' : 'Zoom out'}">−</button><button type="button" data-zoom="in" aria-label="${vi ? 'Phóng to' : 'Zoom in'}">+</button></div>`;
    dialog.querySelector('footer').before(controls);
    viewer.setAttribute('disable-pan', '');
    viewer.setAttribute('disable-zoom', '');
    viewer.setAttribute('min-camera-orbit', `auto 5deg ${radius}m`);
    viewer.setAttribute('max-camera-orbit', `auto 175deg ${radius}m`);
    viewer.setAttribute('min-field-of-view', '30deg');
    viewer.setAttribute('max-field-of-view', '100deg');
    const setZoom = value => {
      fov = Math.max(30, Math.min(100, value));
      viewer.setAttribute('field-of-view', `${fov}deg`);
    };
    const selectPosition = position => {
      const offset = position === 'start' ? -length * 0.32 : position === 'end' ? length * 0.32 : 0;
      const x = center.x + (alongX ? offset : 0);
      const z = center.z + (alongX ? 0 : offset);
      // Face toward the opposite end at each side of the room.
      const theta = alongX ? (position === 'end' ? 90 : -90) : (position === 'end' ? 0 : 180);
      viewer.setAttribute('camera-target', `${x}m ${eyeY}m ${z}m`);
      viewer.setAttribute('camera-orbit', `${theta}deg 90deg ${radius}m`);
      setZoom(75);
      viewer.jumpCameraToGoal();
      viewer.dataset.roomPosition = position;
      controls.querySelectorAll('[data-position]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.position === position)));
    };
    controls.addEventListener('click', event => {
      const button = event.target.closest('button');
      if (button?.dataset.position) selectPosition(button.dataset.position);
      if (button?.dataset.zoom) setZoom(fov + (button.dataset.zoom === 'in' ? -10 : 10));
    });
    viewer.addEventListener('wheel', event => {
      event.preventDefault();
      setZoom(fov + Math.sign(event.deltaY) * 4);
    }, {passive:false});
    const touches = new Map();
    let lastDistance = 0;
    const distance = () => {
      const [a, b] = [...touches.values()];
      return Math.hypot(a.x - b.x, a.y - b.y);
    };
    viewer.addEventListener('pointerdown', event => {
      if (event.pointerType !== 'touch') return;
      touches.set(event.pointerId, {x:event.clientX, y:event.clientY});
      if (touches.size === 2) lastDistance = distance();
    }, true);
    viewer.addEventListener('pointermove', event => {
      if (!touches.has(event.pointerId)) return;
      touches.set(event.pointerId, {x:event.clientX, y:event.clientY});
      if (touches.size === 2) {
        const next = distance();
        if (next && lastDistance) setZoom(fov * lastDistance / next);
        lastDistance = next;
      }
    }, true);
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(type => viewer.addEventListener(type, event => {
      touches.delete(event.pointerId);
      lastDistance = 0;
    }, true));
    selectPosition('center');
  }

  Exhibition.registerPage('cacchuyendekhac', 'index', {
    render(root, context) {
      const isVietnamese = context.lang === 'vi';
      const lang = isVietnamese ? 'vi' : 'en';
      const page = document.createElement('div');
      page.className = 'exhibition-hub';
      page.lang = lang;
      page.innerHTML = `
        <section class="museum-hero" aria-labelledby="museum-hero-title">
          <div class="museum-hero__copy">
            <p class="museum-eyebrow">${isVietnamese ? 'BẢO TÀNG THÀNH PHỐ HỒ CHÍ MINH' : 'HO CHI MINH CITY MUSEUM'}</p>
            <h1 class="museum-hero__title" id="museum-hero-title">${isVietnamese ? 'Những câu chuyện<br>của thành phố' : 'Stories of<br>our city'}</h1>
            <p class="museum-hero__description">${isVietnamese
              ? 'Khám phá những lát cắt lịch sử, văn hóa và đời sống qua các chuyên đề trưng bày.'
              : 'Explore the history, culture and everyday life of the city through our exhibitions.'}</p>
            <button type="button" class="museum-hero__link">
              ${isVietnamese ? 'Khám phá trưng bày' : 'Explore exhibitions'} <span aria-hidden="true">↓</span>
            </button>
          </div>
          <div class="museum-hero__art" aria-hidden="true">
            <span class="museum-hero__sun"></span>
            <svg class="museum-hero__building" viewBox="0 0 520 370" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M52 321h416M82 321V160h356v161M62 160h396L260 61 62 160Z" fill="#F4EBDD" stroke="#173D3A" stroke-width="7" stroke-linejoin="round"/>
              <path d="M109 193h302M109 245h302M109 294h302" stroke="#C7A773" stroke-width="5"/>
              <path d="M145 193v128m58-128v128m58-128v128m58-128v128m58-128v128" stroke="#173D3A" stroke-width="9"/>
              <path d="M225 321v-61a35 35 0 0 1 70 0v61" fill="#BD765A" stroke="#173D3A" stroke-width="6"/>
              <path d="M44 335h432" stroke="#173D3A" stroke-width="8" stroke-linecap="round"/>
              <circle cx="260" cy="131" r="11" fill="#BD765A"/>
            </svg>
            <span class="museum-hero__caption">${isVietnamese ? 'KÝ ỨC · DI SẢN · CON NGƯỜI' : 'MEMORY · HERITAGE · PEOPLE'}</span>
          </div>
          <span class="museum-hero__index" aria-hidden="true">HCMC · 01</span>
        </section>
        <div class="exhibition-content"></div>
        <footer class="museum-footer">
          <span>${isVietnamese ? 'BẢO TÀNG THÀNH PHỐ HỒ CHÍ MINH' : 'HO CHI MINH CITY MUSEUM'}</span>
          <span>${isVietnamese ? 'Mỗi hiện vật là một cánh cửa mở vào ký ức.' : 'Every artifact opens a door to memory.'}</span>
        </footer>
      `;

      const content = page.querySelector('.exhibition-content');
      groups.forEach((group, groupIndex) => {
        const section = document.createElement('section');
        section.className = `exhibition-group exhibition-group--${group.id}`;
        section.id = `exhibition-${group.id}`;
        section.setAttribute('aria-labelledby', `exhibition-title-${group.id}`);

        const heading = document.createElement('div');
        heading.className = 'exhibition-group__heading';
        const headingCopy = document.createElement('div');
        const eyebrow = document.createElement('p');
        eyebrow.className = 'museum-eyebrow';
        eyebrow.textContent = `${group.number} / ${isVietnamese ? 'BỘ SƯU TẬP' : 'COLLECTION'}`;
        const title = document.createElement('h2');
        title.className = 'exhibition-group__title';
        title.id = `exhibition-title-${group.id}`;
        title.textContent = isVietnamese ? group.title : group.titleEn;
        const description = document.createElement('p');
        description.className = 'exhibition-group__description';
        description.textContent = isVietnamese ? group.description : group.descriptionEn;
        headingCopy.append(eyebrow, title, description);

        const count = document.createElement('span');
        count.className = 'exhibition-group__count';
        count.textContent = String(group.exhibitions.length).padStart(2, '0');
        heading.append(headingCopy, count);

        const grid = document.createElement('div');
        grid.className = 'exhibition-grid';
        group.exhibitions.forEach((exhibition, index) => {
          grid.appendChild(makeCard(exhibition, index + groupIndex * 5, lang));
        });
        section.append(heading, grid);
        content.appendChild(section);
      });
      root.replaceChildren(page);
      page.querySelector('.museum-hero__link').addEventListener('click', () => {
        content.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block:'start'});
      }, {signal:context.signal});
      attachModelModal(page, context);
    }
  });
})();

(function(){
Exhibition.sieudothi=Exhibition.sieudothi||{templates:{},data:{}};


Exhibition.sieudothi.templates.page2 = function (datas) {
    const datasMap = Array.isArray(datas) ? datas.map((item, index) => {
       return item.h2!== undefined ? `<h2 class="text-[3vw] font-bold text-primary text-center w-[90%] mx-auto leading-tight">${item.h2}</h2>` :
            `<figure class="flex flex-col items-center">
                <div class="w-[85%] md:w-[80%] aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-outline-variant/30">
                    <img alt="${index}" class="w-full h-full object-cover" src="${item.img}">
                </div>
                <figcaption class="mt-[1vw] px-[1vw] text-center w-[70%]">
                    <p class="lang lang-vi text-[1.2vw] text-secondary italic">${item.desc1}</p>
                    <p class="lang lang-eng hidden text-[1.2vw] text-secondary italic">${item.desc2}</p>
                </figcaption>
            </figure>`;
    }).join("") : "";

    return `
    <section class="bg2 text-on-surface selection:bg-primary/20 antialiased  overflow-hidden">
        <main class="mx-auto flex flex-col  w-screen">
            <!-- Header Section -->
            <div class="flex items-center justify-center mt-[2vw]" style="width: 100%;">
                <img width="20%" alt="Chronos Precision Logo" class="witdh-logo object-contain white-logo"
                    src="./public/elements/50nam/sieudothi/logo.png">
            </div>
            <header class="text-center max-[90%] mx-auto mt-[4vw] w-[90%]">
                <h1 class="lang lang-vi uppercase text-[4.6vw] font-bold tracking-tight text-primary leading-tight" >
                    Hạ tầng kết nối
                </h1>
                <h1 class="lang lang-eng hidden uppercase text-[3.2vw] font-bold tracking-tight text-primary leading-tight" >
                    Connectivity Infrastructure
                </h1>
                <div class="h-[1vw] w-[38vw] bg-primary-container mx-auto rounded-full mt-[1vw]"></div>
            </header>
            <!-- Content Section -->
            <section class="mx-auto text-content mt-[4vw]" style="width: 90%;">
                <p style=" font-size: 3vw; line-height: 3vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify first-letter first-letter:font-bold first-letter:text-primary first-letter:float-left">
                   Hạ tầng kết nối là huyết mạch chiến lược thúc đẩy sự bứt phá của siêu đô thị và vùng kinh tế trọng điểm phía Nam. Nền tảng nội đô được khơi thông qua các dự án hồi sinh dòng sông, cải tạo kênh Nhiêu Lộc - Thị Nghè, Tàu Hủ và chỉnh trang bến Bạch Đằng. Trục giao thông hướng tâm chuyển mình mạnh mẽ với các Đại lộ Võ Văn Kiệt, Nguyễn Văn Linh, hầm vượt sông Sài Gòn cùng những cây cầu biểu tượng như Ba Son, Phú Mỹ, góp phần giải tỏa tối đa áp lực ùn tắc tại các cửa ngõ đô thị. 
                </p>
                 <p style=" font-size: 3vw; line-height: 3vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                   Tầm nhìn liên kết vùng được nâng lên tầm cao mới nhờ mạng lưới hạ tầng đồng bộ kết nối chặt chẽ giữa các địa phương. Những công trình trọng điểm như đường Vành đai 3, Vành đai 4, tuyến Metro số 1 nối dài cùng các tuyến cao tốc huyết mạch Biên Hòa - Vũng Tàu, Thành phố Hồ Chí Minh - Chơn Thành, Long Thành - Dầu Giây đã tạo ra động lực tăng trưởng khổng lồ. Kết hợp cùng biểu tượng kết nối toàn cầu là Sân bay quốc tế Long Thành, hệ sinh thái giao thương này đưa toàn vùng tự tin bứt phá vị thế trên bản đồ kinh tế quốc tế.
                </p>
                
                 <p style="font-size: 3vw; line-height: 3vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify first-letter first-letter:font-bold first-letter:text-primary first-letter:float-left">
                    Connectivity infrastructure serves as the strategic lifeblood driving the breakthrough of the megacity and the Southern Key Economic Zone. The inner-city foundation has been comprehensively revitalized through riverfront revival projects, the rehabilitation of the Nhieu Loc - Thi Nghe and Tau Hu canals, and the facelift of Bach Dang Wharf Park. Concurrently, radial transport axes have undergone a powerful transformation with vital Avenues like Vo Van Kiet and Nguyen Van Linh, the Saigon River Tunnel, and iconic bridges such as Ba Son and Phu My, significantly relieving traffic congestion at urban gateways.
                </p>
                 <p style="font-size: 3vw; line-height: 3vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                    The vision for regional connectivity has been elevated to new heights thanks to a synchronized infrastructure network linking localities seamlessly. Key projects, including Ring Road 3, Ring Road 4, the extended Metro Line 1, and vital expressways such as Bien Hoa - Vung Tau, Ho Chi Minh City - Chon Thanh, and Long Thanh - Dau Giay, have generated immense growth momentum. Combined with Long Thanh International Airport - the region's symbol of global connectivity - this trade ecosystem empowers the entire region to confidently advance its standing on the global economic map.
                </p>
             
            </section>
           <!-- Visual Storytelling Carousel -->
           <section class="space-y-12 mt-[4vw] mb-[10vw]">
                ${datasMap}
           </section>
        </main>

       <!-- Back -->
        <div style="animation: jumpBack 2s infinite ease-in-out;"
        class="fixed bottom-0 left-0 w-full py-[4vw] pointer-events-none" onclick="window.history.go(-1)">

            <div class="absolute left-[1.5vw] top-1/2 -translate-y-1/2 pointer-events-auto">
            <button
                class="flex items-center gap-[0.6vw] px-[2.4vw] py-[1.2vw] rounded-full border border-gold/20 bg-deep-red/40 backdrop-blur-md text-gold hover:bg-gold/10 transition-all group">
                <span class="material-symbols-outlined text-[2.4vw]">
                    arrow_back
                </span>
                <span class="lang lang-vi font-label font-bold text-[1.8vw] uppercase tracking-wider">
                    Quay lại
                </span>
                <span class="lang lang-eng hidden font-label font-bold text-[1.8vw] uppercase tracking-wider">
                   Back
                </span>
            </button>
            </div>
        </div>
        <!-- Changelang -->
        <div class="fixed bottom-[2vw] right-[2vw]" w-full>
        <button onclick="changeLang()"
            class="bg-deep-red\/40 px-[2.4vw] py-[1.2vw] rounded-full flex items-center space-x-[1.66vw] active-scale border border-white/20"><span
                class="material-symbols-outlined !text-[2.4vw] text-gold/80">language</span><span
                class="font-label font-bold  text-[1.8vw] text-gold/80 uppercase tracking-wider">VN | EN</span></button>
        </div>
    </section>
    `;
};
Exhibition.registerPage('50nam','sieudothi/page2',Exhibition.sieudothi.page('page2'));
})();

(function(){
Exhibition.dongchaydisan = Exhibition.dongchaydisan || {templates:{},data:{}};


Exhibition.dongchaydisan.templates.page2 = function (datas) {
    const carouselItems = Array.isArray(datas) ? datas.map((item, index) => `
        <div
            class="carousel-slide flex-none w-[85%] snap-center"
            data-index="${index}"
        >
            <figure class="flex flex-col items-center">
                <div
                    class="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg border border-outline-variant/30"
                >
                    <img
                        src="${item.img}"
                        alt="slide-${index}"
                        class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                </div>

                <figcaption class="mt-4 px-4 text-center">
                    <p class="lang lang-vi text-[1.4vw] font-medium text-secondary italic">
                        ${item.desc1}
                    </p>
                     <p class="lang lang-eng hidden text-[1.4vw] font-medium text-secondary italic">
                        ${item.desc2}
                    </p>
                </figcaption>
            </figure>
        </div>
    `).join("") : "";

    const Indicators = Array.isArray(datas) ? datas.map((_, index) => `
        <button
            type="button"
            class="indicator-dot ${index === 0
            ? "h-[1.6vw] w-[6vw] bg-primary/40"
            : "h-[1.6vw] w-[1.6vw] bg-outline-variant"
        } rounded-full transition-all duration-300"
            data-index="${index}"
        ></button>
    `).join("") : "";

    return `
    <section class="bg2 text-on-surface selection:bg-primary/20 antialiased h-screen overflow-hidden">
      <div class="fixed inset-0 overlay pointer-events-none"></div>
        <main class="mx-auto flex flex-col h-screen w-screen">
            <!-- Header Section -->
            <div class="flex items-center justify-center mt-[2vw]" style="width: 100%;">
                <img width="20%" alt="Chronos Precision Logo" class="witdh-logo object-contain white-logo"
                    src="./public/elements/50nam/dongchaydisan/logo.png">
            </div>
            <header class="text-center max-[90%] mx-auto mt-[4vw] w-[90%]">
                <h1 class="lang lang-vi uppercase text-[4.6vw] font-bold tracking-tight text-primary leading-tight" >
                    Đột phá tư duy – khởi nguồn đổi mới
                </h1>
                <h1 class="lang lang-eng hidden uppercase text-[3.2vw] font-bold tracking-tight text-primary leading-tight" >
                    Breakthrough thinking – The root of renovation
                </h1>
                <div class="h-[1vw] w-[38vw] bg-primary-container mx-auto rounded-full mt-[1vw]"></div>
            </header>
            <!-- Content Section -->
            <section class="mx-auto text-content mt-[4vw]" style="width: 90%;">
                <p style=" font-size: 3vw; line-height: 3vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify first-letter:font-bold first-letter:text-primary first-letter:float-left">
                    Những bước ngoặt đột phá tư duy hay còn được gọi là "Xé rào" tại Thành phố Hồ Chí Minh giai đoạn
                    cuối
                    thập niên 70, đầu thập niên 80 là những quyết sách dũng cảm, đi trước thời đại nhằm phá vỡ sự kìm
                    hãm
                    của cơ chế bao cấp lỗi thời. </p>
                 <p style=" font-size: 3vw; line-height: 3vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                   Bắt đầu từ những hành động thực tiễn như: "Xé rào" trong lương thực để
                    cứu
                    đói cho nhân dân; "Xé rào" trong công nghiệp để khơi thông sản xuất tại các nhà máy; và "Xé rào" về
                    tài
                    chính để huy động vốn trong dân. Những quyết sách mang tính lịch sử này không chỉ giải quyết các yêu
                    cầu
                    cấp bách về dân sinh mà còn là cơ sở thực tiễn quan trọng, cung cấp cơ sở lý luận thực tế để Trung
                    ương
                    hoạch định đường lối Đổi mới toàn diện năm 1986.
                </p>
                 <p style=" font-size: 3vw; line-height: 3vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                    Tinh thần "Xé rào" chính là biểu tượng cho bản lĩnh
                    của
                    lãnh đạo và nhân dân Thành phố: Dám nghĩ, dám làm, dám chịu trách nhiệm vì lợi ích quốc gia và hạnh
                    phúc
                    của nhân dân.
                </p>
                 <p style="font-size: 3vw; line-height: 3vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify first-letter:font-bold first-letter:text-primary first-letter:float-left">
                    Breakthrough turning points in thinking, also known as “Breaking the Barrier” in Ho Chi Minh City during the late 1970s and early 1980s, were courageous, forward-looking decisions aimed at breaking the constraints of the outdated subsidy mechanism.
                </p>
                 <p style="font-size: 3vw; line-height: 3vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                    It began with practical actions such as: “Breaking the Barrier” in food to prevent hunger of the people; “Breaking the Barrier” in industry to stimulate production in factories; and “Breaking the Barrier” in finance to mobilize capital from the public. These historic decisions not only addressed urgent livelihood needs but also served as an important practical basis, providing a real-world theoretical foundation for the Central Government to plan the comprehensive Innovation policy in 1986.
                </p>
                 <p style="font-size: 3vw; line-height: 3vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                    The “Breaking the Barrier” spirit symbolizes the courage of the leadership and the people of the City: daring to think, daring to act, and daring to take responsibility for the national interest and the happiness of the people.
                </p>
            </section>
            <!-- Visual Storytelling Carousel -->
          
            <section class="relative group overflow-hidden my-auto">
                <div class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth hide-scrollbar gap-[2vw]"
                    id="carousel">
                ${carouselItems}
                </div>
                <!-- Carousel Indicators -->
                <div class="flex justify-center gap-[1vw] mt-[3vw]" id="carouselIndicators">
                ${Indicators}
                </div>
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
Exhibition.registerPage('50nam','dongchaydisan/page2',Exhibition.dongchaydisan.page('page2'));
})();

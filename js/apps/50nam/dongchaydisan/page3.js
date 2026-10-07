(function(){
Exhibition.dongchaydisan = Exhibition.dongchaydisan || {templates:{},data:{}};


Exhibition.dongchaydisan.templates.page3 = function (datas) {
    const carouselItems = Array.isArray(datas) ? datas.map((item, index) => `
        <div
            class="carousel-slide flex-none w-[85%] snap-center"
            data-index="${index}"
        >
            <figure class="flex flex-col items-center">
              <h3 class="text-[2vw] my-[1vw] font-bold font-headline text-primary text-center">
    ${item.title || ""}
</h3>
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
    <section class="bg3 text-on-surface selection:bg-primary/20 antialiased h-screen overflow-hidden">
      <div class="fixed inset-0 overlay pointer-events-none"></div>
        <main class="mx-auto flex flex-col h-screen w-screen">
            <!-- Header Section -->
            <div class="flex items-center justify-center mt-[2vw]" style="width: 100%;">
                <img width="20%" alt="Chronos Precision Logo" class="witdh-logo object-contain white-logo"
                    src="./public/elements/50nam/dongchaydisan/logo.png">
            </div>
            <header class="text-center max-[90%] mx-auto mt-[4vw] w-[90%]">
                <h1 class="lang lang-vi uppercase text-[4.6vw] font-bold tracking-tight text-primary leading-tight" >
                    Mở rộng đối ngoại – thu hút đầu tư
                </h1>
                <h1 class="lang lang-eng hidden uppercase text-[3.2vw] font-bold tracking-tight text-primary leading-tight" >
                    Expanding foreign relations – attracting investment
                </h1>
                <div class="h-[1vw] w-[38vw] bg-primary-container mx-auto rounded-full mt-[1vw]"></div>
            </header>
            <!-- Content Section -->
            <section class="mx-auto text-content mt-[4vw]" style="width: 90%;">
                <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify first-letter:font-bold first-letter:text-primary first-letter:float-left">
                    Thấm nhuần đường lối đối ngoại “Độc lập, tự chủ, đa phương hóa, đa dạng hóa” từ Đại hội VI, và các kỳ Đại hội Đảng tiếp theo, Thành phố Hồ Chí Minh đã trải qua nửa thế kỷ chuyển mình mạnh mẽ. Với tinh thần "sẵn sàng là bạn, là đối tác tin cậy", Thành phố đã thiết lập quan hệ hữu nghị với hơn 50 địa phương quốc tế và duy trì giao thương với hơn 200 quốc gia, vùng lãnh thổ, khẳng định vai trò cửa ngõ hạt nhân của Việt Nam ra thế giới.
                </p>
                 <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                   Trong giai đoạn mới, vị thế đối ngoại của Thành phố gắn liền với chiến lược hình thành Siêu đô thị và vùng kinh tế trọng điểm phía Nam. Sự liên kết chặt chẽ giữa Thành phố Hồ Chí Minh – “trung tâm dịch vụ, tài chính” với Bình Dương – “thủ phủ công nghiệp thông minh” và Bà Rịa-Vũng Tàu – “cửa ngõ logistics, cảng biển quốc tế” đã tạo nên một hệ sinh thái thu hút đầu tư có sức cạnh tranh toàn cầu. Tính riêng Thành phố Hồ Chí Minh, dòng vốn FDI đạt gần 60 tỷ USD với hơn 13.000 dự án, nhưng khi đặt trong chỉnh thể liên vùng, đây là một cực tăng trưởng khổng lồ, chuyển dịch mạnh mẽ từ thâm dụng lao động sang kinh tế số,  chip bán dẫn và năng lượng xanh. 
                </p>
                 <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                    Vinh dự đón tiếp các nguyên thủ và tập đoàn đa quốc gia hàng đầu, Thành phố không chỉ trình diễn sức hút của một đô thị năng động mà còn là minh chứng cho sự cộng hưởng nguồn lực liên vùng. Sau 50 năm, hành trình đối ngoại đã nâng tầm Thành phố Hồ Chí Minh cùng các tỉnh lân cận thành một siêu đô thị văn minh, hiện đại, đóng vai trò đầu tàu dẫn dắt nền kinh tế Việt Nam vươn tầm vị thế mới trên bản đồ thế giới.
                </p>
                 <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify first-letter:font-bold first-letter:text-primary first-letter:float-left">
                   Deeply imbued with the foreign policy of "independence, autonomy, multilateralization, and diversification" initiated since the VIth National Party Congress and sustained through subsequent Congresses, Ho Chi Minh City has undergone a powerful transformation over the past half-century. Embracing the spirit of "being ready to be a friend and a reliable partner," the City has established friendly relations with over 50 international localities and maintained trade relations with more than 200 countries and territories, affirming its role as Vietnam's core gateway to the world.
                </p>
                 <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
               In the new era, the City’s diplomatic standing is closely linked with the strategic formation of the Megacity and the Southern Key Economic Zone. The tight integration between Ho Chi Minh City - the "Service and financial hub," Binh Duong - the "Smart industrial capital," and Ba Ria-Vung Tau - the "Logistics and international seaport gateway," has forged a highly competitive global ecosystem for investment attraction. In Ho Chi Minh City alone, Foreign Direct Investment (FDI) has reached nearly 60 billion USD across more than 13,000 projects; yet when viewed within the inter-regional entity, it stands as a massive growth pole, shifting decisively from labor-intensive sectors to the digital economy, semiconductors, and green energy.
                </p>
                <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                    Having had the honor of welcoming state leaders and top multinational corporations, the City not only showcases the dynamism of a vibrant metropolis but also stands as a testament to the synergy of inter-regional resources. After 50 years, this diplomatic journey has elevated Ho Chi Minh City and its neighboring provinces into a civilized, modern megacity, acting as the economic locomotive that drives Vietnam to a new standing on the global stage.
                </p>

               

            </section>
            <!-- Visual Storytelling Carousel -->
          
            <section class="relative group overflow-hidden ">
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
    </section>`;
};
Exhibition.registerPage('50nam','dongchaydisan/page3',Exhibition.dongchaydisan.page('page3'));
})();

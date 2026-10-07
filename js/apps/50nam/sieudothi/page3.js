(function(){
Exhibition.sieudothi=Exhibition.sieudothi||{templates:{},data:{}};


Exhibition.sieudothi.templates.page3 = function (datas) {
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
    <section class="bg3 text-on-surface selection:bg-primary/20 antialiased  overflow-hidden">
        <main class="mx-auto flex flex-col  w-screen">
            <!-- Header Section -->
            <div class="flex items-center justify-center mt-[2vw]" style="width: 100%;">
                <img width="20%" alt="Chronos Precision Logo" class="witdh-logo object-contain white-logo"
                    src="./public/elements/50nam/sieudothi/logo.png">
            </div>
            <header class="text-center max-[90%] mx-auto mt-[4vw] w-[90%]">
                <h1 class="lang lang-vi uppercase text-[4.2vw] font-bold tracking-tight text-primary leading-tight" >
                    Thành phố Hồ Chí Minh – Một điểm đến
                </h1>
                <h1 class="lang lang-eng hidden uppercase text-[3.2vw] font-bold tracking-tight text-primary leading-tight" >
                    Ho Chi Minh City – A Destination
                </h1>
                <div class="h-[1vw] w-[38vw] bg-primary-container mx-auto rounded-full mt-[1vw]"></div>
            </header>
            <!-- Content Section -->
            <section class="mx-auto text-content mt-[4vw]" style="width: 90%;">
                <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify first-letter first-letter:font-bold first-letter:text-primary first-letter:float-left">
                    Trong hành trình 50 năm tự hào mang tên Bác, Thành phố Hồ Chí Minh cùng các địa phương liên kết đã chuyển mình mạnh mẽ thành một "Siêu đô thị" đa cực - hình mẫu của không gian sống nhân văn, hiện đại và đáng sống.
                </p>
                 <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                    <strong>• Văn hóa - Xã hội:</strong> Là nơi kết tinh di sản phương Nam hòa quyện cùng tinh thần đổi mới. Các lễ hội di sản và nghệ thuật số không chỉ làm phong phú đời sống tinh thần mà còn gắn kết cộng đồng nghĩa tình, bao dung.
                </p>
                 <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                    <strong>• Y tế:</strong> Hệ thống y tế thông minh được nâng tầm quốc tế với các bệnh viện chuyên sâu, hiện đại và mạng lưới hội chẩn từ xa cùng hệ thống y tế cơ sở vững chắc đảm bảo người dân tiếp cận dịch vụ chăm sóc sức khỏe chất lượng cao nhất.
                </p>
                  <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                    <strong>• Giáo dục:</strong> Kiến tạo nền giáo dục toàn cầu, tiên phong mô hình trường học thông minh và phát triển kỹ năng cho thế hệ "Công dân số". Hệ thống đại học đa ngành cùng các trung tâm đổi mới sáng tạo không chỉ truyền thụ tri thức mà còn thúc đẩy hội nhập, giúp thế hệ trẻ tự tin tham gia thị trường lao động toàn cầu.
                </p>
                <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                    <strong>• An sinh Xã hội – Đền ơn đáp nghĩa:</strong> Thành phố xây dựng mạng lưới an sinh bền vững, "không để ai bị bỏ lại phía sau" qua các chương trình nhà ở xã hội, giảm nghèo đa chiều. Đặc biệt, truyền thống "Uống nước nhớ nguồn" được tri ân sâu sắc bằng việc chăm lo chu đáo, phụng dưỡng suốt đời các Mẹ Việt Nam Anh hùng và người có công.
                </p>
                <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                    <strong>• Tiện ích công cộng:</strong> Mạng lưới giao thông cùng các công viên sinh thái, thư viện số, thành phố thành một trung tâm trải nghiệm lý tưởng.
                </p>
                <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-vi text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                    Tất cả cùng cộng hưởng, định hình một siêu đô thị phát triển toàn diện, lấy hạnh phúc của nhân dân làm thước đo giá trị.
                </p>

                 <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify first-letter first-letter:font-bold first-letter:text-primary first-letter:float-left">
                   During its 50-year proud journey bearing the name of Uncle Ho, Ho Chi Minh City, along with its interconnected regions, has dynamically transformed into a multi-polar "Megacity" - a prime model of a humane, modern, and liveable environment.
                </p>
                 <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                   <strong>• Culture - Society:</strong> A brilliant crystallization of Southern heritage blended with an innovative spirit. Heritage festivals and digital arts not only enrich spiritual life but also foster a compassionate and inclusive community.
                </p>
                <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                   <strong>• Healthcare:</strong> A smart healthcare system elevated to international standards, featuring modern, specialized hospitals, a telehealth network, and a robust grassroots healthcare system to ensure citizens have access to the highest quality healthcare services.
                </p>
                <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                   <strong>• Education:</strong> Shaping a globalized education ecosystem, pioneering smart school models, and developing skills for a new generation of "Digital citizens." A multidisciplinary university network alongside innovation centers not only imparts knowledge but also drives integration, empowering the youth to confidently enter the global labor market.
                </p>
                <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                   <strong>• Social Welfare - Gratitude:</strong> The city builds a sustainable social safety net that "leaves no one behind" through social housing and multidimensional poverty reduction programs. Notably, the tradition of "When drinking water, remember its source" is profoundly honored through meticulous care and lifelong support for Heroic Vietnamese Mothers and those who contributed to the revolution.
                </p>
                <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                   <strong>• Public Amenities:</strong> A transit network, along with eco-parks and digital libraries, transforming the City into an ideal experiential center.
                </p>
                <p style="font-size: 2.6vw; line-height: 2.6vw;"
                    class="lang lang-eng hidden text-body-md md:text-lg text-on-surface-variant leading-relaxed text-justify">
                   All elements resonate perfectly to shape a comprehensively developed megacity, where the happiness of its people is the ultimate measure of value.
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
    </section>`;
};
Exhibition.registerPage('50nam','sieudothi/page3',Exhibition.sieudothi.page('page3'));
})();

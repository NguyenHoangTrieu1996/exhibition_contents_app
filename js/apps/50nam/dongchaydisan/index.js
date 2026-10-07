(function(){
Exhibition.dongchaydisan = Exhibition.dongchaydisan || {templates:{},data:{}};


Exhibition.dongchaydisan.templates.index = function () {
    return `
      <section class="antialiased">
        <!-- Full Screen Background Image -->
        <div class="fixed inset-0 z-0">
            <img alt="50th Anniversary Background" class="w-full h-full object-cover" src="./public/images/50nam/dongchaythoigian/background.png">
            <div class="absolute inset-0 hero-gradient"></div>
        </div>
        <!-- Main Canvas Content -->
        <main
            class="relative z-10 flex flex-col min-h-screen px-container_padding pt-[clamp(1rem,3.33vw,4rem)] pb-[clamp(2rem,5vw,6rem)] text-white screen-container">
            <!-- Top Section: Brand Identity -->
          

            <header class="flex flex-col items-center space-y-6 mb-[clamp(2rem,3vw,4rem)]">
                <div class="fixed bottom-[2vw] right-[2vw]">
                    <button onclick="changeLang()"
                        class="bg-deep-red\/40 px-[3.33vw] py-[1.66vw] rounded-full flex items-center space-x-[1.66vw] active-scale border border-white/20"><span
                        class="material-symbols-outlined !text-[4.44vw] text-gold/80">language</span><span
                        class="font-label-caps text-[3.05vw] text-white/90 uppercase tracking-wider">VN | EN</span></button>
                 </div>

                <div class="flex items-center justify-center">
                    <img style="filter: brightness(0) invert(1);" width="30%" alt="BaoTangThanhPhoHoChiMinh"
                        class="witdh-logo object-contain white-logo"
                        src="./public/elements/50nam/dongchaydisan/logo.png">
                </div>
            </header>
            <!-- Middle Section: Content & Vision -->
            <section class="flex-grow-[0.9] flex flex-col justify-center space-y-10">
                <div class="space-y-4">
                    <h2
                        class="lang lang-vi font-headline-md text-[3.8vw] leading-[1.1] font-black drop-shadow-xl uppercase tracking-tight gold-text-gradient">
                        DÒNG CHẢY DI SẢN &amp; BẢN LĨNH ĐÔ THỊ
                    </h2>
                    <h2
                        class="lang lang-eng hidden font-headline-md text-[3.8vw] leading-[1.1] font-black drop-shadow-xl uppercase tracking-tight gold-text-gradient">
                        HERITAGE FLOW &amp; URBAN SKILL AND SPIRIT
                    </h2>
                    <div class="w-[clamp(3rem,4.167vw,5rem)] h-[clamp(4px,0.313vw,6px)] bg-gold/80 rounded-full"></div>
                </div>
                <div class="glass-effect p-[2vw] rounded-2xl space-y-6 shadow-xl border-l-gold/30" style="border-radius:2vw;">
                    <p class="lang lang-vi font-body-md text-white/90 leading-relaxed text-[2vw]">
                        Khẳng định hành trình 50 năm qua chính là bước đệm lịch sử đầy tự hào, đúc kết nên một "hệ giá
                        trị
                        chung" về sự năng động và tinh thần dám nghĩ, dám làm. Đó là nền tảng vững chắc gắn kết ba vùng
                        đất
                        trước khi hội tụ, cùng nhau kiến tạo một chương mới dưới một mái nhà chung.
                    </p>
                    <p class="lang lang-eng hidden font-body-md text-white/90 leading-relaxed text-[2vw]">
                        That the 50-year journey has been a proud historical stepping stone, and has produced a 'common set of values' about dynamism and the spirit of daring to think and daring to act. This is a firm foundation that connects these three regions before their converging to create a new chapter together under one common roof.
                    </p>
                    <div class="pt-[1vw] border-t border-white/10" style="margin-top:3vw;">
                        <p class="lang lang-vi font-label-caps text-gold/80 uppercase tracking-widest text-[1.8vw]">
                            Nội dung trưng bày ở 3 điểm nhấn:
                        </p>
                        <p class="lang lang-eng hidden font-label-caps text-gold/80 uppercase tracking-widest text-[1.8vw]">
                            The exhibition content highlights three key points:
                        </p>
                    </div>
                </div>
            </section>
            <!-- Bottom Section: Call to Actions -->
            <footer class="mt-[4vw] space-y-4">
                <!-- Primary Action -->



                <a href="#/page1" class="block w-full">
                    <button
                        class="w-full h-[clamp(32px,6vw,96px)] primary-button-gradient text-white font-headline-sm rounded-xl active-scale flex items-center justify-center space-x-3 transition-all border border-gold/80 shadow-xl">
                        <span class="material-symbols-outlined text-[2.2vw]"
                            style="font-variation-settings: &quot;FILL&quot; 1;">event</span>
                        <span class="lang lang-vi uppercase text-[2.2vw] tracking-wide">Giao điểm lịch sử (1976 - nay)</span>
                        <span class="lang lang-eng hidden uppercase text-[2.2vw] tracking-wide">The historical intersection (1976 - present)</span>
                    </button></a>
                <!-- Secondary Action -->
                <a href="#/page2" class="block w-full">
                    <button
                        class="w-full h-[clamp(32px,6vw,96px)] glass-effect bg-primary/20 text-white/95 font-headline-sm rounded-xl active-scale flex items-center justify-center space-x-3 transition-all hover:bg-white/10 border border-white/10">
                        <span class="material-symbols-outlined text-[2.2vw]">lightbulb</span>
                        <span class="lang lang-vi uppercase text-[2.2vw] tracking-wide">Đột phá tư duy - khởi nguồn đổi mới</span>
                        <span class="lang lang-eng hidden uppercase text-[2.2vw] tracking-wide">Breakthrough thinking – The root of renovation</span>
                    </button></a>
                <!-- Tertiary Action -->
                <a href="#/page3" class="block w-full">
                    <button
                        class="w-full h-[clamp(32px,6vw,96px)] glass-effect bg-black/20 border border-gold/30 text-white/80 font-headline-sm rounded-xl active-scale flex items-center justify-center space-x-3 transition-all hover:bg-white/5">
                        <span class="material-symbols-outlined text-[2.2vw]">handshake</span>
                        <span class="lang lang-vi uppercase text-[2.2vw] tracking-wide">Mở rộng đối ngoại - thu hút đầu tư</span>
                        <span class="lang lang-eng hidden uppercase text-[2.2vw] tracking-wide">Expanding foreign relations – attracting investment</span>
                    </button></a>
            </footer>
        </main>
       
    </section>
    `;
};
Exhibition.registerPage('50nam','dongchaydisan/index',Exhibition.dongchaydisan.page('index'));
Exhibition.registerPage('50nam','index',Exhibition.dongchaydisan.page('index'));
})();

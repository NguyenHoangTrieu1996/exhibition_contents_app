(function(){
Exhibition.dongchaydisan = Exhibition.dongchaydisan || {templates:{},data:{}};


Exhibition.dongchaydisan.templates.page1 = function () {
    return `
      <section class="bg-page1 min-h-screen antialiased selection:bg-gold selection:text-deep-red">
        <div class="fixed inset-0 overlay pointer-events-none"></div>
        <!-- Brand Logo Anchor -->
        <div class="flex items-center justify-center" style="width: 100%; padding: 2vw;">
            <img style="filter: brightness(0) invert(1);" width="20%" alt="Chronos Precision Logo"
                class="witdh-logo object-contain white-logo"
                src="./public/elements/50nam/dongchaydisan/logo.png">
        </div>

        <!-- Main Content Canvas -->
        <main class="max-w-[90%] mx-auto px-6 pt-[3vw] pb-[16vw]">
            <!-- Hero Section -->
            <header class="text-center mb-[5vw] transition-all duration-1000 ease-out opacity-100 translate-y-0"
                id="hero-title">
                <h1
                    class="lang lang-vi uppercase font-headline text-[7vw] font-bold text-gold-light mb-[2vw] gold-glow tracking-tight" style="line-height:0.8;">
                    Giao điểm lịch sử<br>
                    <span class="text-[4vw]  font-light text-gold/80">(1976 — nay)</span>
                </h1>
                  <h1
                    class="lang lang-eng hidden uppercase font-headline text-[7vw] font-bold text-gold-light mb-[2vw] gold-glow tracking-tight" style="line-height:0.8;">
                    The historical intersection<br>
                    <span class="text-[4vw]  font-light text-gold/80">(1976 — nay)</span>
                </h1>
                <div class="w-[10vw] h-[0.8vw] bg-gold mx-auto rounded-full"></div>
            </header>
            <!-- Timeline Container -->
            <div class="relative">
                <!-- Continuous Vertical Line -->
                <div class="absolute left-4 md:left-1/2 top-0 bottom-0 timeline-line -translate-x-1/2"></div>
                <!-- Section 1: Tái thiết & Định hình -->
                <section class="mb-[10vw] relative">
                    <div class="flex items-center mb-[5vw] md:justify-center">
                        <div
                            class="lang lang-vi bg-gold text-deep-red font-label font-black text-[1.8vw] uppercase px-[2vw] py-[1vw] rounded-full z-10 shadow-lg">
                            Giai đoạn Tái thiết &amp; Định hình (1975 - 1985)
                        </div>
                        <div
                            class="lang lang-eng hidden bg-gold text-deep-red font-label font-black text-[1.8vw] uppercase px-[2vw] py-[1vw] rounded-full z-10 shadow-lg">
                            The period of reconstruction & foundation (1976 - 1985)
                        </div>
                    </div>
                    <!-- 1976 -->
                    <div class="relative flex flex-col md:flex-row items-center mb-16 group">
                        <div class="hidden md:block w-1/2 pr-12 text-right">
                            <div class="text-gold-light font-headline text-4xl font-bold mb-2">1976</div>
                        </div>
                        <div
                            class="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 dot-node z-20">
                        </div>
                        <div class="w-full md:w-1/2 pl-12">
                            <div
                                class="glass-card p-[1.6vw] rounded-xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                                <div class="md:hidden text-gold-light font-headline text-3xl font-bold mb-2">1976</div>
                                <h3 class="lang lang-vi font-headline text-[2.6vw] text-white font-bold mb-2 italic">Thành phố mang tên
                                    Bác
                                </h3>
                                <h3 class="lang lang-eng hidden font-headline text-[2.6vw] text-white font-bold mb-2 italic">Sai Gon - Gia Dinh City was officially renamed Ho Chi Minh City.
                                </h3>
                                <p class="lang lang-vi font-body text-surface-dim leading-relaxed text-[2vw] text-justify" style="line-height:1.2; margin-bottom:1vw;">Sài Gòn - Gia Định chính
                                    thức
                                    được
                                    đổi tên thành Thành phố Hồ Chí Minh, đánh dấu chương mới trong sự nghiệp kiến thiết
                                    đô
                                    thị.</p>
                            </div>
                        </div>
                    </div>
                    <!-- 1981 -->
                    <div class="relative flex flex-col md:flex-row items-center mb-16 group">
                        <div class="w-full md:w-1/2 pr-12 order-2 md:order-1 text-left md:text-right">
                            <div
                                class="glass-card p-[1.6vw] rounded-xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                                <div class="md:hidden text-gold-light font-headline text-3xl font-bold mb-2">1981</div>
                                <h3 class="lang lang-vi font-headline text-[2.6vw] text-white font-bold mb-2 italic">Vietsovpetro &amp;
                                    Biển
                                    Đông</h3>
                                    <h3 class="lang lang-eng hidden font-headline text-[2.6vw] text-white font-bold mb-2 italic">The establishment of the Vietsovpetro Joint Venture in Vung Tau laid the foundation for Vietnam’s oil and gas industry
                                    </h3>
                                <p class="lang lang-vi font-body text-surface-dim leading-relaxed text-[2vw] text-justify" style="line-height:1.2; margin-bottom:1vw;">Vietsovpetro được thành
                                    lập
                                    tại
                                    Vũng Tàu, đặt nền móng cho ngành công nghiệp dầu khí trọng điểm quốc gia.</p>
                            </div>
                        </div>
                        <div
                            class="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 dot-node z-20">
                        </div>
                        <div class="hidden md:block w-1/2 pl-12 order-2">
                            <div class="text-gold-light font-headline text-4xl font-bold mb-2">1981</div>
                        </div>
                    </div>
                    <!-- Bình Dương -->
                    <div class="relative flex flex-col md:flex-row items-center group">
                        <div class="hidden md:block w-1/2 pr-12 text-right">
                            <div class="text-gold-light font-headline text-4xl font-bold mb-2">1976-1985</div>
                        </div>
                        <div
                            class="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 dot-node z-20">
                        </div>
                        <div class="w-full md:w-1/2 pl-12">
                            <div
                                class="glass-card p-[1.6vw] rounded-xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                                <div class="md:hidden text-gold-light font-headline text-3xl font-bold mb-2">1976-1985</div>
                                <h3 class="lang lang-vi font-headline text-[2.6vw] text-white font-bold mb-2 italic">Phục hồi Nông nghiệp
                                    Bình
                                    Dương (Sông Bé cũ)
                                </h3>
                                <h3 class="lang lang-eng hidden font-headline text-[2.6vw] text-white font-bold mb-2 italic">•	Binh Duong (formerly Song Be): Focused on agricultural recovery and the revitalization of traditional craft villages (ceramics, lacquerware)
                                </h3>
                                <p class="lang lang-vi font-body text-surface-dim leading-relaxed text-[2vw] text-justify" style="line-height:1.2; margin-bottom:1vw;">Tập trung phục hồi nông
                                    nghiệp
                                    và các làng nghề truyền thống (gốm sứ, sơn mài)</p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Section 2: Đổi mới & Mở cửa -->
                <section class="mb-[10vw] relative">
                    <div class="flex items-center mb-[5vw] md:justify-center">
                        <div
                            class="lang lang-vi bg-gold text-deep-red font-label font-black text-[1.8vw] uppercase px-[2vw] py-[1vw] rounded-full z-10 shadow-lg">
                            Giai đoạn Đổi mới &amp; Mở cửa (1986 - 2000)
                        </div>
                         <div
                            class="lang lang-eng hidden bg-gold text-deep-red font-label font-black text-[1.8vw] uppercase px-[2vw] py-[1vw] rounded-full z-10 shadow-lg">
                            The period of renovation & opening up (1986 - 2000)
                        </div>
                    </div>

                    <div class="relative flex flex-col md:flex-row items-center mb-16 group">
                        <div class="w-full md:w-1/2 pr-12 order-2 md:order-1 text-left md:text-right">
                            <div
                                class="glass-card p-[1.6vw] rounded-xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                                <div class="md:hidden text-gold-light font-headline text-3xl font-bold mb-2">1991</div>
                                <h3 class="lang lang-vi font-headline text-[2.6vw] text-white font-bold mb-2 italic">Thành lập tỉnh Bà Rịa
                                    -
                                    Vũng Tàu
                                </h3>
                                <h3 class="lang lang-eng hidden font-headline text-[2.6vw] text-white font-bold mb-2 italic">Ba Ria - Vung Tau province was officially established (separated from the Vung Tau - Con Dao Special Zone and Dong Nai Province)
                                </h3>
                                <p class="lang lang-vi font-body text-surface-dim leading-relaxed text-[2vw] text-justify" style="line-height:1.2; margin-bottom:1vw;">Thành lập tỉnh Bà Rịa -
                                    Vũng
                                    Tàu (tách ra từ Đặc khu Vũng Tàu - Côn Đảo và tỉnh Đồng Nai).</p>
                            </div>
                        </div>
                        <div
                            class="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 dot-node z-20">
                        </div>
                        <div class="hidden md:block w-1/2 pl-12 order-2">
                            <div class="text-gold-light font-headline text-4xl font-bold mb-2">1991</div>
                        </div>
                    </div>

                    <div class="relative flex flex-col md:flex-row items-center mb-16 group">
                        <div class="hidden md:block w-1/2 pr-12 text-right">
                            <div class="text-gold-light font-headline text-4xl font-bold mb-2">1991</div>
                        </div>
                        <div
                            class="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 dot-node z-20">
                        </div>
                        <div class="w-full md:w-1/2 pl-12">
                            <div
                                class="glass-card p-[1.6vw] rounded-xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                                <div class="md:hidden text-gold-light font-headline text-3xl font-bold mb-2">1991</div>
                                <h3 class="lang lang-vi font-headline text-[2.6vw] text-white font-bold mb-2 italic">Khu Chế Xuất Tân
                                    Thuận
                                </h3>
                                 <h3 class="lang lang-eng hidden font-headline text-[2.6vw] text-white font-bold mb-2 italic">The establishment of the Tan Thuan Export Processing Zone (Ho Chi Minh City) - The nation's very first export processing zone
                                </h3>
                                <p class="lang lang-vi font-body text-surface-dim leading-relaxed text-[2vw] text-justify" style="line-height:1.2; margin-bottom:1vw;">Thành lập Khu chế xuất Tân
                                    Thuận (TP.HCM) – Khu chế xuất đầu tiên của cả nước.</p>
                            </div>
                        </div>
                    </div>

                    <div class="relative flex flex-col md:flex-row items-center mb-16 group">
                        <div class="w-full md:w-1/2 pr-12 order-2 md:order-1 text-left md:text-right">
                            <div
                                class="glass-card p-[1.6vw] rounded-xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                                <div class="md:hidden text-gold-light font-headline text-3xl font-bold mb-2">1996</div>
                                <h3 class="lang lang-vi font-headline text-[2.6vw] text-white font-bold mb-2 italic">VSIP I - Biểu tượng
                                    Hợp
                                    tác</h3>
                                     <h3 class="lang lang-eng hidden font-headline text-[2.6vw] text-white font-bold mb-2 italic">The inauguration of the VSIP Industrial Park I in Binh Duong - An icon of the modern industrial model, marking the beginning of the investment attraction era</h3>
                                <p class="lang lang-vi font-body text-surface-dim leading-relaxed text-[2vw] text-justify" style="line-height:1.2; margin-bottom:1vw;">Khánh thành Khu công
                                    nghiệp
                                    VSIP I tại Bình Dương – biểu tượng của mô hình công nghiệp hiện đại, bắt đầu thời kỳ
                                    mời
                                    gọi đầu tư.</p>
                            </div>
                        </div>
                        <div
                            class="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 dot-node z-20">
                        </div>
                        <div class="hidden md:block w-1/2 pl-12 order-2">
                            <div class="text-gold-light font-headline text-4xl font-bold mb-2">1996</div>
                        </div>
                    </div>

                    <div class="relative flex flex-col md:flex-row items-center group">
                        <div class="hidden md:block w-1/2 pr-12 text-right">
                            <div class="text-gold-light font-headline text-4xl font-bold mb-2">1997</div>
                        </div>
                        <div
                            class="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 dot-node z-20">
                        </div>
                        <div class="w-full md:w-1/2 pl-12">
                            <div
                                class="glass-card p-[1.6vw] rounded-xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                                <div class="md:hidden text-gold-light font-headline text-3xl font-bold mb-2">1997</div>
                                <h3 class="lang lang-vi font-headline text-[2.6vw] text-white font-bold mb-2 italic">Từ vùng đất Sông Bé
                                    đến
                                    trung tâm công nghiệp Bình Dương</h3>
                                     <h3 class="lang lang-eng hidden font-headline text-[2.6vw] text-white font-bold mb-2 italic">Song Be Province was divided into Binh Duong and Binh Phuoc provinces. Binh Duong entered a period of breakthrough industrial growth
                                    tác</h3>
                                <p class="lang lang-vi font-body text-surface-dim leading-relaxed text-[2vw] text-justify" style="line-height:1.2; margin-bottom:1vw;">Tỉnh Sông Bé chia tách
                                    thành
                                    Bình Dương và Bình Phước. Bình Dương bứt phá mạnh mẽ về công nghiệp.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- Section 3: Công nghiệp hóa -->
                <section class="mb-[10vw] relative">
                    <div class="flex items-center mb-[5vw] md:justify-center">
                        <div
                            class="lang lang-vi bg-gold text-deep-red font-label font-black text-[1.8vw] uppercase px-[2vw] py-[1vw] rounded-full z-10 shadow-lg">
                            Giai đoạn Công nghiệp hóa &amp; Đô thị hóa (2001 - 2015)
                        </div>
                        <div
                            class="lang lang-eng hidden bg-gold text-deep-red font-label font-black text-[1.8vw] uppercase px-[2vw] py-[1vw] rounded-full z-10 shadow-lg">
                            The period of Industrialization & urbanization (2001 - 2015)
                        </div>
                    </div>

                    <div class="relative flex flex-col md:flex-row items-center mb-16 group">
                        <div class="w-full md:w-1/2 pr-12 order-2 md:order-1 text-left md:text-right">
                            <div
                                class="glass-card p-[1.6vw] rounded-xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                                <div class="md:hidden text-gold-light font-headline text-3xl font-bold mb-2">2003</div>
                                <h3 class="lang lang-vi font-headline text-[2.6vw] text-white font-bold mb-2 italic">Thung lũng công nghệ
                                </h3>
                                 <h3 class="lang lang-eng hidden font-headline text-[2.6vw] text-white font-bold mb-2 italic">The establishment of the Ho Chi Minh City Hi-Tech Park
                                </h3>
                                <p class="lang lang-vi font-body text-surface-dim leading-relaxed text-[2vw] text-justify" style="line-height:1.2; margin-bottom:1vw;">Thành lập Khu Công nghệ
                                    cao
                                    TP.HCM, thu hút các tập đoàn lớn như Intel.</p>
                            </div>
                        </div>
                        <div
                            class="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 dot-node z-20">
                        </div>
                        <div class="hidden md:block w-1/2 pl-12 order-2">
                            <div class="text-gold-light font-headline text-4xl font-bold mb-2">2003</div>
                        </div>
                    </div>

                    <div class="relative flex flex-col md:flex-row items-center mb-16 group">
                        <div class="hidden md:block w-1/2 pr-12 text-right">
                            <div class="text-gold-light font-headline text-4xl font-bold mb-2">2009</div>
                        </div>
                        <div
                            class="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 dot-node z-20">
                        </div>
                        <div class="w-full md:w-1/2 pl-12">
                            <div
                                class="glass-card p-[1.6vw] rounded-xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                                <div class="md:hidden text-gold-light font-headline text-3xl font-bold mb-2">2009</div>
                                <h3 class="lang lang-vi font-headline text-[2.6vw] text-white font-bold mb-2 italic">Hầm Thủ Thiêm & Đại
                                    lộ
                                    Đông Tây
                                    Việt</h3>
                                <h3 class="lang lang-eng hidden font-headline text-[2.6vw] text-white font-bold mb-2 italic">The opening of the East-West Highway, followed by the Thu Thiem tunnel (2011), revolutionizing Ho Chi Minh City’s infrastructure landscape</h3>
                                <p class="lang lang-vi font-body text-surface-dim leading-relaxed text-[2vw] text-justify" style="line-height:1.2; margin-bottom:1vw;">Khai trương Đại lộ Đông
                                    Tây và
                                    sau đó là Hầm Thủ Thiêm (2011), thay đổi diện mạo hạ tầng TP.HCM.</p>
                            </div>
                        </div>
                    </div>

                    <div class="relative flex flex-col md:flex-row items-center mb-16 group">
                        <div class="w-full md:w-1/2 pr-12 order-2 md:order-1 text-left md:text-right">
                            <div
                                class="glass-card p-[1.6vw] rounded-xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                                <div class="md:hidden text-gold-light font-headline text-3xl font-bold mb-2">2009</div>
                                <h3 class="lang lang-vi font-headline text-[2.6vw] text-white font-bold mb-2 italic">Cửa ngõ Đại dương
                                </h3>
                                <h3 class="lang lang-eng hidden font-headline text-[2.6vw] text-white font-bold mb-2 italic">Cai Mep - Thi Vai International Port, becoming Vietnam's deepest international maritime gateway</h3>
                                <p class="lang lang-vi font-body text-surface-dim leading-relaxed text-[2vw] text-justify" style="line-height:1.2; margin-bottom:1vw;">Cảng quốc tế Cái Mép - Thị
                                    Vải
                                    đón chuyến tàu mẹ đầu tiên, trở thành cửa ngõ hàng hải quốc tế sâu nhất Việt Nam.
                                </p>
                            </div>
                        </div>
                        <div
                            class="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 dot-node z-20">
                        </div>
                        <div class="hidden md:block w-1/2 pl-12 order-2">
                            <div class="text-gold-light font-headline text-4xl font-bold mb-2">2009</div>
                        </div>
                    </div>

                    <div class="relative flex flex-col md:flex-row items-center  group">
                        <div class="hidden md:block w-1/2 pr-12 text-right">
                            <div class="text-gold-light font-headline text-4xl font-bold mb-2">2014</div>
                        </div>
                        <div
                            class="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 dot-node z-20">
                        </div>
                        <div class="w-full md:w-1/2 pl-12">
                            <div
                                class="glass-card p-[1.6vw] rounded-xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                                <div class="md:hidden text-gold-light font-headline text-3xl font-bold mb-2">2014</div>
                                <h3 class="lang lang-vi font-headline text-[2.6vw] text-white font-bold mb-2 italic">Thành phố mới Bình
                                    Dương
                                </h3>
                                <h3 class="lang lang-eng hidden font-headline text-[2.6vw] text-white font-bold mb-2 italic">Binh Duong inaugurated its Centralized Administrative Center and officially launched Binh Duong New City</h3>
                                <p class="lang lang-vi font-body text-surface-dim leading-relaxed text-[2vw] text-justify" style="line-height:1.2; margin-bottom:1vw;">Bình Dương khánh thành
                                    Trung
                                    tâm Hành chính tập trung và ra mắt Thành phố mới Bình Dương.</p>
                            </div>
                        </div>
                    </div>


                </section>
                <!-- Section 4: Liên kết Vùng & Kinh tế số -->
                <section class="relative">
                    <div class="flex items-center mb-[5vw] md:justify-center">
                        <div
                            class="lang lang-vi bg-gold text-deep-red font-label font-black text-[1.8vw] uppercase px-[2vw] py-[1vw] rounded-full z-10 shadow-lg">
                            Giai đoạn Liên kết Vùng &amp; Kinh tế số (2016 - nay)
                        </div>
                        <div
                            class="lang lang-eng hidden bg-gold text-deep-red font-label font-black text-[1.8vw] uppercase px-[2vw] py-[1vw] rounded-full z-10 shadow-lg">
                            The period of regional connectivity & the digital economy (2016 - Present)
                        </div>
                    </div>

                    <div class="relative flex flex-col md:flex-row items-center mb-16 group">
                        <div class="w-full md:w-1/2 pr-12 order-2 md:order-1 text-left md:text-right">
                            <div
                                class="glass-card p-[1.6vw] rounded-xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                                <div class="md:hidden text-gold-light font-headline text-3xl font-bold mb-2">2020</div>
                                <h3 class="lang lang-vi font-headline text-[2.6vw] text-white font-bold mb-2 italic">Thành lập Thành phố
                                    Thủ
                                    Đức</h3>
                                    <h3 class="lang lang-eng hidden font-headline text-[2.6vw] text-white font-bold mb-2 italic">The establishment of Thu Duc City - The nation's first "City-within-a-city" model</h3>
                                <p class="lang lang-vi font-body text-surface-dim leading-relaxed text-[2vw] text-justify" style="line-height:1.2; margin-bottom:1vw;">Thành lập Thành phố Thủ
                                    Đức –
                                    mô hình "thành phố trong thành phố" đầu tiên.</p>
                            </div>
                        </div>
                        <div
                            class="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 dot-node z-20">
                        </div>
                        <div class="hidden md:block w-1/2 pl-12 order-2">
                            <div class="text-gold-light font-headline text-4xl font-bold mb-2">2020</div>
                        </div>
                    </div>

                    <div class="relative flex flex-col md:flex-row items-center mb-16 group">
                        <div class="hidden md:block w-1/2 pr-12 text-right">
                            <div class="text-gold-light font-headline text-4xl font-bold mb-2">2021 - 2024</div>
                        </div>
                        <div
                            class="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 dot-node z-20">
                        </div>
                        <div class="w-full md:w-1/2 pl-12">
                            <div
                                class="glass-card p-[1.6vw] rounded-xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                                <div class="md:hidden text-gold-light font-headline text-3xl font-bold mb-2">2021 - 2024
                                </div>
                                <h3 class="lang lang-vi font-headline text-[2.6vw] text-white font-bold mb-2 italic">Kết nối Siêu hạ tầng
                                    Vành
                                    đai 3 & 4
                                </h3>
                                <h3 class="lang lang-eng hidden font-headline text-[2.6vw] text-white font-bold mb-2 italic">Groundbreaking of regional mega-connectivity projects, including Ring Road 3, Ring Road 4, and the Bien Hoa - Vung Tau Expressway</h3>
                                <p class="lang lang-vi font-body text-surface-dim leading-relaxed text-[2vw] text-justify" style="line-height:1.2; margin-bottom:1vw;">Khởi công các siêu dự án
                                    kết
                                    nối vùng: Đường Vành đai 3, 4, cao tốc Biên Hòa - Vũng Tàu.</p>
                            </div>
                        </div>
                    </div>

                    <div class="relative flex flex-col md:flex-row items-center mb-16 group">
                        <div class="w-full md:w-1/2 pr-12 order-2 md:order-1 text-left md:text-right">
                            <div
                                class="glass-card p-[1.6vw] rounded-xl transition-all duration-700 ease-out opacity-100 translate-y-0">
                                <div class="md:hidden text-gold-light font-headline text-3xl font-bold mb-2">2026</div>
                                <h3 class="lang lang-vi font-headline text-[2.6vw] text-white font-bold mb-2 italic">Siêu sân bay Long
                                    Thành
                                </h3>
                                <h3 class="lang lang-eng hidden font-headline text-[2.6vw] text-white font-bold mb-2 italic">Completion of Phase 1 of Long Thanh International Airport (adjacent to the region) and smart seaport projects in Ba Ria - Vung Tau. Binh Duong: Became the first locality in Vietnam to be named in the Top 1 Intelligent Community of the Year (ICF)</h3>
                                <p class="lang lang-vi font-body text-surface-dim leading-relaxed text-[2vw] text-justify" style="line-height:1.2; margin-bottom:1vw;">Hoàn thành giai đoạn 1 sân
                                    bay
                                    Long Thành (liền kề khu vực) và các dự án cảng biển thông minh tại Bà Rịa - Vũng
                                    Tàu. Bình Dương: Trở thành địa phương đầu tiên của Việt Nam lọt vào Top 1 cộng đồng thông minh thế giới
                                </p>
                            </div>
                        </div>
                        <div
                            class="absolute left-4 md:left-1/2 w-4 h-4 bg-gold rounded-full -translate-x-1/2 dot-node z-20">
                        </div>
                        <div class="hidden md:block w-1/2 pl-12 order-2">
                            <div class="text-gold-light font-headline text-4xl font-bold mb-2">2026</div>
                        </div>
                    </div>

                    <!-- 2025 Vision -->
                    <div class="relative flex flex-col items-center mt-[8vw]">
                        <div
                            class="absolute left-4 md:left-1/2 top-0 bottom-0 timeline-line -translate-x-1/2 opacity-20">
                        </div>
                        <div
                            class="bg-gold-light/20 backdrop-blur-xl border-2 border-gold p-[3vw] rounded-3xl max-w-[88%] text-center relative z-20 shadow-2xl overflow-hidden group">
                            <div
                                class="absolute -right-10 -top-10 opacity-10 group-hover:rotate-12 transition-transform duration-700">
                                <span class="material-symbols-outlined text-[120px] text-gold">hub</span>
                            </div>
                            <div class=" lang lang-vi text-gold font-label font-black text-[2.2vw] tracking-widest uppercase mb-[0.8vw]">Tầm nhìn
                                2025</div>
                                <div class=" lang lang-eng hidden text-gold font-label font-black text-[2.2vw] tracking-widest uppercase mb-[0.8vw]">Vision
                                2025</div>
                            <h2 class="lang lang-vi font-headline text-[3.6vw] md:text-4xl font-bold text-gold-light mb-[1.2vw]">Đại hợp nhất
                                Hành
                                chính</h2>
                                <h2 class="lang lang-eng hidden font-headline text-[3.6vw] md:text-4xl font-bold text-gold-light mb-[1.2vw]">Great Administrative Consolidation</h2>
                            <p class="lang lang-vi font-body text-gold/90 text-[2.2vw] leading-relaxed">
                                <strong class="text-white">30/06/2025:</strong> Cột mốc lịch sử khi TP.HCM, Bình Dương
                                và Bà
                                Rịa - Vũng Tàu chính thức triển khai cơ chế sáp nhập, tạo nên nền kinh tế
                                năng
                                động nhất Đông Nam Á.
                            </p>
                            <p class="lang lang-eng hidden font-body text-gold/90 text-[2.2vw] leading-relaxed">
                                <strong class="text-white">30/06/2025:</strong> A historic milestone marked the official implementation of the merger mechanism between Ho Chi Minh City, Binh Duong, and Ba Ria–Vung Tau, creating the most dynamic economic region in Southeast Asia.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </main>
        <!-- Decorative Elements -->
        <div class="fixed bottom-10 flex flex-col items-center gap-2 text-tertiary-fixed/50 dcd-scroll-hint pointer-events-none">
            <span class="text-[1.6vw] font-label tracking-widest uppercase">Cuộn để xem</span>
            <span class="material-symbols-outlined">expand_more</span>
        </div>
        
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
Exhibition.registerPage('50nam','dongchaydisan/page1',Exhibition.dongchaydisan.page('page1'));
})();

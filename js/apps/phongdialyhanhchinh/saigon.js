window.Pages = window.Pages || {};

window.Pages.saigon = function (datas) {
     const carouselItems = Array.isArray(datas)
        ? datas.map((item, i) => `
        <div class="carousel-item ${i === 0 ? 'active' : ''}">
             <div class="beer-slider" data-beer-label="Before">
                    <img src="${item.img2}" alt="1">
                    <div class="beer-reveal" data-beer-label="After">
                        <img src="${item.img1}" alt="1">
                    </div>
                </div>

            <div class="carousel-caption d-block d-md-block">
                <p class="lang lang-vi">${item.desc}</p>
                <p class="lang lang-eng" style="display:none;">${item.desc2}</p>
            </div>
        </div>`).join("")
        : "";
 
    return `
        <h1 class="lang lang-vi">Sài Gòn Xưa Và Nay</h1>
        <h1 class="lang lang-eng" style="display:none;">Saigon - Past And Present</h1>

         <div id="saingon" class="carousel slide carousel-fade" data-bs-ride="carousel" data-bs-touch="false" data-bs-interval="20000">
        <div class="background-top">
        </div>
        <div class="carousel-inner" id="carousel-inner">
            <!-- Map Data -->
           ${carouselItems}
           
        </div>

        <button class="carousel-control-prev" type="button" data-bs-target="#saingon" data-bs-slide="prev">
            <span class="carousel-control-prev-icon"></span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#saingon" data-bs-slide="next">
            <span class="carousel-control-next-icon"></span>
        </button>
    </div>
    `;
};
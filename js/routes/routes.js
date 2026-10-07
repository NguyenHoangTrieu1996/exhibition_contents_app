/* Cấu hình và điều hướng SPA. Đường dẫn tài nguyên tính từ index.html.
 * Thêm app khi đã có tệp thật; mỗi app khai báo trang index và các trang con.
 * Ví dụ:
 * { id:'dia-ly', title:{vi:'Địa lý hành chính',en:'Administrative geography'},
 *   styles:['./css/apps/dia-ly/style.css'], scripts:[], pages:{
 *     index:{script:'./js/apps/dia-ly/index.js',data:['./public/datas/dia-ly/index.js']},
 *     detail:{script:'./js/apps/dia-ly/detail.js',data:[],styles:[]}
 *   }
 * }
 * Trang đăng ký bằng Exhibition.registerPage('dia-ly','index',{render,features}).
 * initialApp/initialPage chọn trang mặc định khi mở index.html hoặc #/.
 * Có thể thay tên/tệp HTML chính: các liên kết hash luôn ở cùng tài liệu.
 * shell cho phép thay ID các phần tử trong HTML mà không sửa main.js.
 */
(function () {
  'use strict';
  const config = {
    initialApp: 'phongdialyhanhchinh',
    initialPage: 'index',
    shell: {root:'app', navigation:'app-navigation', languageButton:'language-toggle'},
    apps: [
      {
        id:'cacchuyendekhac',
        title:{vi:'Các chuyên đề khác',en:'More exhibitions'},
        styles:['./css/apps/cacchuyende.css'],
        pages:{index:{script:'./js/apps/cacchuyende.js'}}
      },
      ...[
        ['vanhoa',{vi:'Văn hóa',en:'Culture'}],
        ['phongkinhte',{vi:'Phòng Kinh tế',en:'Economy Gallery'}],
        ['phongdialyhanhchinh',{vi:'Phòng Địa lý - Hành chính',en:'Geography and Administration Gallery'}],
        ['duongham',{vi:'Đường hầm',en:'The Tunnel'}],
        ['50nam',{vi:'50 năm',en:'50 Years'}],
        ['lansurong',{vi:'Lân Sư Rồng',en:'Lion and Dragon Dance'}],
        ['SongNuoc',{vi:'Sông nước',en:'Rivers and Waterways'}],
        ['TrangPhucCoTrang',{vi:'Trang phục cổ trang',en:'Historical Costumes'}],
        ['thuvakyvatkhangchien',{vi:'Thư và kỷ vật kháng chiến',en:'Letters and Wartime Memorabilia'}],
        ['temvebac',{vi:'Tem về Bác',en:'Stamps about President Ho Chi Minh'}]
      ].map(([id,title])=>({
        id,
        title,
        ...(id === 'vanhoa' ? {
          styles:[
            './css/apps/vanhoa/bootstrap-4.scoped.css',
            './css/apps/vanhoa/source.css',
            './css/apps/vanhoa/style.css',
            './css/apps/vanhoa/line-awesome/css/line-awesome.min.css',
            './js/libs/lightgallery/css/lightgallery-bundle.min.css'
          ],
          scripts:[
            './js/libs/lightgallery/lightgallery.min.js',
            './js/libs/lightgallery/plugins/zoom/lg-zoom.min.js',
            './js/libs/lightgallery/plugins/thumbnail/lg-thumbnail.min.js',
            './js/apps/vanhoa/index.js'
          ],
          pages:Object.fromEntries([
            'index',
            'giaoduc/giaoduc',
            'nghethuat/nghethuat','nghethuat/cailuong','nghethuat/daocucham',
            'nghethuat/daocuhoa','nghethuat/hatboi','nghethuat/khmer',
            'phongtuc/phongtuc','phongtuc/damcuoiviet','phongtuc/damcuoinguoihoa',
            'phongtuc/damcuoinguoicham','phongtuc/damcuoinguoikhome',
            'tinnguong/tinnguong','tinnguong/thomau','tinnguong/thothanhoang',
            'tinnguong/thothantai'
          ].map(page=>[page,{script:`./js/apps/vanhoa/pages/${page}.js`}]))
        } : id === '50nam' ? {
          styles:['./css/apps/50nam/dongchaydisan/fonts.css','./css/apps/50nam/dongchaydisan/legacy.css','./css/apps/50nam/dongchaydisan/source.css','./css/apps/50nam/dongchaydisan/style.css'],
          scripts:['./js/apps/50nam/dongchaydisan/shared.js','./js/apps/50nam/dongchaydisan/index.js','./js/apps/50nam/sieudothi/shared.js'],
          pages:{
            index:{script:'./js/apps/50nam/dongchaydisan/index.js'},
            'dongchaydisan/index':{script:'./js/apps/50nam/dongchaydisan/index.js'},
            'dongchaydisan/page1':{script:'./js/apps/50nam/dongchaydisan/page1.js'},
            'dongchaydisan/page2':{script:'./js/apps/50nam/dongchaydisan/page2.js',data:['./public/datas/50nam/dongchaydisan/page2Data.js']},
            'dongchaydisan/page3':{script:'./js/apps/50nam/dongchaydisan/page3.js',data:['./public/datas/50nam/dongchaydisan/page3Data.js']},
            ...Object.fromEntries(['index','page1','page2','page3'].map(page=>['sieudothi/'+page,{
              script:'./js/apps/50nam/sieudothi/'+page+'.js',
              styles:['./css/apps/50nam/sieudothi/fonts.css','./css/apps/50nam/sieudothi/legacy.css','./css/apps/50nam/sieudothi/source.css','./css/apps/50nam/sieudothi/style.css'],
              ...(page==='index'?{}:{data:['./public/datas/50nam/sieudothi/'+page+'Data.js']})
            }]))
          }
        } : id === 'temvebac' ? {
          styles:['./css/apps/temvebac/style.css','./js/libs/lightgallery/css/lightgallery-bundle.min.css'],
          scripts:[
            './public/datas/temvebac/chan-dung.js',
            './public/datas/temvebac/que-huong.js',
            './public/datas/temvebac/nguoi-thanh-nien.js',
            './public/datas/temvebac/bon-ba.js',
            './public/datas/temvebac/lanh-dao-cach-mang.js',
            './public/datas/temvebac/nhan-dan-quoc-te.js',
            './js/libs/lightgallery/lightgallery.min.js',
            './js/libs/lightgallery/plugins/zoom/lg-zoom.min.js',
            './js/libs/lightgallery/plugins/thumbnail/lg-thumbnail.min.js'
          ],
          pages:Object.fromEntries(['index','chan-dung','que-huong','nguoi-thanh-nien','bon-ba','lanh-dao-cach-mang','nhan-dan-quoc-te','bo-suu-tap'].map(page=>[page,{script:'./js/apps/temvebac/index.js'}]))
        } : id === 'phongkinhte' ? {
          styles:['./css/apps/phongkinhte/style.css'],
          scripts:['./js/apps/phongkinhte/pages.js'],
          pages:Object.fromEntries([
            'index','nongnghiep','congnghiep','thuongcang','thuongmai','dichvu',
            'congnghiep/congnghiepnang','congnghiep/kimhoan','congnghiep/lamgom',
            'congnghiep/thucong','congnghiep/khacgo','congnghiep/ducdong','video'
          ].map(page=>[page,{script:'./js/apps/phongkinhte/index.js'}]))
        } : id === 'SongNuoc' ? {
          styles:['./css/apps/SongNuoc/spa.css'],
          scripts:[
            './js/apps/SongNuoc/pages.js',
            './js/apps/SongNuoc/trangchu-data.js',
            './js/apps/SongNuoc/vanhoasongnuoc-data.js',
            './js/apps/SongNuoc/shared.js'
          ],
          pages:{
            index:{script:'./js/apps/SongNuoc/index.js'},
            tulieuhinhanh:{script:'./js/apps/SongNuoc/tulieuhinhanh.js'},
            nhungcaycau:{script:'./js/apps/SongNuoc/nhungcaycau.js'},
            vanhoasongnuoc:{script:'./js/apps/SongNuoc/vanhoasongnuoc.js'}
          }
        } : id === 'TrangPhucCoTrang' ? {
          styles:['./css/apps/trangphuccotrang/style.css'],
          pages:{index:{script:'./js/apps/TrangPhucCoTrang/index.js'}}
        } : id === 'phongdialyhanhchinh' ? {
          styles:['./css/apps/phongdialyhanhchinh/style.css'],
          pages:{
            index:{
              script:`./js/apps/${id}/index.js`,
              data:['./public/datas/phongdialyhanhchinh/indexData.js']
            },
            antin:{
              script:`./js/apps/${id}/index.js`,
              data:['./public/datas/phongdialyhanhchinh/indexData.js']
            },
            bando:{
              script:`./js/apps/${id}/index.js`,
              data:['./public/datas/phongdialyhanhchinh/bandoData.js']
            },
            sacphong:{
              script:`./js/apps/${id}/index.js`,
              data:['./public/datas/phongdialyhanhchinh/sacphongData.js']
            },
            saigon:{
              script:`./js/apps/${id}/index.js`,
              data:['./public/datas/phongdialyhanhchinh/saigonData.js']
            }
          }
        } : id === 'duongham' ? {
          styles:['./css/apps/duongham/style.css'],
          scripts:[
            './js/apps/duongham/vainetvedinhgialong.js',
            './js/apps/duongham/kientrucxua.js',
            './js/apps/duongham/thaynguagiuadong.js',
            './js/apps/duongham/xaydungduongham.js',
            './js/apps/duongham/ngoiphao.js'
          ],
          pages:{
            index:{
              script:'./js/apps/duongham/index.js',
              data:['./public/datas/duongham/datas-home.js']
            },
            kientrucxua:{
              script:'./js/apps/duongham/index.js',
              data:['./public/datas/duongham/datas-kientrucxua.js']
            },
            thaynguagiuadong:{
              script:'./js/apps/duongham/index.js',
              data:['./public/datas/duongham/datas-thaynguagiuadong.js']
            },
            xaydungduongham:{
              script:'./js/apps/duongham/index.js',
              data:['./public/datas/duongham/datas-xaydungduongham.js']
            },
            ngoiphao:{
              script:'./js/apps/duongham/index.js',
              data:['./public/datas/duongham/datas-ngoiphao.js']
            }
          }
        } : id === 'lansurong' ? {
          styles:['./css/apps/lansurong/style.css'],
          scripts:[
            './js/apps/lansurong/fireworks.js',
            './js/apps/lansurong/trangchu.js',
            './js/apps/lansurong/nguongoc.js',
            './js/apps/lansurong/chetac.js',
            './js/apps/lansurong/bieudien.js',
            './js/apps/lansurong/doisong.js'
          ],
          pages:{
            index:{script:'./js/apps/lansurong/index.js'},
            nguongoc:{script:'./js/apps/lansurong/index.js'},
            chetac:{script:'./js/apps/lansurong/index.js'},
            bieudien:{script:'./js/apps/lansurong/index.js'},
            doisong:{script:'./js/apps/lansurong/index.js'}
          }
        } : {
          pages:{index:{script:`./js/apps/${id}/index.js`}}
        })
      }))
    ]
  };
  function href(app, page='index') {
    if (!app || app === '/') return '#/';
    return '#/'+encodeURIComponent(app)+'/'+page.split('/').map(encodeURIComponent).join('/');
  }
  function current() {
    const value=location.hash.slice(1)||'/';
    if(value==='/')return config.initialApp?{app:config.initialApp,page:config.initialPage}:null;
    const parts=value.replace(/^\//,'').split('/');
    if(parts.some(part=>!part))return {app:'',page:''};
    try{return {app:decodeURIComponent(parts[0]),page:parts.slice(1).map(decodeURIComponent).join('/')||'index'};}
    catch(_){return {app:'',page:''};}
  }
  let lastRoute=current(), previousRoute=null, routeChangeId=0;
  window.addEventListener('hashchange',()=>{
    previousRoute=lastRoute;
    lastRoute=current();
    routeChangeId++;
  });
  function previous() { return previousRoute; }
  function changeId() { return routeChangeId; }
  function navigate(app,page='index') {const next=href(app,page);if(location.hash!==next)location.hash=next;}
  function subscribe(handler) {window.addEventListener('hashchange',handler);return ()=>window.removeEventListener('hashchange',handler);}
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  window.ExhibitionRoutes={config,current,previous,changeId,navigate,href,subscribe};
})();

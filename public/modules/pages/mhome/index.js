define([
    'jquery',
    'swiper',
    '../../common/mheader/index',
    //'../../common/footer/index',
    'less!./mhome'
], function($, Swiper) {
    
	var topBannerSwiper = new Swiper ('.topBannerSwiper', {
        loop: true,
        autoplay: 5000,
        pagination: '.topBannerSwiper .swiper-pagination',
        paginationClickable: true,
        // paginationBulletRender: function (index, className) {
        //     var iconName = "icon-circle-active";
        //     return '<span class="' + className +" "+ iconName + '"></span>';
        // }
      });
});

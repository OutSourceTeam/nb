define([
    'jquery',
    'swiper',
    '../../common/mheader/index',
    '../../common/mfooter/index',
    'less!./mproductDetail'
], function($, Swiper) {
    var topBannerSwiper = new Swiper ('.topBannerSwiper', {
        loop: true,
        autoplay: 5000,
        pagination: '.topBannerSwiper .swiper-pagination',
        paginationClickable: true,
      });
});

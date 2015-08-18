define([
    'jquery',
    'swiper',
    '../../common/mheader/index',
    '../../common/mfooter/index',
    'less!./mhome'
], function($, Swiper) {
    
	var topBannerSwiper = new Swiper ('.topBannerSwiper', {
        loop: true,
        autoplay: 5000,
        pagination: '.topBannerSwiper .swiper-pagination',
        paginationClickable: true,
      });
	var bottomNewsSwiper = new Swiper ('.bottomNewsSwiper', {
        loop: true,
        nextButton: '.bottomNewsSwiper .swiper-button-next',
        prevButton: '.bottomNewsSwiper .swiper-button-prev',
      });
});

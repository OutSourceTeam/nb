define([
    'jquery',
    'swiper',
    'bxslider',
    '../../common/header/index',
    '../../common/footer/index',
    'less!./home'
], function($, Swiper) {
    
	var topBannerSwiper = new Swiper ('.topBannerSwiper', {
        loop: true,
        autoplay: 5000,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
            var iconName = "icon-polygon-active";
            return '<span class="' + className +" "+ iconName + '"></span>';
        }
      });
      var bottomNewsSwiper = new Swiper ('.bottomNewsSwiper', {
        loop: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
      });
    $('.weixin').on('click', function(ev){
        $('.pageCover').addClass('show');
        ev.stopPropagation();
    });
    $('.closeBtn').on('click', function(ev){
        $('.pageCover').removeClass('show');
        ev.stopPropagation();
    });
});

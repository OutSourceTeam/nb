define([
    'jquery',
    'swiper',
    'common/header/index',
    'common/footer/index',
    'less!./home'
], function($, Swiper) {
    
	var topBannerSwiper = new Swiper ('.topBannerSwiper', {
        loop: true,
        speed: 500,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
            var iconName = "icon-polygon-active";
            return '<span class="' + className +" "+ iconName + '"></span>';
        }
      });
      var bottomNewsSwiper = new Swiper ('.bottomNewsSwiper', {
        loop: true,
        speed: 500,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
      });
    $('.weixin').on('click', function(ev){
        $('.pageCover').addClass('show');
        ev.stopPropagation();
    });
    $('.closeBtn').on('click', function(){
        $('.pageCover').removeClass('show');
        ev.stopPropagation();
    });
});

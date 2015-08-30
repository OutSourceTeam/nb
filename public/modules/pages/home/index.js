define([
    'jquery',
    'swiper',
    '../../common/header/index',
    '../../common/footer/index',
    'less!./home'
], function($, Swiper) {

    if ($('.topBannerSwiper .swiper-wrapper .swiper-slide').length > 1) {
        var topBannerSwiper = new Swiper('.topBannerSwiper', {
            loop: true,
            autoplay: 3000,
            pagination: '.swiper-pagination',
            paginationClickable: true,
            createPagination: true,
            // paginationBulletRender: function (index, className) {
            //     var iconName = "icon-polygon-active";
            //     return '<span class="' + className +" "+ iconName + '"></span>';
            // }
        });
    };

    if ($('.bottomNewsSwiper .swiper-wrapper .swiper-slide').length > 1) {
        var bottomNewsSwiper = new Swiper('.bottomNewsSwiper', {
            loop: true,
            // nextButton: '.swiper-button-next',
            // prevButton: '.swiper-button-prev',
        });
        $('.swiper-button-prev').on('click', function() {
            bottomNewsSwiper.swipePrev();
        });
        $('.swiper-button-next').on('click', function() {
            bottomNewsSwiper.swipeNext();
        });
    }else{
        $('.swiper-button-prev').hide();
        $('.swiper-button-next').hide();
    }

    $('.weixin').on('click', function(ev) {
        $('.pageCover').addClass('show');
        ev.stopPropagation();
    });
    $('.closeBtn').on('click', function(ev) {
        $('.pageCover').removeClass('show');
        ev.stopPropagation();
    });
});

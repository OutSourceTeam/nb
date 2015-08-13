define([
    'jquery',
    'swiper',
    'common/header/index',
    'common/footer/index',
    'less!./productList'
], function($, Swiper) {
    (function () {
        $('#features').hover(function () {
            $(this).find('.gonnemeun').show();
        }, function () {
            $(this).find('.gonnemeun').hide();
        })

    })()

    var popeBannerSwiper = new Swiper ('.popeBannerSwiper', {
        loop: true,
        speed: 500,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
            var iconName = "icon-polygon-active";
            return '<span class="' + className +" "+ iconName + '"></span>';
        },
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    });

    var popebigBannerSwiper = new Swiper ('.popebigBannerSwiper', {
        loop: true,
        speed: 500,
        pagination: '#bigpagination',
        paginationClickable: true,
        paginationBulletRender: function (index, className) {
            var iconName = "icon-polygon-active";
            return '<span class="' + className +" "+ iconName + '"></span>';
        },
        nextButton: '#bignext',
        prevButton: '#bigprev'
    });

    $('.showpope').each(function (index,item) {
        var $item = $(item)
        $item.on('click', function () {
            var $this = $(this)
            var pos = $this.offset();
            pos = $this.width()/2+pos.left;
            var $propope = $this.find('.propope');

            var quickview = $propope.find('.quickview-arrow');
            quickview.css('left',pos)
            $propope.slideToggle()

            console.log(pos)

        })

    })


});

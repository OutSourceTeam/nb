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

    var ispropopeshou=false,ispopeloading=false,ispopedone=false;

    $('.showpope').each(function (index,item) {
        var $item = $(item)
        $item.on('click', function () {
            var $this = $(this)
            var pos = $this.offset();
            pos = $this.width()/2+pos.left;
            var $propope = $this.find('.propope');

            var quickview = $propope.find('.quickview-arrow');
            var popeloading = $propope.find('.popeloading');
            var popedone = $propope.find('.popedone');
            quickview.css('left',pos);

            setTimeout(function () {
                if(ispopeloading){
                    ispopeloading=false
                    popeloading.show();
                }else{
                    ispopeloading=true
                    popeloading.hide();
                }

                if(!ispopedone){
                    ispopedone=true
                    popedone.fadeIn();
                }else{
                    ispopedone=false
                    popedone.fadeOut();
                }

            },1000);

             if(!ispropopeshou){
                 ispropopeshou=true
                 $propope.slideDown();
             }else{
                 ispropopeshou=false
                 $propope.slideUp();
             }



            console.log(pos)

        })

    })


});

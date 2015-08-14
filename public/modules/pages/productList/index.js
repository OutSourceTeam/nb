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
        $item.on('click', function (e) {
            if(ispropopeshou && e.target.className.indexOf('popeclosed')==-1)  return false;
            var $this = $(this)
            var pos = $this.offset();
            pos = $this.width()/2+pos.left;
            var $propope = $this.find('.propope');

            var quickview = $propope.find('.quickview-arrow');
            var popeloading = $propope.find('.popeloading');
            var popedone = $propope.find('.popedone');
            var popeclosed = $propope.find('.popeclosed');
            quickview.css('left',pos);

            var row = $('<div class="row quickview-spacer" style="height:180px"></div>');

            $this.parent('div').after(row)

            var quickview = $('.quickview-spacer');

             if(!ispropopeshou){
                 ispropopeshou=true
                 $propope.slideDown();

             }else{

                 if(e.target.className.indexOf('popeclosed')!=-1){
                     ispropopeshou=false;
                     quickview.slideUp().remove();
                     $propope.slideUp();
                 }

             }



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
                    quickview.css('height',popedone.height())
                }else{
                    ispopedone=false
                    popedone.fadeOut();
                }

            },1000);



        })

    })


});

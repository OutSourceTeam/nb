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

    })();

    var ispropopeshou=false,ispopeloading=false,ispopedone=false;

    $('.showpope').each(function (index,item) {
        var $item = $(item)
        $item.on('click', function (e) {
            if(ispropopeshou && e.target.className.indexOf('popeclosed')==-1)  return false;
            var $this = $(this)
            var pos = $this.offset();
            pos = $this.width()/2+pos.left;
            var $propope = $('.propope');

            var quickview = $propope.find('.quickview-arrow');
            var popeloading = $propope.find('.popeloading');
            var popedone = $propope.find('.popedone');
            var popeclosed = $propope.find('.popeclosed');
            quickview.css('left',pos);

            $this.find('.maiginbtn').append($propope);

            var row = $('<div class="row quickview-spacer" style="height:180px"></div>');
            $this.parent('div').after(row)
            var quickview = $('.quickview-spacer');

             if(!ispropopeshou){
                 ispropopeshou=true
                 $propope.slideDown();

             }else{

                 if(e.target.className.indexOf('popeclosed')!=-1){
                     ispropopeshou=false;
                     
                     $propope.slideUp(function(){
                        quickview.slideUp().remove();
                     });
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
                    quickview.css('height',popedone.height());

                }else{
                    ispopedone=false
                    popedone.fadeOut();
                }
                var popeBannerSwiper = new Swiper('#infoSwiper', {
                    loop: true,
                    speed: 300,
                    nextButton: '#infoSwiper .swiper-button-next',
                    prevButton: '#infoSwiper .swiper-button-prev'
                });
                var popebigBannerSwiper = new Swiper('#imageSwiper', {
                    loop: true,
                    speed: 300,
                    pagination: '#imageSwiper .swiper-pagination',
                    paginationClickable: true,
                    paginationBulletRender: function (index, className) {
                        var iconName = "icon-circle2";
                        return '<span class="' + className +" "+ iconName + '"><span class="path1"></span><span class="path2"></span></span>';
                    },
                    nextButton: '#imageSwiper .swiper-button-next',
                    prevButton: '#imageSwiper .swiper-button-prev'
                });
            },1000);
        })

    })


});

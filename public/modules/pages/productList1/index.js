define([
    'jquery',
    'swiper',
    '../../common/header/index',
    '../../common/footer/index',
    'less!./productList1'
], function ($, Swiper) {

    $('#features').hover(function () {
        $(this).find('.gonnemeun').show();
    }, function () {
        $(this).find('.gonnemeun').hide();
    });

    var ispropopeshou = false, 
        ispopeloading = false, 
        ispopedone = false, 
        prevTop;
    $('.chilemeun li').on('click', function(){
        var $icon = $(this).find('.iconSort');
        if ($icon.hasClass('icon-up')){
            $icon.removeClass('icon-up').addClass('icon-down');
            //do something
        } else{
            $icon.removeClass('icon-down').addClass('icon-up');
            //do something
        }
    });
    var popeBannerSwiper,
        popebigBannerSwiper;


    $('.product').each(function (index, item) {
        var $item = $(item);
        var prevHeight = $item.height();

        $item.on('click', {prevHeight : prevHeight}, function (e) {
            var prevHeight = e.data.prevHeight;

            if(ispropopeshou && e.target.className == 'buyingGuide'){
                return true;
            } else if (ispropopeshou && e.target.className.indexOf('popeclosed') == -1) {
                return false;
            }
            var $this = $(this)
            var phtml = shouPope();
            $this.append(phtml);
            var pos = $this.offset();
            pos = $this.width() / 2 + pos.left;
            var $propope = $this.find('.propope');
            var quickview = $propope.find('.quickview-arrow');
            var popeloading = $propope.find('.popeloading');
            var popedone = $propope.find('.popedone');
            var popeclosed = $propope.find('.popeclosed');
            quickview.css('left', pos);

            if (!ispropopeshou) {
                ispropopeshou = true;
                prevTop = $(window).scrollTop();
                $propope.css('display','block');
                var offsetTop = Math.abs($propope.offset().top - 120);
                var timing = 300;

                $("body, html").animate({scrollTop : offsetTop}, timing);

                $this.animate({'height': prevHeight + 200}, timing).addClass('active');
                $propope.animate({'height': 200}, timing);

            } else {
                if (e.target.className.indexOf('popeclosed') != -1) {
                    ispropopeshou = false;
                    var timing = 200;
                    $propope.animate({height: 0},timing,function(){
                        $('#infoSwiper .swiper-button-prev').off();
                        $('#infoSwiper .swiper-button-next').off();
                        $('#imageSwiper .swiper-button-prev').off();
                        $('#imageSwiper .swiper-button-next').off();
                        $propope.remove();
                    });
                    $this.animate({'height': prevHeight}, timing).removeClass('active');
                    $("body, html").animate({scrollTop : prevTop}, timing);
                }
            }
            setTimeout(function () {
                if (ispopeloading) {
                    ispopeloading = false
                    popeloading.show();
                } else {
                    ispopeloading = true
                    popeloading.hide();
                }

                if (!ispopedone) {
                    ispopedone = true
                    popedone.fadeIn();
                    $this.css('height', prevHeight + popedone.height() + 40);
                } else {
                    ispopedone = false
                    popedone.fadeOut();
                }
                var paginationImages = [
                    '../../../images/paginationImg01.png',
                    '../../../images/paginationImg01.png',
                    '../../../images/paginationImg01.png',
                    '../../../images/paginationImg01.png',
                ]
                popeBannerSwiper = new Swiper('#infoSwiper', {
                    loop: true,
                    speed: 300,
                    pagination: '#infoSwiper .swiper-pagination',
                    paginationClickable: true,
                    nextButton: '#infoSwiper .swiper-button-next',
                    prevButton: '#infoSwiper .swiper-button-prev',
                    // paginationBulletRender: function (index, className) {
                    //     return '<span class="' + className + '" style="background-image: url(' + paginationImages[index]+ ')"></span>';
                    // },
                });
                popebigBannerSwiper = new Swiper('#imageSwiper', {
                    loop: true,
                    speed: 300,
                    pagination: '#imageSwiper .swiper-pagination',
                    paginationClickable: true,
                    paginationBulletRender: function (index, className) {
                        var iconName = "icon-circle2";
                        return '<span class="' + className + " " + iconName + '"><span class="path1"></span><span class="path2"></span></span>';
                    },
                    nextButton: '#imageSwiper .swiper-button-next',
                    prevButton: '#imageSwiper .swiper-button-prev'
                });
                $('#infoSwiper .swiper-pagination-switch').each(function(index, item){
                    $(item).css('background-image', 'url('+paginationImages[index]+')');
                });

                // $('#imageSwiper .swiper-pagination-switch').each(function(index, item){
                //     $(item).append('<span class="path1"></span><span class="path2"></span>');
                // });
                $('#infoSwiper .swiper-button-prev').on('click', function(){
                    popeBannerSwiper.swipePrev();
                });
                $('#infoSwiper .swiper-button-next').on('click', function(){
                    popeBannerSwiper.swipeNext();
                });

                $('#imageSwiper .swiper-button-prev').on('click', function(){
                    popebigBannerSwiper.swipePrev();
                });
                $('#imageSwiper .swiper-button-next').on('click', function(){
                    popebigBannerSwiper.swipeNext();
                });
            }, 1000);
        });
    });

    function shouPope() {

        var protitlehtml = '<div class="protitle">' +
            '<div class="prolistcontainer">' +
            '<div class="row">' +
            '<div class="marigntoppope">' +
            '<div class="popeswiper left">' +
            '<div class="popBannerBox">' +
            '<div class="swiper-container popeBannerSwiper" id="infoSwiper">' +
            '<div class="swiper-wrapper">' +
            '<div class="swiper-slide" style="background-image:url(../../../images/protitleimg.png);"></div>' +
            '<div class="swiper-slide" style="background-image:url(../../../images/protitleimg.png);"></div>' +
            '<div class="swiper-slide" style="background-image:url(../../../images/protitleimg.png);"></div>' +
            '<div class="swiper-slide" style="background-image:url(../../../images/protitleimg.png);"></div>' +
            '</div>' +
            '<div class="swiper-pagination"></div>' +
            '<div class="swiper-button-prev icon-arrow-left"></div>' +
            '<div class="swiper-button-next icon-arrow-right"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="popeswiper right">' +
            '<div class="poperemark">' +
            '<div class="remarktitle">ML999CCW Flamingo 特别款' +
            '<span>￥1600</span>' +
            '</div>' +
            '<hr/>' +
            '<div class="remarkcontent">' +
            '自1897年起，历经118年的波士顿马拉松年年举办从未间断，是世界上最古老的城市马拉松，更是众多跑者梦寐以求的殿堂它的历史就像蓝色一样稳重沉静内敛。 此版本正是以其蓝色为灵感，配以灰色，同时在细节上做足文章向其悠久的文化底蕴和运动生机致以敬意。' +
            '</div>' +
            '<hr/>' +
            '<div class="remarkmore">' +
            '<a href="javascript:;">更多详情＞</a>' +
            '<span>' +
            '<a href="javascript:;"><img src="../../../images/tianmao.png" border="0" alt=""/></a>' +
            '</span>' +
            '<span>' +
            '<a href="javascript:;"><img src="../../../images/jd.png" border="0" alt=""/></a>' +
            '</span>' +
            '<span>' +
            '<a href="javascript:;"><img src="../../../images/yhd.png" border="0" alt=""/></a>' +
            '</span>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';


        var popebananerhtml = '<div class="popebananer">' +
            '<div class="swiper-container popebigBannerSwiper" id="imageSwiper">' +
            '<div class="swiper-wrapper">' +
            '<div class="swiper-slide"><img src="../../../images/popebananer.png" border="0" alt=""/></div>' +
            '<div class="swiper-slide"><img src="../../../images/popebananer.png" border="0" alt=""/></div>' +
            '<div class="swiper-slide"><img src="../../../images/popebananer.png" border="0" alt=""/></div>' +
            '<div class="swiper-slide"><img src="../../../images/popebananer.png" border="0" alt=""/></div>' +
            '</div>' +
            '<div id="bigpagination" class="swiper-pagination"></div>' +
            '<div id="bigprev" class="swiper-button-prev icon-arrow-left"></div>' +
            '<div id="bignext" class="swiper-button-next icon-arrow-right"></div>' +
            '</div>' +
            '</div>';


        var phtml = '<div class="propope">' +
            '<div class="quickview-arrow"></div>' +
            '<div class="popeclosed icon-close-thin"></div>' +
            '<div class="popeloading"><span></span></div>' +
            '<div class="popedone">' + protitlehtml + popebananerhtml + '</div>' +
            '</div>';

        return phtml;
    }
});

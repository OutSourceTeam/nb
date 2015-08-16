define([
    'jquery',
    'swiper',
    '../../common/header/index',
    '../../common/footer/index',
    'less!./productList'
], function ($, Swiper) {


    $('#features').hover(function () {
        $(this).find('.gonnemeun').show();
    }, function () {
        $(this).find('.gonnemeun').hide();
    })

    var ispropopeshou = false, ispopeloading = false, ispopedone = false;

    $('.showpope').each(function (index, item) {
        var $item = $(item)
        $item.on('click', function (e) {
            if (ispropopeshou && e.target.className.indexOf('popeclosed') == -1)  return false;
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

            var row = $('<div class="row quickview-spacer" style="height:180px"></div>');

            $this.parent('div').after(row)

            var quickview = $('.quickview-spacer');

            if (!ispropopeshou) {
                ispropopeshou = true
                $propope.slideDown();

            } else {

                if (e.target.className.indexOf('popeclosed') != -1) {
                    ispropopeshou = false;
                    quickview.slideUp().remove();
                    $propope.slideUp().remove();
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
                    quickview.css('height', popedone.height())
                } else {
                    ispopedone = false
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
                        return '<span class="' + className + " " + iconName + '"><span class="path1"></span><span class="path2"></span></span>';
                    },
                    nextButton: '#imageSwiper .swiper-button-next',
                    prevButton: '#imageSwiper .swiper-button-prev'
                });
            }, 1000);
        })

    })

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
            '<div class="swiper-button-prev icon-arrow-left"></div>' +
            '<div class="swiper-button-next icon-arrow-right"></div>' +
            '</div>' +
            '</div>' +
            '<div class="buyingGuide"></div>' +
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
            '<img src="../../../images/tianmao.png" alt=""/>' +
            '</span>' +
            '<span>' +
            '<img src="../../../images/jd.png" alt=""/>' +
            '</span>' +
            '<span>' +
            '<img src="../../../images/yhd.png" alt=""/>' +
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
            '<div class="swiper-slide" style="background-image:url(../../../images/popebananer.png);"></div>' +
            '<div class="swiper-slide" style="background-image:url(../../../images/popebananer.png);"></div>' +
            '<div class="swiper-slide" style="background-image:url(../../../images/popebananer.png);"></div>' +
            '<div class="swiper-slide" style="background-image:url(../../../images/popebananer.png);"></div>' +
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

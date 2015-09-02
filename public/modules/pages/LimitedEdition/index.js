define([
    'jquery',
    'swiper',
    '../../common/header/index',
    '../../common/footer/index',
    'less!./limitedEdition'
], function ($, swiper) {



    var deviceWidth = $(window).width();
    var deviceHeight = $(window).height();
    var bannerMarginTop = 0 - (deviceWidth * 1080 / 1920 - deviceHeight) / 2;
    var banner = $('#limitedEdition-banner');
    banner.find('a.btn').height(deviceHeight);
    banner.find('div').height(deviceWidth / 1920 * 1080);
    banner.find('img').css('width', deviceWidth).height(deviceWidth / 1920 * 1080);
    $('#empty').height(deviceHeight);
    banner.height(deviceHeight);

    $('#limitedEdition-banner a.btn_blue').hover(function () {
        $('#limitedEdition-banner div.blue').stop(true).animate({
            width: '100%'
        }, 500)
        $('#limitedEdition-banner div.red').stop(true).animate({
            width: 0
        }, 500)
    }, function () {
        $('#limitedEdition-banner div.red').stop(true).animate({
            width: '100%'
        }, 500)
        $('#limitedEdition-banner div.blue').stop(true).animate({
            width: '0%'
        }, 500)
    }).click(function () {
        //$('#red').hide();
        //$('#blue').show();
        $('body, html').stop(true).animate({
            scrollTop: deviceHeight
        }, 500, function () {
            $('#empty').hide();
            $('body, html').scrollTop(0);
        });

    });

    $('#limitedEdition-banner a.btn_red').hover(function () {
        $('#limitedEdition-banner div.red').stop(true).animate({
            width: '100%'
        }, 500)
        $('#limitedEdition-banner div.blue').stop(true).animate({
            width: 0
        }, 500)
    }, function () {
        $('#limitedEdition-banner div.red').stop(true).animate({
            width: '100%'
        }, 500)
        $('#limitedEdition-banner div.blue').stop(true).animate({
            width: '0%'
        }, 500)
    }).click(function () {
            $('#red').show();
            banner.hide();
            $('body, html').stop(true).animate({
                scrollTop: deviceHeight
            }, 500, function () {
                $('#empty').hide();
                $('body, html').scrollTop(0);
            });
        });




});

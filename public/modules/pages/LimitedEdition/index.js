define([
    'jquery',
    'swiper',
    '../../common/header/index',
    '../../common/footer/index',
    'less!./limitedEdition'
], function ($, swiper) {



    var deviceWidth = $(window).width();
    var deviceHeight = $(window).height()-56;
    var banner = $('#limitedEdition-banner');
    banner.find('a.btn').height(deviceHeight);
    banner.find('div').height(deviceWidth / deviceWidth * deviceHeight);
    banner.find('img').css('width', deviceWidth).height(deviceWidth / deviceWidth * deviceHeight);
    $('#empty').height(deviceHeight);
    banner.height(deviceHeight);
    var blueIsshow = false,redIsshow=false;
    $('#limitedEdition-banner a.btn_blue').click(function () {
         if(blueIsshow==false){
             $('#limitedEdition-banner div.blue').stop(true).animate({
                 width: '100%'
             }, 500)
             $('#limitedEdition-banner div.red').stop(true).animate({
                 width: 0
             }, 500)
             blueIsshow=true
             $(this).css('opacity',0);
         }else{
             $('#limitedEdition-banner div.red').stop(true).animate({
                 width: '100%'
             }, 500)
             $('#limitedEdition-banner div.blue').stop(true).animate({
                 width: '0%'
             }, 500)
             blueIsshow=false
         }

    });

    $('#limitedEdition-banner a.btn_red').click(function () {
        if(blueIsshow) return false
        if(redIsshow==false){
            $('body, html').css('overflow','auto')
            $('#limitedEdition-banner div.red').stop(true).animate({
                width: '100%'
            }, 500)
            $('#limitedEdition-banner div.blue').stop(true).animate({
                width: 0
            }, 500)
            $('#red').show();
            banner.hide();
            $('body, html').stop(true).animate({
                scrollTop: deviceHeight
            },0, function () {
                $('#empty').hide();
                $('body, html').scrollTop(0);
            });
            redIsshow=true;
        }else{
            $('#limitedEdition-banner div.red').stop(true).animate({
                width: '100%'
            }, 500)
            $('#limitedEdition-banner div.blue').stop(true).animate({
                width: '0%'
            }, 500)
            $('#red').hide();
            $('body,html').css('overflow','hidden')
            banner.show();
            redIsshow=false;
        }


        });


    $('#limitedEdition-banner a').hover(function () {
        if(blueIsshow) return false
        $(this).css('opacity',.05)
    }, function () {
        $(this).css('opacity',0);
    })



    $(window).on('resize', function (){
        var deviceWidth = $(window).width();
        var deviceHeight = $(window).height()-56;
        var banner = $('#limitedEdition-banner');
        banner.find('a.btn').height(deviceHeight);
        banner.find('div').height(deviceWidth / deviceWidth * deviceHeight);
        banner.find('img').css('width', deviceWidth).height(deviceWidth / deviceWidth * deviceHeight);
        $('#empty').height(deviceHeight);
        banner.height(deviceHeight);

    })

});

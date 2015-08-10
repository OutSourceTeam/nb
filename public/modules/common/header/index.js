define(['less!./header'],function() {

    (function () {

        $('.header_meun li').hover(function () {
            $(this).addClass('hover_meun');
        }, function () {
            $(this).removeClass('hover_meun');
        })


    })()



});


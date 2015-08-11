define(['less!./header'],function() {

    (function () {

        $('.header_meun li').hover(function () {
            $(this).children('span').addClass('hover_meun');
            $(this).children('.category_expand').show()
        }, function () {
            $(this).children('span').removeClass('hover_meun');
            $(this).children('.category_expand').hide()
        })


    })()



});


define([
    'jquery',
    '../../common/mheader/index',
    'less!./mlimitedEdition'
], function ($) {

    var index = $('#index'),
        jijiang = $('#jijiang'),
        jidian = $('#jidian'),
        jmore = index.find('.jmore'),
        toTop = $('.top-btn'),
        fmore = index.find('.fmore');
        jmore.on('click', function () {
            index.hide();
            jidian.css('overflow','hidden').hide();
            jijiang.show();
            toTop.show()
            jijiang.scrollTop(0);
        });
        fmore.on('click', function () {
            index.hide();
            jijiang.hide();
            jidian.css('overflow','auto').show();
            toTop.show()
            jidian.scrollTop(0);
        })

        toTop.on('click', function () {
            index.show();
            jijiang.hide();
            jidian.hide();
            toTop.hide()
        })


});

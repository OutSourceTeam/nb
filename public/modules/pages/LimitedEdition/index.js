define([
    'jquery',
    '../../common/header/index',
    '../../common/footer/index',
    'less!./limitedEdition'
], function ($) {
    var leftIsshow = false,rightIsshow=false;
    var banner = $('#limitedEdition-banner');

    var left = banner.find('.left-panle')
    var leftBtn = left.find('.bnt')
    var leftlayer = left.find('.layer')
    var right = banner.find('.right-panle')
    var righttBtn = right.find('.bnt')
    var rightlayer = right.find('.layer')


    leftBtn.on('click',function () {
        hasleftpanle('btn')
    })

    leftlayer.on('click',function () {
        hasleftpanle('layer')
    })


    leftBtn.hover(function () {
        leftlayer.css('opacity',.05)
    }, function () {
        leftlayer.css('opacity',0)
    })
    leftlayer.hover(function () {
        leftlayer.css('opacity',.05)
    }, function () {
        leftlayer.css('opacity',0)
    })


    righttBtn.on('click',function () {
        hasrightpanle('have')
    })
    //rightlayer.on('click',function () {
    //    hasrightpanle('layer')
    //})



    righttBtn.hover(function () {
        rightlayer.css('opacity',.05)
    }, function () {
        rightlayer.css('opacity',0)
    })
    rightlayer.hover(function () {
        rightlayer.css('opacity',.05)
    }, function () {
        rightlayer.css('opacity',0)
    })


    setBtnPos(banner)

    $(window).on('resize', function () {
        setBtnPos(banner)

    })


    function setBtnPos(banner) {
        var h = banner.find('.half-pic-bj').height();
        var bh = leftBtn.height();
        var w = banner.find('.half-pic-bj').width();
        leftBtn.css({
            left: (w / 2.8),
            top: (h / 1.4 - bh)
        })
        var w = banner.find('.right-panle .half-pic-bj').width();
        righttBtn.css({
            left: w + w / 2.7,
            top: (h / 1.4 - bh)
        })
    }

    function hasleftpanle(type){
        if(type=='btn'){
            if(leftIsshow) return false
            var $this = $(this);
            left.find('.half-pic-bj').hide()
            leftBtn.hide()
            left.css('width','100%')
            leftlayer.stop(true).animate({width: '100%'}, 500)
            right.hide()
            left.find('.full-pic-bj').show()
            leftIsshow=true
        }else if(type=='layer'){
            if(!leftIsshow) return false
            var $this = $(this);
            left.find('.half-pic-bj').show()
            leftBtn.show()
            left.css('width','50%')
            leftlayer.stop(true).animate({width: '50%'}, 500)
            right.show()
            left.find('.full-pic-bj').hide()
            leftIsshow=false
        }else if(type=='have'){
            $('body, html').css('overflow','auto')
            banner.hide()
            $('#red').show();
        }

    }
    function hasrightpanle(type){
        if(type=='btn'){
            if(rightIsshow) return false
            var $this = $(this);
            right.find('.half-pic-bj').hide()
            righttBtn.hide()
            right.css('width','100%')
            rightlayer.stop(true).animate({width: '100%'}, 1000)
            left.hide()
            right.find('.full-pic-bj').show()
            rightIsshow=true
        }else if(type=='layer'){
            if(!rightIsshow) return false
            var $this = $(this);
            right.find('.half-pic-bj').show()
            righttBtn.show()
            right.css('width','50%')
            rightlayer.stop(true).animate({width: '50%'}, 500)
            left.show()
            right.find('.full-pic-bj').hide()
            rightIsshow=false
        }else if(type=='have'){
            $('body, html').css('overflow','auto')
            banner.hide()
            $('#red').show();
        }

    }

});

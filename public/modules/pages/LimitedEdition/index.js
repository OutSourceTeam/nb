define([
    'jquery',
    '../../common/header/index',
    '../../common/footer/index',
    'less!./limitedEdition'
], function ($) {
    var leftIsshow = false,rightIsshow=false;
    var banner = $('#limitedEdition-banner');
    var toTop = $('.top-btn');
    var isshowPanle = parseInt(getQueryString('isshowPanle'))|| 2;
    var left = banner.find('.left-panle')
    var leftBtn = left.find('.bnt')
    var leftlayer = left.find('.layer')
    var right = banner.find('.right-panle')
    var righttBtn = right.find('.bnt')
    var rightlayer = right.find('.layer')
    var red = $('#red');

    if(isshowPanle==2){
        showPanle()
    }else{
        toTopCahng('gotop')
    }


    function showPanle(){
        leftBtn.on('click',function () {
            hasleftpanle('btn')

        })

        leftBtn.hover(function () {
            if(leftIsshow==false){
                leftlayer.css('opacity',.05)
            }
        }, function () {
            if(leftIsshow==false){
                leftlayer.css('opacity',0)
            }
        })
        leftlayer.hover(function () {
            if(leftIsshow==false){
                leftlayer.css('opacity',.05)
            }
        }, function () {
            if(leftIsshow==false){
                leftlayer.css('opacity',0)
            }
        })


        righttBtn.on('click',function () {
            hasrightpanle('have')
        })




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
    }

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
            right.hide()
            left.find('.full-pic-bj').show()
            leftlayer.css({'width':'0%','opacity':.05}).stop(true).animate({width: '100%'},500)
            leftIsshow=true
            toTopCahng('showleftpanle','btn')
        }else if(type=='layer'){
            if(!leftIsshow) return false
            var $this = $(this);
            left.find('.half-pic-bj').show()
            leftBtn.show()
            left.css('width','50%')
            //leftlayer.stop(true).animate({width: '50%'}, 500)
            right.show()
            left.find('.full-pic-bj').hide()
            leftIsshow=false
        }else if(type=='have'){
            $('body, html').css('overflow','auto')
            banner.hide()
            red.show();
            toTopCahng('showleftpanle','have')

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
            right.find('.full-pic-bj').slideDown().show()
            rightIsshow=true
            toTopCahng('showrightpanle','btn')
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
            red.show();
            toTopCahng('showrightpanle','have')
        }

    }
    //根据 url 的名字 获得 值
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    }

    function toTopCahng(type,typename){
        if(type=='showleftpanle' && typename=='btn'){
            toTop.off()
            toTop.show()
            toTop.on('click', function () {
                hasleftpanle('layer')
                toTop.hide()
            })

        }else if(type=='showleftpanle' && typename=='have'){
            toTop.off()
            toTop.show()
            toTop.on('click', function () {
                $('body, html').css('overflow','hidden')
                red.hide();
                banner.show()
                toTop.hide()
            })
        }else if(type=='showrightpanle' && typename=='btn'){
            toTop.off()
            toTop.show()
            toTop.on('click', function () {
                hasrightpanle('layer')
                toTop.hide()
            })
        }else if(type=='showrightpanle' && typename=='have'){
            toTop.off()
            toTop.show()
            toTop.on('click', function () {
                $('body, html').css('overflow','hidden')
                red.hide();
                banner.show()
                toTop.hide()

            })
        }else if(type=='gotop'){
            $('body, html').css('overflow','initial')
            banner.hide()
            red.show()
        }



    }

});

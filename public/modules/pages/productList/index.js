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
    });

    var ispropopeshou = false,
        ispopeloading = false,
        ispopedone = false,
        prevTop;
    $('.chilemeun li').on('click', function () {
        var $icon = $(this).find('.iconSort');
        if ($icon.hasClass('icon-up')) {
            $icon.removeClass('icon-up').addClass('icon-down');
            //do something
        } else {
            $icon.removeClass('icon-down').addClass('icon-up');
            //do something
        }
    });
    var popeBannerSwiper,
        popebigBannerSwiper;

    $('.product').on('click', function (e) {
        var $item = $(this);
        var prevHeight = $item.height();
        if (ispropopeshou && (e.target.className == 'buyingGuide' || e.target.className == 'ablack')) {
            return true;
        } else if (ispropopeshou && e.target.className.indexOf('popeclosed') == -1) {
            return false;
        }
        var $this = $(this)

        if (ispropopeshou && e.target.className.indexOf('popeclosed') != -1) {
            var $propope = $this.find('.propope');
                ispropopeshou = false
                ispopeloading = false
                ispopedone = false
            var timing = 200;
            $propope.animate({height: 0}, timing, function () {
                $('#infoSwiper .swiper-button-prev').off();
                $('#infoSwiper .swiper-button-next').off();
                $('#imageSwiper .swiper-button-prev').off();
                $('#imageSwiper .swiper-button-next').off();
                $propope.remove();
            });
            $this.animate({'height': 284}, timing).removeClass('active');
            $("body, html").animate({scrollTop: prevTop}, timing);
            return false;
        }
        var proid = $this.data('id');

        var phtml = '<div class="propope">' +
            '<div class="quickview-arrow"></div>' +
            '<div class="popeclosed icon-close-thin"></div>' +
            '<div class="popeloading"><span></span></div>' +
            '<div class="popedone"></div></div>';

        $this.append(phtml);

        var pos = $this.offset();
        pos = $this.width() / 2 + pos.left;
        var $propope = $this.find('.propope');
        var quickview = $propope.find('.quickview-arrow');
        var popeloading = $propope.find('.popeloading');
        quickview.css('left', pos);
          $propope.show();
         popeloading.show();

        getProductinfo(proid,$this,prevHeight,e,popeloading);

    })

    function getProductinfo(id,$this,prevHeight,e,popeloading) {
        $.ajax({
            method: "GET",
            url: 'http://test.newbalance.com.cn/index.php?s=/Home/Index/ajaxproductinfo/id/'+id
        }).done(function (msg) {
            console.log(msg)
            popeloading.hide();
            shouPope(msg,$this,prevHeight,e)
        }).fail(function (msg) {
            console.log(msg)
        });
    }


    function shouPope(data,$this,prevHeight,e) {

        var popedone = $this.find('.popedone');
        var imgpath = data.imgpath;

        var data= data.data;


        var titeimg ='',bigimg = '',buyingGuide='',isShowPrice='',tianmaolin='',jinDongLink='',yiHaoDianLink='';

        $.each(data.colorList, function (n,item){
            titeimg+= '<div class="swiper-slide" style="background-image:url('+imgpath+item.big_img+');"></div>'
        })
        $.each(data.colorImgList, function (n,item){
            bigimg+= '<div class="swiper-slide" style="background-image:url('+imgpath+item.img+');"></div>'
        })
        if(data.isSelectionShoes=="1"){
            buyingGuide ='<div><a class="buyingGuide" href="http://shoeadvisor.newbalance.com.cn" target="_blank">&nbsp;</a></div>';
        }
        if(data.isShowPrice=="1"){
            isShowPrice ='<span>￥'+data.price+'</span>';
        }
        if(data.tianMaoLink && data.tianMaoLink!=""){
            tianmaolin='<span><a href="'+data.tianMaoLink+'" target="_blank"><img  class="ablack" src="../../../images/tianmao.png" border="0" alt=""/></a></span>'
        }
        if(data.jinDongLink && data.jinDongLink!=""){
            jinDongLink='<span><a href="'+data.jinDongLink+'" target="_blank"><img  class="ablack" src="../../../images/jd.png" border="0" alt=""/></a></span>'
        }
        if(data.yiHaoDianLink && data.yiHaoDianLink!=""){
            yiHaoDianLink='<span><a href="'+data.yiHaoDianLink+'" target="_blank"><img  class="ablack" src="../../../images/yhd.png" border="0" alt=""/></a></span>'
        }

        var protitlehtml = '<div class="protitle">' +
            '<div class="prolistcontainer">' +
            '<div class="row">' +
            '<div class="marigntoppope">' +
            '<div class="popeswiper left">' +
            '<div class="popBannerBox">' +
            '<div class="swiper-container popeBannerSwiper" id="infoSwiper">' +
            '<div class="swiper-wrapper">' +titeimg+'</div>' +
            '<div class="swiper-pagination"></div>' +
            '<div class="swiper-button-prev icon-arrow-left"></div>' +
            '<div class="swiper-button-next icon-arrow-right"></div>' +
            '</div>'+'</div>' +buyingGuide +'</div>' +
            '<div class="popeswiper right">' +
            '<div class="poperemark">' +
            '<div class="remarktitle">'+data.model + data.seriesSize + data.name+isShowPrice+'</div>' +
            '<hr/>' +
            '<div class="remarkcontent">' +data.introduction+'</div>' +
            '<hr/>' +
            '<div class="remarkmore">' +
            '<a class="ablack" href="'+data.mainProductsLink+'" target="_blank">更多详情＞</a>'+tianmaolin+jinDongLink+yiHaoDianLink+
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';


        var popebananerhtml = '<div class="popebananer">' +
            '<div class="swiper-container popebigBannerSwiper" id="imageSwiper">' +
            '<div class="swiper-wrapper">' +bigimg+'</div>' +
            '<div id="bigpagination" class="swiper-pagination"></div>' +
            '<div id="bigprev" class="swiper-button-prev icon-arrow-left"></div>' +
            '<div id="bignext" class="swiper-button-next icon-arrow-right"></div>' +
            '</div>' +
            '</div>';


        popedone.append(protitlehtml+popebananerhtml);

        showProdectinfo($this,data,prevHeight,e,imgpath)
    }



    function showProdectinfo($this,data,prevHeight,e,imgpath){
        var $propope = $this.find('.propope');
        var popedone = $this.find('.popedone');
        var popeclosed = $this.find('.popeclosed');
        if (!ispropopeshou) {
            ispropopeshou = true;
            prevTop = $(window).scrollTop();
            $propope.css('display', 'block');
            var offsetTop = Math.abs($propope.offset().top - 120);
            var timing = 300;

            $("body, html").animate({scrollTop: offsetTop}, timing);

            $this.animate({'height': prevHeight + 200}, timing).addClass('active');
            $propope.animate({'height': 200}, timing);

        }
        setTimeout(function () {
            if (!ispopedone) {
                ispopedone = true
                popedone.fadeIn();
                $this.css('height', prevHeight + popedone.height() + 40);
            } else {
                ispopedone = false
                popedone.fadeOut();
            }

            popeBannerSwiper = new Swiper('#infoSwiper', {
                loop: true,
                speed: 300,
                pagination: '#infoSwiper .swiper-pagination',
                paginationClickable: true,
                nextButton: '#infoSwiper .swiper-button-next',
                prevButton: '#infoSwiper .swiper-button-prev',
                paginationBulletRender: function (index, className) {
                    return '<span class="' + className + '" style="background-image: url(' + imgpath+data.colorList[index].color_img + ')"></span>';
                },
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
            $('#infoSwiper .swiper-pagination-switch').each(function (index, item) {
                $(item).css('background-image', 'url(' + imgpath+data.colorList[index].color_img + ')');
            });

            // $('#imageSwiper .swiper-pagination-switch').each(function(index, item){
            //     $(item).append('<span class="path1"></span><span class="path2"></span>');
            // });
            $('#infoSwiper .swiper-button-prev').on('click', function () {
                popeBannerSwiper.swipePrev();
            });
            $('#infoSwiper .swiper-button-next').on('click', function () {
                popeBannerSwiper.swipeNext();
            });

            $('#imageSwiper .swiper-button-prev').on('click', function () {
                popebigBannerSwiper.swipePrev();
            });
            $('#imageSwiper .swiper-button-next').on('click', function () {
                popebigBannerSwiper.swipeNext();
            });
        }, 100);
    }
});

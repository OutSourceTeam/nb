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

        if (ispropopeshou && e.target.className.indexOf('popeclosed') != -1) {
            removePope();
            return false;
        }


        if (ispropopeshou && (e.target.className == 'buyingGuide' || e.target.className == 'ablack')) {
            return true;
        } else if (ispropopeshou && (e.target.className=='maiginbtn'
            || e.target.className=='imgpos'
            || e.target.className=='prono'
            || e.target.className=='pro'
        )) {
            removePope();
            addPope($item,e);
            return true;
        }else if (ispropopeshou && e.target.className.indexOf('popeclosed') == -1) {
            return false;
        }

        addPope($item,e);
    })
    function addPope($item,e) {
        var $this = $item;
        var prevHeight = $this.height();
        var proid = $this.data('id');
        if (proid == undefined || proid == null || proid == "") {
            return false;
        }
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

        getProductinfo(proid, $this, prevHeight, e, popeloading);
    }


    function removePope(){
        var $propope = $('.product').find('.propope');
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
        $propope.parent('li').animate({'height': 284}, timing).removeClass('active');
        $("body, html").animate({scrollTop: prevTop}, timing);
    }
    function getProductinfo(id, $this, prevHeight, e, popeloading) {
        $.ajax({
            method: "GET",
            url: '/index.php?s=/Home/Index/ajaxproductinfo/id/' + id
        }).done(function (msg) {
            popeloading.hide();
            shouPope(msg, $this, prevHeight,id, e)
        }).fail(function (msg) {
        });
    }

    function getProductColorIndex(id,data){
        var rid = -1;
        if(data.length != 0){
            $.each(data,function(i){
                if(id == data[i]['id']){
                    rid = i;
                    return false
                }
            });
            return rid;
        }
        return rid;
    }

    function shouPope(data, $this, prevHeight,proid, e) {

        var popedone = $this.find('.popedone');
        var imgpath = data.imgpath;

        var datas = data.data;

        if(datas.length != 0){
            var colorIndex = getProductColorIndex(proid,datas);
            if(colorIndex == -1) return false;
            var data = datas[colorIndex];
            var titeimg = '', bigimg = '', buyingGuide = '', isShowPrice = '', tianmaolin = '', jinDongLink = '', yiHaoDianLink = '',spbtn='',tspbtn='',mainProductsLink='';
            if (data) {
                $.each(datas, function (n, item) {
                    titeimg += '<div class="swiper-slide" style="background-image:url(' + imgpath + item.image + ');"></div>'
                })
            }
            if (data.colorImgList) {
                $.each(data.colorImgList, function (n, item) {
                    if(item.img)
                    bigimg += '<div class="swiper-slide" style="background-image:url(' + imgpath + item.img + ');"></div>'
                })
            }
            if (data.isSelectionShoes == "1") {
                buyingGuide = '<div><a class="buyingGuide" href="http://shoeadvisor.newbalance.com.cn" target="_blank">&nbsp;</a></div>';
            }
            if (data.isShowPrice == "1") {
                isShowPrice = '<span class="shoePrice">￥' + data.price + '</span>';
            }
            if (data.tianMaoLink && data.tianMaoLink != "") {
                tianmaolin = '<span><a href="' + data.tianMaoLink + '" target="_blank" onclick="' + data.tianMaoTracking + '"><img  class="ablack" src="../../../images/tianmao.png" border="0" alt=""/></a></span>'
            }
            if (data.jinDongLink && data.jinDongLink != "") {
                jinDongLink = '<span><a href="' + data.jinDongLink + '" target="_blank" onclick="' + data.jinDongTracking + '"><img  class="ablack" src="../../../images/jd.png" border="0" alt=""/></a></span>'
            }
            if (data.yiHaoDianLink && data.yiHaoDianLink != "") {
                yiHaoDianLink = '<span><a href="' + data.yiHaoDianLink + '" target="_blank" onclick="' + data.yiHaoDianTracking + '"><img  class="ablack" src="../../../images/yhd.png" border="0" alt=""/></a></span>'
            }
            if(datas && datas.length>1){
                spbtn= '<div class="swiper-button-prev icon-arrow-left"></div>'+'<div class="swiper-button-next icon-arrow-right"></div>'
            }
            if(data.colorImgList && data.colorImgList.length>1){
                tspbtn= '<div id="bigprev" class="swiper-button-prev icon-arrow-left"></div>'+'<div id="bignext" class="swiper-button-next icon-arrow-right"></div>'
            }
            if(data.mainProductsLink!=""){
                mainProductsLink= '<a class="ablack" href="' + data.mainProductsLink + '" target="_blank">更多详情＞</a>'
            }
            var protitlehtml = '<div class="protitle">' +
                '<div class="prolistcontainer">' +
                '<div class="row">' +
                '<div class="marigntoppope">' +
                '<div class="popeswiper left">' +
                '<div class="popBannerBox">' +
                '<div class="swiper-container popeBannerSwiper" id="infoSwiper">' +
                '<div class="swiper-wrapper">' + titeimg + '</div>' +
                '<div class="swiper-pagination"></div>'+ spbtn +
                '</div>' + '</div>' + buyingGuide + '</div>' +
                '<div class="popeswiper right">' +
                '<div class="poperemark">' +
                '<div class="remarktitle"><span class="shoeSize">' + data.model + '</span>' + isShowPrice + '</div>' +
                '<hr/>' +
                '<div class="remarkcontent">' + ((data.introduction === '' || !data.introduction) ? data.name : data.introduction) + '</div>' +
                '<hr/>' +
                '<div class="remarkmore">' +
                mainProductsLink+ tianmaolin + jinDongLink + yiHaoDianLink +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';


            var popebananerhtml = '<div class="popebananer">' +
                '<div class="swiper-container popebigBannerSwiper" id="imageSwiper">' +
                '<div class="swiper-wrapper">' + bigimg + '</div>' +
                '<div id="bigpagination" class="swiper-pagination"></div>' + tspbtn +
                '</div>' +
                '</div>';

            if (data.colorImgList == null || data.colorImgList == undefined || bigimg == '') {
                popebananerhtml = "";
            }

            popedone.append(protitlehtml + popebananerhtml);
            showProdectinfo($this, datas, prevHeight, e, imgpath,colorIndex)
        }
    }


    function showProdectinfo($this, datas, prevHeight, e, imgpath,colorIndex) {
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
            
            $this.animate({'height': prevHeight + popedone.height()+ 40}, timing).addClass('active');
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
           var popeBannerSwiper = new Swiper('#infoSwiper', {
                loop: true,
                speed: 300,
                initialSlide: colorIndex,
                pagination: '#infoSwiper .swiper-pagination',
                paginationClickable: true,
                nextButton: '#infoSwiper .swiper-button-next',
                prevButton: '#infoSwiper .swiper-button-prev',
                paginationBulletRender: function (index, className) {
                    var colorimg  = ""
                    if(datas[index] && datas[index].color_image){
                        colorimg = datas[index].color_image;
                    }
                    return '<span class="' + className + '" style="background-image: url(' + imgpath +colorimg+ ')"></span>';
                },
                onSlideChangeEnd:function(swiper){
                    var curindex  = swiper.activeLoopIndex;
                    var data = datas[curindex];
                    var tianmaolin = "",jinDongLink = "",yiHaoDianLink = "",mainProductsLink = "";
                    if (data.colorImgList != undefined) {
                        var datas1=  data.colorImgList;
                        changeSwiperBigImg(datas1,imgpath,popebigBannerSwiper)
                    }if(data && data.model){
                        $('.shoeSize').text(data.model);
                    }
                    if(data && data.price){
                        $('.shoePrice').text('￥' + data.price);
                    }
                    if(data && data.introduction){
                        $('.remarkcontent').html(((data.introduction === '' || !data.introduction) ? data.name : data.introduction));
                    }

                    if(data && data.tianMaoLink && data.tianMaoLink != ""){
                        tianmaolin = '<span><a href="' + data.tianMaoLink + '" target="_blank" onclick="' + data.tianMaoTracking + '"><img  class="ablack" src="../../../images/tianmao.png" border="0" alt=""/></a></span>'
                    }
                    if (data.jinDongLink && data.jinDongLink != "") {
                        jinDongLink = '<span><a href="' + data.jinDongLink + '" target="_blank" onclick="' + data.jinDongTracking + '"><img  class="ablack" src="../../../images/jd.png" border="0" alt=""/></a></span>'
                    }
                    if (data.yiHaoDianLink && data.yiHaoDianLink != "") {
                        yiHaoDianLink = '<span><a href="' + data.yiHaoDianLink + '" target="_blank" onclick="' + data.yiHaoDianTracking + '"><img  class="ablack" src="../../../images/yhd.png" border="0" alt=""/></a></span>'
                    }
                    if(data.mainProductsLink!=""){
                        mainProductsLink= '<a class="ablack" href="' + data.mainProductsLink + '" target="_blank">更多详情＞</a>'
                    }

                    $('.remarkmore').html(mainProductsLink + tianmaolin + jinDongLink + yiHaoDianLink);
                }
            });
           var  popebigBannerSwiper = new Swiper('#imageSwiper', {
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
                var colorimg  = ""
                if (datas[index].color_image == null || datas[index].color_image == null) {
                   return false
                }
                if(datas[index].color_image){
                    colorimg = datas[index].color_image;
                    if((index+1)<=datas.length){
                        $(item).css({
                            'background-image': 'url(' + imgpath+colorimg + ')'
                        });
                    }
                }
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
        }, 300);
    }

    function changeSwiperBigImg(data,imgpath,popebigBannerSwiper){

        $('.shoeSize').text(data.sizes);
        popebigBannerSwiper.removeAllSlides();
        if (data) {
            $.each(data, function (n, item) {
                var newSlide = popebigBannerSwiper.createSlide('<div style="background-position: center center;background-repeat: no-repeat;width:100%;height:100%;background-image:url('+imgpath + item.img+')"/>','swiper-slide','div');
                newSlide.append(); //加到slides的最后
            })
        }
        popebigBannerSwiper.swipeTo(0,0,false);
    }

});

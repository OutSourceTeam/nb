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

        addPope($item,e)

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
            url: 'http://test.newbalance.com.cn/index.php?s=/Home/Index/ajaxproductinfo/id/' + id
        }).done(function (msg) {
            popeloading.hide();
            shouPope(msg, $this, prevHeight, e)
        }).fail(function (msg) {
        });
    }


    function shouPope(data, $this, prevHeight, e) {

        var popedone = $this.find('.popedone');
        var imgpath = data.imgpath;

        var data = data.data;


        var titeimg = '', bigimg = '', buyingGuide = '', isShowPrice = '', tianmaolin = '', jinDongLink = '', yiHaoDianLink = '';
        if (data.colorList) {
            $.each(data.colorList, function (n, item) {
                titeimg += '<div class="swiper-slide" style="background-image:url(' + imgpath + item.big_img + ');"></div>'
            })
        }
        if (data.colorImgList) {
            $.each(data.colorImgList, function (n, item) {
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
            tianmaolin = '<span><a href="' + data.tianMaoLink + '" target="_blank"><img  class="ablack" src="../../../images/tianmao.png" border="0" alt=""/></a></span>'
        }
        if (data.jinDongLink && data.jinDongLink != "") {
            jinDongLink = '<span><a href="' + data.jinDongLink + '" target="_blank"><img  class="ablack" src="../../../images/jd.png" border="0" alt=""/></a></span>'
        }
        if (data.yiHaoDianLink && data.yiHaoDianLink != "") {
            yiHaoDianLink = '<span><a href="' + data.yiHaoDianLink + '" target="_blank"><img  class="ablack" src="../../../images/yhd.png" border="0" alt=""/></a></span>'
        }
        var protitlehtml = '<div class="protitle">' +
            '<div class="prolistcontainer">' +
            '<div class="row">' +
            '<div class="marigntoppope">' +
            '<div class="popeswiper left">' +
            '<div class="popBannerBox">' +
            '<div class="swiper-container popeBannerSwiper" id="infoSwiper">' +
            '<div class="swiper-wrapper">' + titeimg + '</div>' +
            '<div class="swiper-pagination"></div>' +
            '<div class="swiper-button-prev icon-arrow-left"></div>' +
            '<div class="swiper-button-next icon-arrow-right"></div>' +
            '</div>' + '</div>' + buyingGuide + '</div>' +
            '<div class="popeswiper right">' +
            '<div class="poperemark">' +
            '<div class="remarktitle"><span class="shoeSize">' + data.seriesSize + '</span>' + isShowPrice + '</div>' +
            '<hr/>' +
            '<div class="remarkcontent">' + ((data.introduction === '' || !data.introduction) ? data.name : data.introduction) + '</div>' +
            '<hr/>' +
            '<div class="remarkmore">' +
            '<a class="ablack" href="' + data.mainProductsLink + '" target="_blank">更多详情＞</a>' + tianmaolin + jinDongLink + yiHaoDianLink +
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
            '<div id="bigpagination" class="swiper-pagination"></div>' +
            '<div id="bigprev" class="swiper-button-prev icon-arrow-left"></div>' +
            '<div id="bignext" class="swiper-button-next icon-arrow-right"></div>' +
            '</div>' +
            '</div>';

        if (data.colorImgList == null || data.colorImgList == undefined) {
            popebananerhtml = "";
        }

        popedone.append(protitlehtml + popebananerhtml);

        showProdectinfo($this, data, prevHeight, e, imgpath)
    }


    function showProdectinfo($this, data, prevHeight, e, imgpath) {
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
                    var colorimg  = ""
                    if (data.colorList == null || data.colorList == undefined) {
                        return false
                    }
                    if(data.colorList[index] && data.colorList[index].color_img){
                        colorimg = data.colorList[index].color_img;
                    }
                    return '<span class="' + className + '" style="background-image: url(' + imgpath +colorimg+ ')"></span>;';
                },
                onSlideChangeEnd:function(swiper){
                    if (data.colorImgList != null || data.colorImgList != undefined) {
                        var curindex  = swiper.activeLoopIndex;
                        var datas=  data.colorList[curindex];
                        changeSwiperBigImg(datas,imgpath,popebigBannerSwiper)
                    }

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
                if (data.colorList == null || data.colorList == undefined) {
                   return false
                }
                if(data.colorList[index] && data.colorList[index].color_img){
                    colorimg = data.colorList[index].color_img;
                }
                $(item).css({
                    'background-image': 'url(' + imgpath+colorimg + ')'
                });
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

    function changeSwiperBigImg(data,imgpath,popebigBannerSwiper){

        var Oimg = $('#imageSwiper');
        $('.shoeSize').text(data.sizes);

        popebigBannerSwiper.removeAllSlides();
        var imghtml = ''
        if (data.colorImgList) {
            $.each(data.colorImgList, function (n, item) {
                var newSlide = popebigBannerSwiper.createSlide('<img style="background-size: cover;background-position: center center;background-repeat: no-repeat;width:100%;height:auto" src="'+imgpath + item.img+'"/>','swiper-slide','div');
                newSlide.append(); //加到slides的最后

            })
        }


    }


});

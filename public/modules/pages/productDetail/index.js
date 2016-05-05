define([
    'jquery',
    'swiper',
    '../../common/header/index',
    '../../common/footer/index',
    'less!./productDetail'
], function ($, Swiper) {

    //根据 url 的名字 获得 值
    function getQueryString(name) {
        var reg = new RegExp("(^|\/)" + name + "\/([^\/]*)(\/|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    }

    var prevTop;
    
    var popeBannerSwiper,
        popebigBannerSwiper;
    
    getProductinfo();

    function getProductinfo() {
        var id = getQueryString('keyword');
        if(!id){
            alert('Error！参数错误！');
            return false;
        }
        $.ajax({
            method: "GET",
            url: '/index.php?s=/Home/Index/ajaxsearchproductinfo/device/pc/seriesSize/' + id
        }).done(function (msg) {
            shouPope(msg)
        }).fail(function (msg) {
        });
    }

    function shouPope(data) {

        var popedone = $('.popedone');
        var imgpath = data.imgpath;

        var datas = data.data;

        if(datas.length != 0){
            var data = datas[0];
            var titeimg = '', bigimg = '', buyingGuide = '', isShowPrice = '', tianmaolin = '', jinDongLink = '', yiHaoDianLink = '',spbtn='',tspbtn='',mainProductsLink='';
            if (data) {
                $.each(datas, function (n, item) {
                    titeimg += '<div class="swiper-slide" style="background-image:url(' + imgpath + item.image + ');"></div>'
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

            if (data.colorImgList == null || data.colorImgList == undefined) {
                
            }

            popedone.append(protitlehtml + popebananerhtml);
            showProdectinfo(datas,imgpath)
            if (data.colorImgList == null || data.colorImgList == undefined) {
               $('.popebananer').hide(); 
            }
        }
    }


    function showProdectinfo(datas,imgpath) {
        
        var popedone = $('.popedone');
        
        
        setTimeout(function () {
            
           var popeBannerSwiper = new Swiper('#infoSwiper', {
                loop: true,
                speed: 300,
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
                    var datas1=  data.colorImgList;
                    changeSwiperBigImg(datas1,imgpath,popebigBannerSwiper)
                    if(data && data.model){
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
        
        if (data) {
            popebigBannerSwiper.removeAllSlides();
            $('.popebananer').show(); 
            $.each(data, function (n, item) {
                var newSlide = popebigBannerSwiper.createSlide('<div style="background-position: center center;background-repeat: no-repeat;width:100%;height:100%;background-image:url('+imgpath + item.img+')"/>','swiper-slide','div');
                newSlide.append(); //加到slides的最后
            })
        }
        else{
            $('.popebananer').hide(); 
        }
        popebigBannerSwiper.swipeTo(0,0,false);
    }
});

define([
    'jquery',
    'swiper',
    '../../common/mheader/index',
    '../../common/mfooter/index',
    'less!./mproductDetail'
], function ($, Swiper) {

    //根据 url 的名字 获得 值
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2]);
        return null;
    }

    var $productDetailPage = $('.productDetailPage'),topBannerSwiper='',
        $swiperwrapper = $productDetailPage.find('.swiper-wrapper'),
        $enTitle = $productDetailPage.find('.enTitle'),
        $chTitle = $productDetailPage.find('.chTitle'),
        $price = $productDetailPage.find('.price'),
        $colorList = $productDetailPage.find('.colorList'),
        $infos = $productDetailPage.find('.infos'),
        $knewMore = $productDetailPage.find('.knewMore'),
        $linkList = $productDetailPage.find('.linkList');


    var pid = getQueryString('id') || 3;


    $.ajax({
        method: "GET",
        url: 'http://test.newbalance.com.cn/index.php?s=/Home/Index/ajaxproductinfo/id/' + pid
    }).done(function (msg) {
        showProductDetail(msg)
    }).fail(function (msg) {
    });


    function showProductDetail(data) {

        var imgpath = data.imgpath;

        var data = data.data;

        addswiperslide(imgpath,data);

        addColorImg(imgpath,data);

        setEnTitle(data)

        setOtherInfo(data)


    }


    function addswiperslide(imgpath,data){
        if(data.colorList==null || data.colorList==undefined) return false;
        var swiperslide = '';
        if (data.colorList) {
            $.each(data.colorImgList, function (n, item) {
                swiperslide += '<div class="swiper-slide"><img src="'+imgpath + item.phoneImg +'"/></div>'
            })
        }
        $swiperwrapper.append(swiperslide);

        topBannerSwiper = new Swiper('.topBannerSwiper', {
            loop: true,
            autoplay: 3000,
            initialSlide: 0,
            pagination: '.topBannerSwiper .swiper-pagination',
            paginationClickable: true,
        });

    }

    function setEnTitle(data){
        $enTitle.text(data.seriesSize || data.sizes)
    }
    function setOtherInfo(data){

        $chTitle.text(data.name)

        if (data.isShowPrice == "1") {
            $price.text('￥'+ data.price);
        }else{
            $price.remove();
        }
        $infos.text(data.introduction)

        if(data.mainProductsLink!=""){
            $knewMore.attr('href',data.mainProductsLink);
        }else{
            $knewMore.hide();
        }

        var links="";

        if (data.tianMaoLink && data.tianMaoLink != "") {
            links+= '<li class="link"><a href="' + data.tianMaoLink + '" target="_blank"><img src="../../../images/tianmao.png" border="0" alt=""/></a></li>'
        }
        if (data.jinDongLink && data.jinDongLink != "") {
            links+= '<li class="link"><a href="' + data.jinDongLink + '" target="_blank"><img src="../../../images/jd.png" border="0" alt=""/></a></li>'
        }
        if (data.yiHaoDianLink && data.yiHaoDianLink != "") {
            links+= '<li class="link"><a href="' + data.yiHaoDianLink + '" target="_blank"><img src="../../../images/yhd.png" border="0" alt=""/></a></li>'
        }
        $linkList.append(links)


    }

    function addColorImg(imgpath,data){
        if(data.colorList==null || data.colorList==undefined) return false;
        var licolorimg = '';
        $.each(data.colorList, function (n, item) {
            if(n==0) {
                licolorimg += '<li class="colorPagination active" data-code="' + n + '" style="background-image:url(' + imgpath + item.color_img + ')"></li>'
            }else{
                licolorimg += '<li class="colorPagination" data-code="'+n+'" style="background-image:url(' + imgpath + item.color_img + ')"></li>'
            }
        })

        $colorList.append(licolorimg);

        $('.colorPagination').on('click', function () {
            $('.colorPagination').removeClass('active');
            $(this).addClass('active');
            var key = $(this).attr('data-code');
            key =parseInt(key);
            changeSwiperBigImg(data,imgpath,key)
        });

    }



    function changeSwiperBigImg(data,imgpath,key){
        data=  data.colorList[key];
        setEnTitle(data);
        topBannerSwiper.removeAllSlides();
        if (data.colorImgList) {
            $.each(data.colorImgList, function (n, item) {
                var newSlide = topBannerSwiper.createSlide('<div style="background-position: center center;background-repeat: no-repeat;width:100%;height:100%;background-image:url('+imgpath + item.phoneImg+')"/>','swiper-slide','div');
                newSlide.append();
            })
        }
        topBannerSwiper.swipeTo(0,0,false);
    }


    //var imgObj = {
    //    '1': [
    //        '../../../images/m_banner.png',
    //        '../../../images/m_detailBanner01.png'
    //    ],
    //    '2': [
    //        '../../../images/m_detailBanner01.png',
    //        '../../../images/m_detailBanner01.png'
    //    ],
    //    '3': [
    //        '../../../images/m_banner.png',
    //        '../../../images/m_banner.png'
    //    ],
    //};
    //$('.colorPagination').on('click', function () {
    //    $('.colorPagination').removeClass('active');
    //    $(this).addClass('active');
    //    var key = $(this).attr('data-code');
    //    console.log(key);
    //    refreshSwiper(imgObj[key]);
    //});
    //
    //function refreshSwiper(imgList) {
    //    var innerHTML = '';
    //    if (!imgList) return;
    //    for (var i = 0; i < imgList.length; i++) {
    //        innerHTML += '<div class="swiper-slide">' + '<img src="' + imgList[i] + '">' + '</div>';
    //    }
    //    topBannerSwiper.removeAllSlides();
    //    topBannerSwiper.appendSlide(innerHTML);
    //    topBannerSwiper.swipeTo(0, 0, false);
    //    //topBannerSwiper.startAutoplay();
    //}
});

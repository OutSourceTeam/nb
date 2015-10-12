define([
    'jquery',
    'swiper',
    '../../common/mheader/index',
    '../../common/mfooter/index',
    'less!./mproductDetail'
], function ($, Swiper) {

    //根据 url 的名字 获得 值
    function getQueryString(name) {
        var reg = new RegExp("(^|\/)" + name + "\/([^\/]*)(\/|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null)return unescape(r[2].replace('.html',''));
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

    var pid = getQueryString('id');
    // if(pid == null){
    //     alert('参数错误');
    //     window.location.href = '/';
    // }

    var fromType = getQueryString('from');
    var keyword = getQueryString('keyword');
    var ajaxUrl = '/index.php?s=/Home/Index/ajaxproductinfo/device/mobile/id/' + pid;
    if(fromType == 'home' && keyword != null){
        ajaxUrl = '/index.php?s=/Home/Index/ajaxsearchproductinfo/device/mobile/seriesSize/' + keyword;
    }

    $.ajax({
        method: "GET",
        url: ajaxUrl
    }).done(function (msg) {
        showProductDetail(msg,pid)
    }).fail(function (msg) {
    });

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

    function showProductDetail(data,id) {
        var imgpath = data.imgpath;
        var datas = data.data;
        var colorIndex = getProductColorIndex(id,datas);
        if(fromType != null) colorIndex = 0;
        addswiperslide(imgpath,datas,colorIndex);
        addColorImg(imgpath,datas,colorIndex);
        setEnTitle(datas,colorIndex);
        setOtherInfo(datas,colorIndex)
    }

    function addswiperslide(imgpath,datas,colorIndex){
        var data = datas[colorIndex];
        if(data == null || data == undefined) return false;
        var swiperslide = '';
        if (data.colorImgList) {
            $.each(data.colorImgList, function (n, item) {
                swiperslide += '<div class="swiper-slide"><img src="'+imgpath + item.phoneImg +'"/></div>'
            })
        }
        $swiperwrapper.append(swiperslide);

        topBannerSwiper = new Swiper('.topBannerSwiper', {
            loop: true,
            initialSlide: 0,
            pagination: '.topBannerSwiper .swiper-pagination',
            paginationClickable: true,
        });
    }

    function setEnTitle(datas,colorIndex){
        $enTitle.text(datas[colorIndex]['model']);
    }

    function setOtherInfo(datas,colorIndex){
        var data = datas[colorIndex];
        $chTitle.text(data.name)

        if (data.isShowPrice == "1") {
            $price.text('￥'+ data.price);
        }else{
            $price.remove();
        }
        $infos.html(data.introduction)

        if(data.mainProductsLink!=""){
            $knewMore.attr('href',data.mainProductsLink);
        }else{
            $knewMore.hide();
        }

        var links="";

        if (data.tianMaoLink && data.tianMaoLink != "") {
            links+= '<li class="link"><a href="' + data.tianMaoLink + '" target="_blank" onclick=\'' + data.tianMaoTracking + '\'><img src="../../../images/tianmao.png" border="0" alt=""/></a></li>'
        }
        if (data.jinDongLink && data.jinDongLink != "") {
            links+= '<li class="link"><a href="' + data.jinDongLink + '" target="_blank" onclick=\'' + data.jinDongTracking + '\'><img src="../../../images/jd.png" border="0" alt=""/></a></li>'
        }
        if (data.yiHaoDianLink && data.yiHaoDianLink != "") {
            links+= '<li class="link"><a href="' + data.yiHaoDianLink + '" target="_blank" onclick=\'' + data.yiHaoDianTracking + '\'><img src="../../../images/yhd.png" border="0" alt=""/></a></li>'
        }
        $linkList.empty().append(links)
        if(!data.tianMaoLink && !data.jinDongLink && !data.yiHaoDianLink){
            $('.buyLinkBox .text').hide();
        }
        else{
            $('.buyLinkBox .text').show();
        }
    }

    function addColorImg(imgpath,datas,colorIndex){
        var licolorimg = '';
        $.each(datas, function (n, item) {
            if(n==colorIndex) {
                licolorimg += '<li class="colorPagination active" data-code="' + n + '" style="background-image:url(' + imgpath + item.color_image + ')"></li>'
            }else{
                licolorimg += '<li class="colorPagination" data-code="'+n+'" style="background-image:url(' + imgpath + item.color_image + ')"></li>'
            }
        })

        $colorList.append(licolorimg);

        $('.colorPagination').on('click', function () {
            $('.colorPagination').removeClass('active');
            $(this).addClass('active');
            var key = $(this).attr('data-code');
            key = parseInt(key);
            changeSwiperBigImg(datas,imgpath,key);
            setEnTitle(datas,key);
            setOtherInfo(datas,key);
        });
    }

    function changeSwiperBigImg(datas,imgpath,key){
        var data =  datas[key];
        setEnTitle(datas,key);
        topBannerSwiper.removeAllSlides();
        if (data.colorImgList) {
            $.each(data.colorImgList, function (n, item) {
                topBannerSwiper.appendSlide('<div class="swiper-slide"><img src="'+imgpath + item.phoneImg+'" /></div>');
                
            })
        }
        topBannerSwiper.slideTo(1,0,false);
    }
});

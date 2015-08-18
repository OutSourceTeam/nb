define([
    'jquery',
    'swiper',
    '../../common/mheader/index',
    '../../common/mfooter/index',
    'less!./mproductDetail'
], function($, Swiper) {
    var topBannerSwiper = new Swiper ('.topBannerSwiper', {
        loop: true,
        autoplay: 3000,
        initialSlide: 0,
        pagination: '.topBannerSwiper .swiper-pagination',
        paginationClickable: true,
    });
    var imgObj = {
        '1' : [
            '../../../images/m_banner.png',
            '../../../images/m_detailBanner01.png'
            ],
        '2' : [
            '../../../images/m_detailBanner01.png',
            '../../../images/m_detailBanner01.png'
            ],
        '3' : [
            '../../../images/m_banner.png',
            '../../../images/m_banner.png'
            ], 
        };
    $('.colorPagination').on('click', function(){
        $('.colorPagination').removeClass('active');
        $(this).addClass('active');
        var key = $(this).attr('data-code');
        console.log(key);
        refreshSwiper(imgObj[key]);
    });
    $('.colorPagination')[0].click();
    function refreshSwiper(imgList){
        var innerHTML = '';
        if (!imgList) return;
        for (var i = 0; i < imgList.length; i++) {
            innerHTML += '<div class="swiper-slide">' + '<img src="url(' + imgList[i] + '">' + '</div>';
        }
        topBannerSwiper.removeAllSlides();
        topBannerSwiper.appendSlide(innerHTML);
        topBannerSwiper.slideTo(imgList.length - 1, 0);
        topBannerSwiper.startAutoplay();
    }
});

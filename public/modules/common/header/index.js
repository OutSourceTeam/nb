define(['less!./header'],function() {

    var headerTapShown = false;

    $('.header_meun li').hover(function () {
        var $this =$(this);
        if(!$this.hasClass('runguwen')){
            $this.children('span').addClass('hover_meun');
            $this.children('span').children('a').addClass('acolor');
            $this.children('.category_expand').show()
        }
    }, function () {
        var $this =$(this);
        $this.children('span').removeClass('hover_meun');
        $this.children('span').children('a').removeClass('acolor');
        $this.children('.category_expand').hide()
    })


    $(window).scroll(function () {
        toTop()
    });

    $('#headerToTop').on('click', function () {
        $(window).scrollTop(0);
    })

    function toTop(){
        var body_scoll = $(window).scrollTop();
        if(body_scoll>=55){
            if (headerTapShown) {
                return;
            };
            headerTapShown = true;
            $('.header-tab').animate({'top':'56'});
        }else{
            if (!headerTapShown) {
                return;
            };
            headerTapShown = false;
            $('.header-tab').animate({'top':'22px'});
        }
    }

});


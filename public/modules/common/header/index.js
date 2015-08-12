define(['less!./header'],function() {

    (function () {

        $('.header_meun li').hover(function () {
            var $this =$(this);
            if(!$this.hasClass('runguwen')){
                $this.children('span').addClass('hover_meun');
                $this.children('span').children('a').addClass('acolor');
                $this.children('.category_expand').fadeIn()
            }
        }, function () {
            var $this =$(this);
            $this.children('span').removeClass('hover_meun');
            $this.children('span').children('a').removeClass('acolor');
            $this.children('.category_expand').fadeOut()
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
                $('.header-tab').css({'top':'0px'}).slideDown().addClass('toTop');
            }else{
                $('.header-tab').css({'top':'-34px'}).slideUp().removeClass('toTop');
            }
        }
        toTop()

    })()



});


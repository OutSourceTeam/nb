define(['less!./header'],function() {

    (function () {

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


    })()



});


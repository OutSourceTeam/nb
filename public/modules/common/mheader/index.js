define(['less!./mheader'],function() {

    $('.shoumenu').on('click', function (e) {
        e.preventDefault();
        var $this =$(this);
        var $icon = $this.children('i');
        if($icon.hasClass('icon-triangle-hollow-right')){
            $this.next('ul').show()
            $icon.removeClass('icon-triangle-hollow-right').addClass('icon-triangle-hollow-down');
        }else{
            $this.next('ul').hide()
            $icon.removeClass('icon-triangle-hollow-down').addClass('icon-triangle-hollow-right');
        }
    })

});


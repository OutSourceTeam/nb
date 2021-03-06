define(['less!./mheader'], function () {


    var pDiv = $('.header-menu');
    var psearchBox = $('.search-box');
    var pUl = pDiv.find('.header-ul');
    var manLi = pUl.children('li:eq(0)');
    var girlLi = pUl.children('li:eq(1)');
    var childli = pUl.children('li:eq(2)');
    
    $('.shoumenu').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);

        var $icon = $this.children('i');
        if ($icon.hasClass('icon-triangle-hollow-right')) {
            $this.next('ul').show()
            $icon.removeClass('icon-triangle-hollow-right').addClass('icon-triangle-hollow-down');
        } else {
            $this.next('ul').hide()
            $icon.removeClass('icon-triangle-hollow-down').addClass('icon-triangle-hollow-right');
        }
        var manLiheight = manLi.outerHeight();
        var girlLiheight = girlLi.outerHeight();
        var childliheight = childli.outerHeight();
        pUl.css('height', Math.max(manLiheight + girlLiheight + childliheight + 56 ,350));
    })

    var ismenushouw = false, issearchshow = false;
    $('.showdownmenu').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        var pmdiv = $this.parent('div');

        if (pmdiv.hasClass('wrap-header')) {
            changeMeunSyle($this, true);
            if ($this.hasClass('menu')) {
                pDiv.show();
                ismenushouw = true;
            } else if ($this.hasClass('search')) {
                psearchBox.fadeIn();
                issearchshow = true
            }

        } else {

            if ($this.hasClass('menu') && ismenushouw) {
                pDiv.hide()
                ismenushouw = false
                changeMeunSyle($this, false);
            } else if ($this.hasClass('menu') && !ismenushouw) {
                pDiv.show();
                ismenushouw = true;
                psearchBox.fadeOut();
                issearchshow = false
                $this.addClass('menuicon');
                $this.next('span').removeClass('menuicon');
            }


            if ($this.hasClass('search') && issearchshow) {
                psearchBox.fadeOut();
                issearchshow = false
                changeMeunSyle($this, false);
            } else if ($this.hasClass('search') && !issearchshow) {
                psearchBox.fadeIn();
                issearchshow = true
                pDiv.hide()
                ismenushouw = false
                $this.addClass('menuicon');
                $this.prev('span').removeClass('menuicon');
            }

        }


    })

    function changeMeunSyle(that, isswich) {
        var pmdiv = that.parent('div');
        var pmi = pmdiv.find('#guwen');
        if (isswich) {
            pmdiv.removeClass('wrap-header').addClass('meunwrap-header');
            that.addClass('menuicon')
            pmi.removeClass('icon-shoe-hollow-left').addClass('icon-shoe-left')
        } else {
            pmdiv.removeClass('meunwrap-header').addClass('wrap-header');
            that.removeClass('menuicon');
            pmi.removeClass('icon-shoe-left').addClass('icon-shoe-hollow-left')
        }
    }

});


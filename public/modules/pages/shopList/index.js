define([
    'jquery',
    'selectric',
    'pagination',
    'common/header/index',
    'common/footer/index',
    'less!./shopList'
], function($, TwbsPagination) {
    $('select').selectric({});
    var aa = $('.pageNumList').twbsPagination({
        totalPages: 35,
        visiblePages: 7,
        prev: '<span class="icon-triangle-left"></span>',
        next: '<span class="icon-triangle-right"></span>',
        onPageClick: function (event, page) {
            console.log(page);
        }
    });
    $('.typeLink').on('click', function(ev){
        $(this).toggleClass('active');
    })
});

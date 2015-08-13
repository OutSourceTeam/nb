define([
    'jquery',
    'selectric',
    'common/header/index',
    'less!./shopList'
], function($) {
    $('select').selectric({
        // arrowButtonMarkup: '<span class="icon-triangle-down arrowBtn"></span>'
    });
});

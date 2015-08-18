define([
    'jquery',
    '../../common/mheader/index',
    '../../common/mfooter/index',
    'less!./mproductList'
], function($) {
    var sortObj = {
    	'0' : '排序方式',
    	'1' : '上市时间－由新到旧',
    	'2' : '上市时间－由旧到新',
    	'3' : '价格－由高到低',
    	'4' : '价格－由低到高'
    };
    var featureObj = {
    	'0' : '功能',
    	'1' : '支撑',
    	'2' : '轻量',
    	'3' : '稳定',
    	'4' : '避震'
    }
    $('.sortBy').on('change', function(e){
    	var $this = $(this),
    		value = $this.val(),
    		text = sortObj[value];
    	$this.parent().find('.title').text(text || sortObj[0]);
;    });
    $('.feature').on('change', function(e){
    	var $this = $(this),
    		value = $this.val(),
    		text = featureObj[value];
    	$this.parent().find('.title').text(text || featureObj[0]);
;    })
});

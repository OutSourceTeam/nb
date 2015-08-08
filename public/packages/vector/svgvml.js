define(['browser'], function(agent){

	//if ie8 type = vml else type = svg
	var type = agent.browser === "msie" && parseInt(agent.version, 10) <= 8 ? "vml" : "svg";



	var REG_SVG_WIDTH = /(\<svg[^\<]*width=\")(\S*)(\"[^\<]*\>)/gmi;
	var REG_SVG_HEIGHT = /(\<svg[^\<]*height=\")(\S*)(\"[^\<]*\>)/gmi;
	var REG_VML_WIDTH = /<v[^>]*width[^>]?:[^>]?([\d]+)[^>]*>/mi;
	var REG_VML_HEIGHT = /<v[^>]*height[^>]?:[^>]?([\d]+)[^>]*>/mi;

	
	return function exec(){

		//get all icons and push them into icons[]
		var icons = [];
		$('icon').each(function(index,dom){
		    icons.push({
		        dom:$(dom),
		        name:$(dom).attr('name'),
		        width:$(dom).attr('width'),
		        height:$(dom).attr('height'),
		        classname:$(dom).attr('class')
		    });
		})

		var width;
		var height;

		icons.forEach(function(icon) {
		    require(['text!packages/icons/' + icon.name + '.' + type], function(str) {
		        var $str;
		        switch(type){
		            case "svg":

		                str = str.replace(
		                        REG_SVG_WIDTH,
		                        function(match, $1, $2, $3) {
		                            return $1 + '100%' + $3;
		                        })
		                    .replace(
		                        REG_SVG_HEIGHT,
		                        function(match, $1, $2, $3) {
		                            return $1 +  '100%' + $3;
		                        });
		                break;
		            case "vml":

		                width = str.match(REG_VML_WIDTH);
		                height = str.match(REG_VML_HEIGHT);
		                if(width[1] && height[1]){
		                    //can't use a top width and height in vml to set the size, so we use zoom here
		                    //don't use jquery function here, because ignore zoom will be ignored...
		                    str = "<div style='zoom:" + Math.min(parseInt(icon.height,10)/height[1], parseInt(icon.width, 10)/width[1]) + "'>" + str +  "</div>";
		                }
		                break;
		        }
		        str = "<div class='vector-icon'>" + str +  "</div>";
		        $str = $(str);
		        $str.css({
		            "width": icon.width,
		            "height" : icon.height,
		            "line-height":0,
		            "vertical-align":"middle",
		            "overflow":"hidden"
		        })
		        .addClass(icon.classname);
		        icon.dom.after($str).remove();
		    })
		});
	}


});
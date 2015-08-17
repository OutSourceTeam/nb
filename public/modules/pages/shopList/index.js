define([
    'jquery',
    '../../../packages/selectric/jquery.selectric',
    '../../../packages/pagination/jquery.twbsPagination.min',
    '../../common/header/index',
    '../../common/footer/index',
    'less!./shopList'
], function($, TwbsPagination) {

    selectCity()
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



    var selectedCity ='上海';

   var  map = new BMap.Map("mapview-container");

    var $mapcontainer= $('.map-container')
    var $closeMapBtn= $('.close-map-btn')
    var $viewMapBtn= $('.view-map-btn')
    var $mapviewcontainer= $('#mapview-container');

    $viewMapBtn.on('click',function(e){
        e.preventDefault();
        var addr = $(this).next().text();
        $mapviewcontainer.css({
            width:$mapcontainer.prev('ul').width(),
            height:$mapcontainer.prev('ul').height()
        })
        addMarker(addr);
        $mapcontainer.fadeIn(500,function(){
            $closeMapBtn.fadeIn();
        });
    });

    $closeMapBtn.on('click',function(e){
        e.preventDefault();
        $closeMapBtn.fadeOut(500,function(){$mapcontainer.fadeOut();});
    });

    function addMarker(addr){

        myGeo = new BMap.Geocoder();
        var point;

        myGeo.getPoint(addr,function(point){
            if(point){
                point = point;
                map.centerAndZoom(point, 18);
                addMarker(point,1)
            }
            else{
                alert('该地址无法在地图上显示');
            }
        },selectedCity);

        function addMarker(point, index){  // 创建图标对象
            var myIcon = new BMap.Icon("../../images/location_mark.png", new BMap.Size(26, 38), {
                offset: new BMap.Size(10, 25),
                imageOffset: new BMap.Size(0,0)   // 设置图片偏移
            });
            var marker = new BMap.Marker(point, {icon: myIcon});
            map.addOverlay(marker);
        }
    }


    function selectCity(){

        var $province = $('#province'),$provincecity= $('#provincecity');
            $province.selectric();
            $provincecity.selectric();
        $.getJSON('../../../packages/selectric/city.min.js',function(json){
            city_json=json;
            var temp_html='';
            $.each(city_json.citylist,function(i,prov){
                temp_html+="<option value='"+prov.p+"'>"+prov.p+"</option>";
            });
            $province.append(temp_html)
            $province.selectric('refresh');

            $province.on('change', function() {
                var prov_id=$province.get(0).selectedIndex-1;
                $provincecity.empty();
                var city_html='';
                $.each(city_json.citylist[prov_id].c,function(i,city){
                    if(i===0){
                        selectedCity =city.n;
                    }
                    city_html+="<option value='"+city.n+"'>"+city.n+"</option>";
                });
                $provincecity.append(city_html)
                $provincecity.selectric('refresh');


            });
            $provincecity.on('change', function() {
                selectedCity = $(this).val();
            });


        });





    }

});

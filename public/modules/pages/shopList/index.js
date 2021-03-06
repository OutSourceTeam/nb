define([
    'jquery',
    'selectric',
    'pagination',
    '../../common/header/index',
    '../../common/footer/index',
    'less!./shopList'
], function($, TwbsPagination) {
    var searchObj = {
        'city' : '',
        'province' : '',
        'typeShop' : 1,
        'typeHouse' : 1,
        'typeKids' : 1,
        'page' : 1,
        'pageSize' : 8,
        'totalPages':0
    };
    var oldPageNum = 0;
    $('.typeLink').each(function(index, item){
        getTypeStatus($(item));
    });
    getShopData();
    selectCity();
    var aa = $('.pageNumList').twbsPagination({
        totalPages: 35,
        visiblePages: 7,
        prev: '<span class="icon-triangle-left"></span>',
        next: '<span class="icon-triangle-right"></span>',
        onPageClick: function (event, page) {
            searchObj.page = page;
            getShopData();
        }
    });
    
    $('.typeLink').on('click', function(ev){
        var $this = $(this);
        $this.toggleClass('active');
        getTypeStatus($this);
    });

    var  map = new BMap.Map("mapview-container");

    var $mapcontainer= $('.map-container');
    var $closeMapBtn= $('.close-map-btn');
    var $shopList= $('.shopList');
    var $mapviewcontainer= $('#mapview-container');
    var $searchBtn = $('.searchBtn');

    $shopList.delegate('.view-map-btn','click',function(e){
        e.preventDefault();
        var addr = $(this).next().text(),
            city = $(this).parent().attr('data-city');
        $mapviewcontainer.css({
            width:$mapcontainer.prev('ul').width(),
            height:$mapcontainer.prev('ul').height()
        })
        addMarker(addr, city);
        $mapcontainer.fadeIn(500,function(){
            $closeMapBtn.fadeIn();
        });
    });

    $closeMapBtn.on('click',function(e){
        e.preventDefault();
        $closeMapBtn.fadeOut(500,function(){$mapcontainer.fadeOut();});
    });
    $searchBtn.on('click', function(){
        oldPageNum = -1;
        searchObj.page = 1;
        getShopData();
    });
    function getTypeStatus($dom){
        var num = $dom.hasClass('active') ? 1 : 0;
        switch ($dom.attr('data-type')){
            case 'shop':
                searchObj.typeShop = num;
                break;
            case 'house':
                searchObj.typeHouse = num;
                break;
            case 'kids': 
                searchObj.typeKids = num;
                break
        }
    }
    function addMarker(addr, city){

        myGeo = new BMap.Geocoder();
        var point;
        myGeo.getPoint(addr,function(point){
            if(point){
                point = point;
                map.centerAndZoom(point, 18);
                addMarker(point,1);
            }
            else{
                alert('该地址无法在地图上显示');
            }
        },city);

        function addMarker(point, index){  // 创建图标对象
            var myIcon = new BMap.Icon("../../../images/location_mark.png", new BMap.Size(26, 38), {
                offset: new BMap.Size(10, 25),
                imageOffset: new BMap.Size(0,0)   // 设置图片偏移
            });
            var marker = new BMap.Marker(point, {icon: myIcon});
            map.addOverlay(marker);
        }
    }


    // function selectCity(){
    //     var $province = $('#province'),$provincecity= $('#provincecity');
    //         $province.selectric();
    //         $provincecity.selectric();
    //     $.getJSON('../../../packages/selectric/city.min.js?v1',function(json){
    //         city_json=json;
    //         var temp_html='';
    //         $.each(city_json.citylist,function(i,prov){
    //             temp_html+="<option value='"+prov.p+"'>"+prov.p+"</option>";
    //         });
    //         $province.append(temp_html)
    //         $province.selectric('refresh');

    //         $province.on('change', function() {
    //             var value = $province.val();
    //             if (parseInt(value) == -1){
    //                 var city_html='<option value="-1">城市</option>';
    //                 $provincecity.empty().append(city_html);
    //                 $provincecity.selectric('refresh');
    //                 searchObj.province = '';
    //                 searchObj.city = '';
    //                 return;
    //             }
    //             var prov_id=$province.get(0).selectedIndex-1;
    //             $provincecity.empty();
    //             var city_html="<option value='0'>全部</option>";
    //             $.each(city_json.citylist[prov_id].c,function(i,city){
    //                 city_html+="<option value='"+city.n+"'>"+city.n+"</option>";
    //             });
    //             $provincecity.append(city_html);
    //             $provincecity.selectric('refresh');
    //             searchObj.province = $(this).val();
    //             searchObj.city = '';
    //         });
    //         $provincecity.on('change', function() {
    //             searchObj.city = $(this).val();
    //         });
    //     });
    // }

    function selectCity(){
        var $province = $('#province'),$provincecity= $('#provincecity');
            $province.selectric();
            $provincecity.selectric();
        
        $.ajax({
            type : "get",
            async : false,
            url : "/index.php?s=Home/Api/ajaxInfo&action=province",
            dataType : "json",
            success : function(json){
                console.log(json);
                if(json.msg != undefined && json.msg == 0){
                    //alert(json.msgbox);  
                    //异常
                }
                else{
                    console.log(json);
                    var temp_html='';
                    $.each(json,function(i,prov){
                        temp_html+="<option value='"+json[i]["province"]+"'>"+json[i]["province"]+"</option>";
                    });
                    $province.append(temp_html)
                    $province.selectric('refresh');

                    $province.on('change', function() {
                        var value = $province.val();
                        if (parseInt(value) == -1){
                            var city_html='<option value="-1">城市</option>';
                            $provincecity.empty().append(city_html);
                            $provincecity.selectric('refresh');
                            searchObj.province = '';
                            searchObj.city = '';
                            return;
                        }
                        var prov_id=$province.get(0).selectedIndex-1;
                        $provincecity.empty();

                        var city_html="<option value='0'>全部</option>";

                        $.ajax({
                            type : "get",
                            async : false,
                            url : "/index.php?s=Home/Api/ajaxInfo&action=city&province=" + encodeURIComponent(value),
                            dataType : "json",
                            success : function(city_json){
                                if(city_json.msg != undefined && city_json.msg == 0){
                                    
                                }
                                else{
                                    $.each(city_json,function(i,city){
                                        city_html+="<option value='"+city_json[i].city+"'>"+city_json[i].city+"</option>";
                                    });
                                    $provincecity.append(city_html);
                                    $provincecity.selectric('refresh');
                                    searchObj.province = value;
                                    selectedProvince = value;
                                    searchObj.city = '';
                                }
                            }
                        });
                    });

                    $provincecity.on('change', function() {
                        searchObj.city = $(this).val();
                    });
                }
            }
        });
    }

    function getShopData(){
        var baseUrl = '/index.php?s=/Home/Index/ajaxshoplist',
            params = '',
            ajaxUrl = '';
        for (var key in searchObj) {
          if (searchObj.hasOwnProperty(key) && searchObj[key]) {
            params += '/' + key + '/' + encodeURIComponent(searchObj[key]);
          }
        }
        ajaxUrl = baseUrl + params;
        $.ajax({
            url: ajaxUrl,
            type: 'GET',
            dataType: 'text'
        }).done(function(data){
            if (!data || data==='{}') return;
            try{
                data = JSON.parse(data);
            } catch(e){
                console.log(e);
                return;
            } 
            setShopList(data);
        });
    }

    function setShopList(data){
        var $shopList = $('.shopList');
        var listData = data.data || [];
        var html = '';
        listData.forEach(function(item){
            var iconClass='';
            switch(String(item.type)){
                case '1' : 
                    iconClass = 'icon-shop';
                    break;
                case '2': 
                    iconClass = 'icon-house';
                    break;
                case '3': 
                    iconClass = 'icon-kids';
                    break;
            }
            html += '<li class="shopInfos" data-city="' + item.city + '">' + 
                        '<span class="name view-map-btn">' + 
                            item.name +
                        '</span>' + 
                        '<span class="address">' + 
                            item.address + 
                        '</span>' + 
                        '<span class="' + iconClass + ' icon "></span>' + 
                    '</li>';
        })
        $shopList.empty().append(html);
        if(!listData || parseInt(data.pageNum) == 0){
            $shopList.append('<li class="noData">对不起，暂无专卖店数据</li>');
        }
        showPagination(data);
    }
    function showPagination(data){
        var totalPages = data.pageCount,
            startPage = data.currPage,
            pageCount = data.pageNum;
        if (parseInt(pageCount) == 0){
            // $('.paginationBox').find('.count').text(pageCount);
            // $('.pageNumList').remove();
            $('.paginationBox').hide();
            return;
        }
        $('.paginationBox').show();
        if (oldPageNum === totalPages) return;
        oldPageNum = totalPages;
        $('.paginationBox').find('.count').text(pageCount);
        $('.pageNumList').remove();
        $('.paginationBox').append('<ul class="pageNumList"></ul>');
        $('.pageNumList').twbsPagination({
          totalPages: totalPages,
          visiblePages: 7,
          startPage: startPage,
          prev: '<span class="icon-triangle-left"></span>',
            next: '<span class="icon-triangle-right"></span>',
          onPageClick: function (event, page) {
            searchObj.page = page;
            getShopData();
          }
        });
    }

});

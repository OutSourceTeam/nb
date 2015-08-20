var globalDeps = globalDeps || [];

var _allScripts = document.getElementsByTagName('script');
var _thisScript = _allScripts[_allScripts.length - 1];
var _main = _thisScript.getAttribute('main').split(';');
var _baseUrl = _thisScript.getAttribute('baseUrl');

require.config({
    baseUrl: _baseUrl,
    waitSeconds: 0,
    deps:['poly', 'jquery', 'vector'].concat(globalDeps),
    shim:{
        "less" : {
            deps : ["poly"]
        }
    },
    paths: {
        'vector' : 'packages/vector/svgvml',
        'jquery' : 'packages/jquery/jquery-1.11.3.min',
        'swiper':'packages/swiper/idangerous.swiper.min',
        'browser' : 'packages/browser/check',
        'poly' : 'packages/poly/poly.0.5.1.min',
        'less' : 'packages/less/1.7.0/less.min',
        'text': 'packages/require-text/2.0.14/text',
        'selectric':'packages/selectric/jquery.selectric',
        'pagination': 'packages/pagination/jquery.twbsPagination.min'
    },
    map: {
        '*': {
            'less': 'packages/require-less/0.1.5/less' // path to less
        }
    },
    callback:function(poly, $, vector){
        $(function(){
            //start up init module
            require(_main, function(){
                vector();
            });

        });
    }
});
var _ctx="../";require.config({waitSeconds:600,baseUrl:"../../Build/",paths:{Cesium:"Cesium/Cesium",CommonFunc:"Autonomy/commonFunc",Config:"Autonomy/config",Globe:"./"},shim:{Cesium:{exports:"Cesium"},CommonFunc:{exports:"CommonFunc"},Config:{exports:"Config"}},map:{"*":{"css-loader":"requirejs/require_css"}},nameConvert:function(e){if(e.length<=4)return e;var o=e.substr(e.length-4);if(o===".css"){return"css-loader!"+e}return e}});
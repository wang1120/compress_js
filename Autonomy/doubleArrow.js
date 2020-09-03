define([],function(){function e(e){var d=this;this._globe=e;this._viewer=e._viewer;this._globeId=e._globeId;this._minHeight=0;this._maxHeight=1e6;this._catalog="default";this._subcatalog="default";this._handler=new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);this._layer=[];this._showMenu=true;this._options={draw:false,minHeight:0,maxHeight:1e6,catalog:"default",subcatalog:"default",drawid:"",handlerCallback:null,options:null};this._viewer.scene.postRender.addEventListener(function(){var e=0;var a=d._viewer.scene.mode;if(a==Cesium.SceneMode.SCENE3D){var t=Cesium.Cartographic.fromCartesian(d._viewer.scene.camera.position);e=t.height}else{e=Math.ceil(d._viewer.camera.positionCartographic.height)}for(var n=0;n<d._layer.length;n++){if(e>=d._layer[n].minHeight&&e<=d._layer[n].maxHeight){d._layer[n].showHeight=true}else{d._layer[n].showHeight=false}if(d._layer[n].showHeight&&d._layer[n].showLayer&&d._layer[n].showEntity){d._layer[n].polygon.show=true;if(d._layer[n].clampMode==0){d._layer[n].polyline.show=true}}else{d._layer[n].polygon.show=false;if(d._layer[n].polyline){d._layer[n].polyline.show=false}}}});this._handler.setInputAction(function(e){var a=d._globe.getLonLatByPosition(e.position);if(d._options.draw&&d._options.drawid==""){var t={};for(var n in d._options.options){if(n!="color"&&n!="layer"){t[n]=typeof d._options.options[n]==="object"?deepCoyp(d._options.options[n]):d._options.options[n]}}var o=t.name?t.name:"";var l=t.width?t.width:3;var r=t.wlpha?t.wlpha:.5;var i=t.rightClick?t.rightClick:null;var s=t.catalog?t.catalog:d._catalog;var v=t.subcatalog?t.subcatalog:d._subcatalog;var h=t.minHeight?t.minHeight:d._minHeight;var p=t.maxHeight?t.maxHeight:d._maxHeight;var g=d._options.options.color?d._options.options.color:Cesium.Color.BLUE;var u=d._options.options.layer?d._options.options.layer:d._globe._defaultLayer;var m=d._options.options.clampMode?d._options.options.clampMode:0;var y=[a];var c={polyline:null,polygon:null,pointList:y,vertexLineList:[],vertexList:[],layer:u,catalog:s,subcatalog:v,minHeight:h,maxHeight:p,showHeight:true,showLayer:true,showEntity:true,clampMode:m};if(m==0){c.polygon=d._viewer.entities.add({rightClick:i,name:o,polygon:{hierarchy:new Cesium.CallbackProperty(function(){return c.vertexList},false),material:Cesium.Color.RED.withAlpha(.5),height:2e3}});c.polyline=d._viewer.entities.add({polyline:{positions:new Cesium.CallbackProperty(function(){return c.vertexLineList},false),width:3,material:Cesium.Color.RED.withAlpha(1)}})}else{c.polygon=d._viewer.entities.add({rightClick:i,name:o,polygon:{hierarchy:new Cesium.CallbackProperty(function(){return c.vertexList},false),material:Cesium.Color.RED.withAlpha(.5)}});c.polyline=null}d._layer.push(c);d._options.drawid=c.polygon.id;var _=(new Date).getTime()+"a"+parseInt(100*Math.random());d._globe.layerManager._add("entityLayer",_,s,v)}else if(d._options.draw&&d._options.drawid!==""){var o=d._options.options.name?d._options.options.name:"";d._layer[d._layer.length-1].pointList.push(a);if(d._layer[d._layer.length-1].pointList.length==4){d._options.drawid="";if(d._options.handlerCallback){d._options.handlerCallback(d._layer[d._layer.length-1])}d._globe.globeMenu.setType(d._showMenu)}}},Cesium.ScreenSpaceEventType.LEFT_CLICK);this._handler.setInputAction(function(e){var a=d._globe.getLonLatByPosition(e.endPosition);if(d._options.draw&&d._options.drawid!=""){var t=d._layer[d._layer.length-1].pointList.slice(0);if(t.length>1){t.push(a);var n=d._options.options.clampMode;if(n==0){var o=d._getDoubleArrowPoints(t,n);d._layer[d._layer.length-1].vertexList=Cesium.Cartesian3.fromDegreesArrayHeights(o);d._layer[d._layer.length-1].vertexLineList=Cesium.Cartesian3.fromDegreesArrayHeights(o)}else{var o=d._getDoubleArrowPoints(t,n);d._layer[d._layer.length-1].vertexList=Cesium.Cartesian3.fromDegreesArrayHeights(o);d._layer[d._layer.length-1].vertexLineList=Cesium.Cartesian3.fromDegreesArrayHeights(o)}}}},Cesium.ScreenSpaceEventType.MOUSE_MOVE);this._handler.setInputAction(function(e){var a=d._globe.getLonLatByPosition(e.position);if(a.alt<0){a.alt=0}if(d._options.draw&&d._options.drawid!=""){d._layer[d._layer.length-1].pointList.push(a);var t=d._layer[d._layer.length-1].pointList.slice(0);var n=d._options.options.clampMode;if(n==0){var o=d._getDoubleArrowPoints(t,n);d._layer[d._layer.length-1].vertexList=Cesium.Cartesian3.fromDegreesArrayHeights(o);d._layer[d._layer.length-1].vertexLineList=Cesium.Cartesian3.fromDegreesArrayHeights(o)}else{var o=d._getDoubleArrowPoints(t,n);d._layer[d._layer.length-1].vertexList=Cesium.Cartesian3.fromDegreesArrayHeights(o);d._layer[d._layer.length-1].vertexLineList=Cesium.Cartesian3.fromDegreesArrayHeights(o)}d._options.drawid="";if(d._options.handlerCallback){d._options.handlerCallback(d._layer[d._layer.length-1])}}},Cesium.ScreenSpaceEventType.RIGHT_CLICK)}e.prototype.drawHandler=function(e){var a=this;a._options.draw=true;a._options.drawid="";a._options.options=e;var t=e.callback?e.callback:null;a._options.handlerCallback=t;a._showMenu=a._globe.globeMenu._showMenu;a._globe.globeMenu.setType(false)};e.prototype.deactivateHandler=function(){var e=this;e._options.draw=false;e._globe.globeMenu.setType(e._showMenu)};e.prototype.add=function(e){var a=this;var t=e.wlpha?parseFloat(e.wlpha):1;var n=e.clampMode?e.clampMode:0;var o=e.height?parseInt(e.height):2e3;var l=e.rightClick?e.rightClick:null;var r=e.color?e.color:Cesium.Color.RED;var i=e.pointList?e.pointList:[];var s=e.layer?e.layer:a._globe._defaultLayer;var v=e.catalog?e.catalog:a._catalog;var h=e.subcatalog?e.subcatalog:a._subcatalog;var p=e.minHeight?e.minHeight:a._minHeight;var g=e.maxHeight?e.maxHeight:a._maxHeight;var u={polyline:null,polygon:null,pointList:i,vertexLineList:[],vertexList:[],layer:s,catalog:v,subcatalog:h,minHeight:p,maxHeight:g,showHeight:true,showLayer:true,showEntity:true,clampMode:n};var m=e.name?e.name:"";if(n==0){var y=a._getDoubleArrowPoints(i,n);u.polygon=a._viewer.entities.add({rightClick:l,name:m,polygon:{hierarchy:Cesium.Cartesian3.fromDegreesArrayHeights(y),material:Cesium.Color.RED.withAlpha(.5),height:2e3}});u.polyline=a._viewer.entities.add({polyline:{positions:Cesium.Cartesian3.fromDegreesArrayHeights(y),width:3,material:Cesium.Color.RED.withAlpha(1)}})}else{var y=a._getDoubleArrowPoints(i,n);u.polygon=a._viewer.entities.add({rightClick:l,name:m,polygon:{hierarchy:Cesium.Cartesian3.fromDegreesArrayHeights(y),material:Cesium.Color.RED.withAlpha(.5)}});u.polyline=null}a._layer[a._layer.length]=u;var c=(new Date).getTime()+"a"+parseInt(100*Math.random());a._globe.layerManager._add("entityLayer",c,v,h);return u};e.prototype.remove=function(e){var a=this;var t;for(var n=a._layer.length-1;n>=0;n--){if(a._layer[n].polygon.id==e.polygon.id){var o=a._layer[n].catalog;var l=a._layer[n].subcatalog;t=a._viewer.entities.remove(a._layer[n].polygon);if(!t){break}if(a._layer[n].polyline!=null){t=a._viewer.entities.remove(a._layer[n].polyline);if(!t){break}}a._globe.layerManager._remove("entityLayer",o,l);a._layer.splice(n,1)}}a._options.draw=false;a._options.drawid="";a._options.callback=null;return t};e.prototype.removeById=function(e){var a=this;var t;for(var n=a._layer.length-1;n>=0;n--){if(a._layer[n].polygon.id==e){var o=a._layer[n].catalog;var l=a._layer[n].subcatalog;t=a._viewer.entities.remove(a._layer[n].polygon);if(!t){break}if(a._layer[n].polyline!=null){t=a._viewer.entities.remove(a._layer[n].polyline);if(!t){break}}a._globe.layerManager._remove("entityLayer",o,l);a._layer.splice(n,1)}}a._options.draw=false;a._options.drawid="";a._options.callback=null;return t};e.prototype._getDoubleArrowPoints=function(e,a){if(e.length<3)return[];var t=2e3;var n=6;var o=0;var l=0;for(var r=1;r<e.length;r++){o=CommonFunc.getDistance(e[r-1].lon,e[r-1].lat,e[r].lon,e[r].lat);l+=o}var i=l/n;var s=new Array;var v=[];var h=(e[1].lon-e[0].lon)*(e[2].lat-e[0].lat)-(e[2].lon-e[0].lon)*(e[1].lat-e[0].lat);if(h<0){var p=e[0];var g=e[1];var u=CommonFunc.destinationVincenty(e[2].lon,e[2].lat,t,0,0,0);var m=CommonFunc.getAngle(g.lon,g.lat,p.lon,p.lat);var y=CommonFunc.getAngle(p.lon,p.lat,g.lon,g.lat);var c=CommonFunc.getDistance(g.lon,g.lat,p.lon,p.lat);var _;if(e.length==3){_=CommonFunc.destinationVincenty(u.lon,u.lat,t,m,0,c)}else{_=CommonFunc.destinationVincenty(e[3].lon,e[3].lat,t,0,0,0)}var d=CommonFunc.destinationVincenty(p.lon,p.lat,t,y,0,c/3);var C=CommonFunc.destinationVincenty(g.lon,g.lat,t,m,0,c/3);var f=CommonFunc.getAngle(d.lon,d.lat,_.lon,_.lat);var w=(d.lon+5*_.lon)/6;var b=(d.lat+5*_.lat)/6;var L={lon:w,lat:b};var F=(d.lon*5+_.lon)/6;var H=(d.lat*5+_.lat)/6;var A=CommonFunc.destinationVincenty(F,H,t,m,0,i/4);var M=CommonFunc.destinationVincenty(L.lon,L.lat,t,f+90,0,i/12);var D=CommonFunc.destinationVincenty(L.lon,L.lat,t,f+90,0,i/6);var V=[p,A,M];var x=CommonFunc.getBezier(V);for(var r=0;r<x.length-1;r++){v.push(x[r])}v.push(M);v.push(D);v.push(_);var k=CommonFunc.destinationVincenty(L.lon,L.lat,t,f-90,0,i/6);var E=CommonFunc.destinationVincenty(L.lon,L.lat,t,f-90,0,i/12);v.push(k);v.push(E);var P=CommonFunc.getAngle(C.lon,C.lat,u.lon,u.lat);var I=(C.lon+5*u.lon)/6;var B=(C.lat+5*u.lat)/6;var S={lon:I,lat:B};var T=(C.lon*5+u.lon)/6;var R=(C.lat*5+u.lat)/6;var q=CommonFunc.destinationVincenty(T,R,t,y,0,i/4);var z=CommonFunc.destinationVincenty(S.lon,S.lat,t,P-90,0,i/12);var K=CommonFunc.destinationVincenty(S.lon,S.lat,t,P-90,0,i/6);var O=[g,q,z];var U=CommonFunc.getBezier(O);var j=CommonFunc.destinationVincenty(S.lon,S.lat,t,P+90,0,i/6);var G=CommonFunc.destinationVincenty(S.lon,S.lat,t,P+90,0,i/12);var N={lon:(d.lon+C.lon)/2,lat:(d.lat+C.lat)/2};var J={lon:(_.lon+u.lon)/2,lat:(_.lat+u.lat)/2};var Q={lon:(N.lon*5+J.lon)/6,lat:(N.lat*5+J.lat)/6};var W=E.lon-Q.lon;var X=G.lon-Q.lon;var Y=E.lat-Q.lat;var Z=G.lat-Q.lat;var $=Math.sqrt(W*W+Y*Y);var ee=Math.sqrt(X*X+Z*Z);var ae=Q.lon-Math.sqrt($*ee)*(W/$+X/ee)/2;var te=Q.lat-Math.sqrt($*ee)*(Y/$+Z/ee)/2;var ne={lon:ae,lat:te};var oe=[E,ne,G];var le=CommonFunc.getBezier(oe);for(var r=0;r<le.length-1;r++){v.push(le[r])}v.push(G);v.push(j);v.push(u);v.push(K);v.push(z);for(var r=U.length-2;r>=0;r--){v.push(U[r])}if(a==0){v.push(x[0])}for(var r=0;r<v.length;r++){s.push(v[r].lon);s.push(v[r].lat);s.push(v[r].alt)}return s}else{var p=e[0];var g=e[1];var u=CommonFunc.destinationVincenty(e[2].lon,e[2].lat,t,0,0,0);var m=CommonFunc.getAngle(g.lon,g.lat,p.lon,p.lat);var y=CommonFunc.getAngle(p.lon,p.lat,g.lon,g.lat);var c=CommonFunc.getDistance(g.lon,g.lat,p.lon,p.lat);var _;if(e.length==3){_=CommonFunc.destinationVincenty(u.lon,u.lat,t,m,0,c)}else{_=CommonFunc.destinationVincenty(e[3].lon,e[3].lat,t,0,0,0)}var d=p;var C=g;var f=CommonFunc.getAngle(d.lon,d.lat,_.lon,_.lat);var w=(d.lon+5*_.lon)/6;var b=(d.lat+5*_.lat)/6;var L={lon:w,lat:b};var F=(d.lon*5+_.lon)/6;var H=(d.lat*5+_.lat)/6;var A=CommonFunc.destinationVincenty(F,H,t,m,0,i/2);var M=CommonFunc.destinationVincenty(L.lon,L.lat,t,f-90,0,i/12);var D=CommonFunc.destinationVincenty(L.lon,L.lat,t,f-90,0,i/6);var V=[p,A,M];var x=CommonFunc.getBezier(V);for(var r=0;r<x.length-1;r++){v.push(x[r])}v.push(M);v.push(D);v.push(_);var k=CommonFunc.destinationVincenty(L.lon,L.lat,t,f+90,0,i/6);var E=CommonFunc.destinationVincenty(L.lon,L.lat,t,f+90,0,i/12);v.push(k);v.push(E);var P=CommonFunc.getAngle(C.lon,C.lat,u.lon,u.lat);var I=(C.lon+5*u.lon)/6;var B=(C.lat+5*u.lat)/6;var S={lon:I,lat:B};var T=(C.lon*5+u.lon)/6;var R=(C.lat*5+u.lat)/6;var q=CommonFunc.destinationVincenty(T,R,t,y,0,i/2);var z=CommonFunc.destinationVincenty(S.lon,S.lat,t,P+90,0,i/12);var K=CommonFunc.destinationVincenty(S.lon,S.lat,t,P+90,0,i/6);var O=[g,q,z];var U=CommonFunc.getBezier(O);var j=CommonFunc.destinationVincenty(S.lon,S.lat,t,P-90,0,i/6);var G=CommonFunc.destinationVincenty(S.lon,S.lat,t,P-90,0,i/12);var N={lon:(d.lon+C.lon)/2,lat:(d.lat+C.lat)/2};var J={lon:(_.lon+u.lon)/2,lat:(_.lat+u.lat)/2};var Q={lon:(N.lon*5+J.lon)/6,lat:(N.lat*5+J.lat)/6};var W=E.lon-Q.lon;var X=G.lon-Q.lon;var Y=E.lat-Q.lat;var Z=G.lat-Q.lat;var $=Math.sqrt(W*W+Y*Y);var ee=Math.sqrt(X*X+Z*Z);var ae=Q.lon-Math.sqrt($*ee)*(W/$+X/ee)/2;var te=Q.lat-Math.sqrt($*ee)*(Y/$+Z/ee)/2;var ne={lon:ae,lat:te};var oe=[E,ne,G];var le=CommonFunc.getBezier(oe);for(var r=0;r<le.length-1;r++){v.push(le[r])}v.push(G);v.push(j);v.push(u);v.push(K);v.push(z);for(var r=U.length-2;r>=0;r--){v.push(U[r])}if(a==0){v.push(x[0])}for(var r=0;r<v.length;r++){s.push(v[r].lon);s.push(v[r].lat);s.push(v[r].alt)}return s}};return e});
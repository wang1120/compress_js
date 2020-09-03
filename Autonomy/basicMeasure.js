define([],function(){function e(e){this._globe=e;this._viewer=e._viewer;this._globeId=e._globeId;this._handler=new Cesium.ScreenSpaceEventHandler(this._viewer.scene.canvas);this._stkLevel=14;this._disOptions={draw:false,drawid:"",pointList:[],polyLineList:[],disLabel:null};this._areaOptions={draw:false,drawid:"",pointList:[],areaObj:null,disLabel:null,callback:null};this._heightOptions={draw:false,drawid:"",pointList:[],heightObj:null,hLabel:null,vLabel:null};this._showMenu;var P=this._globe;var H=this;this._handler.setInputAction(function(e){var i=P.getLonLatByPosition(e.position);if(H._disOptions.draw){if(H._disOptions.drawid==""){H._disOptions.pointList.splice(0);if(H._disOptions.polyLineList[0]){H._disOptions.polyLineList[0].vertexLineList.splice(0)}H._viewer.entities.remove(H._disOptions.disLabel);H._disOptions.pointList.push(i);var t={polyline:null,vertexList:null};t.polyline=H._viewer.entities.add({name:"disPolyline",polyline:{positions:new Cesium.CallbackProperty(function(){return t.vertexLineList},false),width:3,material:Cesium.Color.DARKRED.withAlpha(1)}});H._disOptions.polyLineList.push(t);H._disOptions.drawid=t.polyline.id}else{H._disOptions.pointList.push(i);var a=new Array;for(var s=0;s<H._disOptions.pointList.length;s++){var r=H._disOptions.pointList[s];a.push(r.lon);a.push(r.lat);a.push(r.alt+.5)}H._disOptions.polyLineList[0].vertexLineList=Cesium.Cartesian3.fromDegreesArrayHeights(a)}}else if(H._areaOptions.draw){if(H._areaOptions.drawid==""){if(H._areaOptions.areaObj){H._areaOptions.areaObj.vertexLineList.splice(0);H._areaOptions.areaObj.vertexList.splice(0)}H._areaOptions.pointList.splice(0);H._viewer.entities.remove(H._areaOptions.areaLabel);H._areaOptions.pointList.push(i);var t={polygon:null,polyline:null,vertexList:null,vertexLineList:null};t.polygon=H._viewer.entities.add({name:"areaPolygon",show:false,polygon:{hierarchy:new Cesium.CallbackProperty(function(){return t.vertexList},false),material:Cesium.Color.YELLOW.withAlpha(.3)}});t.polyline=H._viewer.entities.add({name:"areaPolyline",polyline:{positions:new Cesium.CallbackProperty(function(){return t.vertexLineList},false),width:4,material:Cesium.Color.LIME}});H._areaOptions.areaObj=t;H._areaOptions.drawid=t.polyline.id}else{H._areaOptions.pointList.push(i);var a=new Array;var n=new Array;for(var s=0;s<H._areaOptions.pointList.length;s++){var r=H._areaOptions.pointList[s];a.push(r.lon);a.push(r.lat);a.push(r.alt+5);n.push(r.lon);n.push(r.lat);n.push(r.alt+5)}n.push(H._areaOptions.pointList[0].lon);n.push(H._areaOptions.pointList[0].lat);n.push(H._areaOptions.pointList[0].alt+5);H._areaOptions.areaObj.vertexList=Cesium.Cartesian3.fromDegreesArrayHeights(a);H._areaOptions.areaObj.vertexLineList=Cesium.Cartesian3.fromDegreesArrayHeights(n)}}else if(H._heightOptions.draw){if(H._heightOptions.drawid==""){H._heightOptions.pointList.splice(0);if(H._heightOptions.heightObj){H._heightOptions.heightObj.s_vertexLineList.splice(0);H._heightOptions.heightObj.h_vertexLineList.splice(0);H._heightOptions.heightObj.v_vertexLineList.splice(0);H._viewer.entities.remove(H._heightOptions.heightObj.s_polyline);H._viewer.entities.remove(H._heightOptions.heightObj.h_polyline);H._viewer.entities.remove(H._heightOptions.heightObj.v_polyline)}H._viewer.entities.remove(H._heightOptions.hLabel);H._viewer.entities.remove(H._heightOptions.vLabel);H._heightOptions.hLabel=null;H._heightOptions.vLabel=null;H._heightOptions.pointList.push(i);var t={s_polyline:null,s_vertexLineList:null,h_polyline:null,h_vertexLineList:null,v_polyline:null,v_vertexLineList:null};t.s_polyline=H._viewer.entities.add({name:"sPolyline",polyline:{positions:new Cesium.CallbackProperty(function(){return t.s_vertexLineList},false),width:3,material:Cesium.Color.LIME}});t.h_polyline=H._viewer.entities.add({name:"hPolyline",polyline:{positions:new Cesium.CallbackProperty(function(){return t.h_vertexLineList},false),width:3,material:Cesium.Color.LIME}});t.v_polyline=H._viewer.entities.add({name:"vPolyline",polyline:{positions:new Cesium.CallbackProperty(function(){return t.v_vertexLineList},false),width:3,material:Cesium.Color.LIME}});H._heightOptions.heightObj=t;H._heightOptions.drawid=t.s_polyline.id}else{H._heightOptions.draw=false;H._heightOptions.drawid="";H._heightOptions.pointList.push(i);H._drawHeight(H._heightOptions.pointList)}}},Cesium.ScreenSpaceEventType.LEFT_CLICK);this._handler.setInputAction(function(e){var i=P.getLonLatByPosition(e.endPosition);if(H._disOptions.draw){if(H._disOptions.polyLineList.length>0&&H._disOptions.drawid!==""){var t=H._disOptions.pointList.slice(0);t.push(i);var a=new Array;for(var s=0;s<t.length;s++){var r=t[s];a.push(r.lon);a.push(r.lat);a.push(r.alt+.5)}H._disOptions.polyLineList[0].vertexLineList=Cesium.Cartesian3.fromDegreesArrayHeights(a)}}else if(H._areaOptions.draw){if(H._areaOptions.drawid!==""){var t=H._areaOptions.pointList.slice(0);t.push(i);var a=new Array;var n=new Array;for(var o=0;o<t.length;o++){a.push(t[o].lon);a.push(t[o].lat);a.push(t[o].alt);n.push(t[o].lon);n.push(t[o].lat);n.push(t[o].alt+1)}if(t.length>2){n.push(t[0].lon);n.push(t[0].lat);n.push(t[0].alt+1)}H._areaOptions.areaObj.vertexList=Cesium.Cartesian3.fromDegreesArrayHeights(a);H._areaOptions.areaObj.vertexLineList=Cesium.Cartesian3.fromDegreesArrayHeights(n)}}else if(H._heightOptions.draw){if(H._heightOptions.drawid!==""){var t=H._heightOptions.pointList.slice(0);t.push(i);H._drawHeight(t)}}},Cesium.ScreenSpaceEventType.MOUSE_MOVE);this._handler.setInputAction(function(e){var p=P.getLonLatByPosition(e.position);if(p.alt<0){p.alt=0}if(H._disOptions.draw){H._disOptions.pointList.push(p);var u=0;var i=500;var t=[];for(var a=1;a<H._disOptions.pointList.length;a++){var s=H._disOptions.pointList[a-1];var r=H._disOptions.pointList[a];var n=Cesium.Math.toRadians(s.lon);var o=Cesium.Math.toRadians(s.lat);var l=Cesium.Math.toRadians(r.lon);var h=Cesium.Math.toRadians(r.lat);for(var v=0;v<i;v++){var _=Cesium.Math.lerp(n,l,v/(i-1));var g=Cesium.Math.lerp(o,h,v/(i-1));var O=new Cesium.Cartographic(_,g);t.push(O)}}var d=Cesium.sampleTerrain(H._viewer.terrainProvider,H._stkLevel,t);Cesium.when(d,function(e){for(var i=0;i<e.length;i++){e[i].lon=CommonFunc.deg(e[i].longitude);e[i].lat=CommonFunc.deg(e[i].latitude);if(typeof e[i].height!=="undefined"){e[i].alt=e[i].height}else{e[i].alt=0}}for(var t=1;t<e.length;t++){var a=e[t-1];var s=e[t];var r=Cesium.Cartesian3.fromRadians(a.longitude,a.latitude);var n=Cesium.Cartesian3.fromRadians(s.longitude,s.latitude);u+=Cesium.Cartesian3.distance(r,n)}var o=new Array;for(var l=0;l<e.length;l++){o.push(e[l].lon);o.push(e[l].lat);o.push(e[l].alt+.5)}var h;if(u>1e3){h=(u/1e3).toFixed(2)+"km"}else{h=Math.round(u)+"m"}H._disOptions.polyLineList[0].vertexLineList=Cesium.Cartesian3.fromDegreesArrayHeights(o);H._disOptions.disLabel=H._viewer.entities.add({position:Cesium.Cartesian3.fromDegrees(p.lon,p.lat),label:{text:h,font:"14pt sans-serif",fillColor:Cesium.Color.YELLOW,horizontalOrigin:Cesium.HorizontalOrigin.LEFT,pixelOffset:new Cesium.Cartesian2(15,0),verticalOrigin:Cesium.VerticalOrigin.BASELINE,heightReference:Cesium.HeightReference.RELATIVE_TO_GROUND,disableDepthTestDistance:Number.POSITIVE_INFINITY}})});H._disOptions.drawid="";H._disOptions.draw=false;H._globe.globeMenu.setType(H._showMenu)}else if(H._areaOptions.draw){var m=H._areaOptions.pointList[H._areaOptions.pointList.length-1];if(m.lon!=p.lon&&m.lat!=p.lat){H._areaOptions.pointList.push(p)}var i=500;var t=[];if(H._areaOptions.pointList.length>2){var L=new Array;var C=new Array;for(var a=0;a<H._areaOptions.pointList.length;a++){var f=H._areaOptions.pointList[a];L.push(f.lon);L.push(f.lat);L.push(f.alt)}for(var a=1;a<H._areaOptions.pointList.length;a++){var s=H._areaOptions.pointList[a-1];var r=H._areaOptions.pointList[a];var n=Cesium.Math.toRadians(s.lon);var o=Cesium.Math.toRadians(s.lat);var l=Cesium.Math.toRadians(r.lon);var h=Cesium.Math.toRadians(r.lat);for(var v=0;v<i;v++){var _=Cesium.Math.lerp(n,l,v/(i-1));var g=Cesium.Math.lerp(o,h,v/(i-1));var O=new Cesium.Cartographic(_,g);t.push(O)}}for(var w=0;w<i;w++){var c=H._areaOptions.pointList[H._areaOptions.pointList.length-1];var y=Cesium.Math.toRadians(c.lon);var b=Cesium.Math.toRadians(c.lat);var M=H._areaOptions.pointList[0];var A=Cesium.Math.toRadians(M.lon);var x=Cesium.Math.toRadians(M.lat);var I=Cesium.Math.lerp(y,A,w/(i-1));var E=Cesium.Math.lerp(b,x,w/(i-1));var D=new Cesium.Cartographic(I,E);t.push(D)}var d=Cesium.sampleTerrain(H._viewer.terrainProvider,H._stkLevel,t);Cesium.when(d,function(e){for(var i=0;i<e.length;i++){e[i].lon=CommonFunc.deg(e[i].longitude);e[i].lat=CommonFunc.deg(e[i].latitude);if(typeof e[i].height!=="undefined"){e[i].alt=e[i].height}else{e[i].alt=0}}var t=new Array;for(var a=0;a<e.length;a++){t.push(e[a].lon);t.push(e[a].lat);t.push(e[a].alt)}H._areaOptions.areaObj.vertexLineList=Cesium.Cartesian3.fromDegreesArrayHeights(t)});H._areaOptions.areaObj.vertexList=Cesium.Cartesian3.fromDegreesArrayHeights(L);H._areaOptions.areaObj.polygon.show=true;var T=H._areaOptions.pointList.slice(0);var R=H._calculateArea(T);var j=R/1e6<0?(R/1e6).toFixed(4):(R/1e6).toFixed(2);H._areaOptions.areaLabel=H._viewer.entities.add({position:Cesium.Cartesian3.fromDegrees(p.lon,p.lat),label:{text:j+"km²",font:"14pt sans-serif",fillColor:Cesium.Color.YELLOW,horizontalOrigin:Cesium.HorizontalOrigin.LEFT,pixelOffset:new Cesium.Cartesian2(15,0),verticalOrigin:Cesium.VerticalOrigin.BASELINE,heightReference:Cesium.HeightReference.RELATIVE_TO_GROUND,disableDepthTestDistance:Number.POSITIVE_INFINITY}});H._areaOptions.drawid="";H._areaOptions.draw=false;if(H._areaOptions.callback)H._areaOptions.callback(H._areaOptions.areaObj);H._globe.globeMenu.setType(H._showMenu)}}else if(H._heightOptions.draw){H._heightOptions.draw=false;H._heightOptions.drawid="";H._heightOptions.pointList.push(p);H._drawHeight(H._heightOptions.pointList);H._globe.globeMenu.setType(H._showMenu)}},Cesium.ScreenSpaceEventType.RIGHT_CLICK)}e.prototype.measureDis=function(){var e=this;e._disOptions.draw=true;e._showMenu=e._globe.globeMenu._showMenu;e._globe.globeMenu.setType(false)};e.prototype.removeMeasureDis=function(){var e=this;e._disOptions.draw=false;e._disOptions.drawid="";e._disOptions.pointList.splice(0);if(e._disOptions.polyLineList.length>0){e._viewer.entities.remove(e._disOptions.polyLineList[0].polyline)}e._viewer.entities.remove(e._disOptions.disLabel);e._disOptions.polyLineList.splice(0);e._disOptions.disLabel=null};e.prototype.measureArea=function(e){var i=this;i._areaOptions.draw=true;if(e){i._areaOptions.callback=e}i._showMenu=i._globe.globeMenu._showMenu;i._globe.globeMenu.setType(false)};e.prototype.addMeasureArea=function(e){var i=e.callback?e.callback:null;var t=e.pointList?e.pointList:[];var a=this;var s=new Array;var r=new Array;for(var n=0;n<t.length;n++){var o=t[n];s.push(o.lon);s.push(o.lat);s.push(o.alt+200)}var l=a._calculateArea(t);var h={polygon:null,polyline:null,areaLabel:null,vertexLineList:null};h.polygon=a._viewer.entities.add({name:"areaPolygonAdd",show:true,polygon:{hierarchy:Cesium.Cartesian3.fromDegreesArrayHeights(s),material:Cesium.Color.YELLOW.withAlpha(.3)}});h.polyline=a._viewer.entities.add({name:"areaPolyline",polyline:{positions:new Cesium.CallbackProperty(function(){return h.vertexLineList},false),width:4,material:Cesium.Color.LIME}});h.areaLabel=a._viewer.entities.add({position:Cesium.Cartesian3.fromDegrees(t[t.length-1].lon,t[t.length-1].lat),label:{text:(l/1e6).toFixed(2)+"km²",font:"14pt sans-serif",fillColor:Cesium.Color.YELLOW,horizontalOrigin:Cesium.HorizontalOrigin.LEFT,pixelOffset:new Cesium.Cartesian2(15,0),verticalOrigin:Cesium.VerticalOrigin.BASELINE,heightReference:Cesium.HeightReference.RELATIVE_TO_GROUND,disableDepthTestDistance:Number.POSITIVE_INFINITY}});var p=500;var u=[];for(var n=1;n<t.length;n++){var v=t[n-1];var _=t[n];var g=Cesium.Math.toRadians(v.lon);var O=Cesium.Math.toRadians(v.lat);var d=Cesium.Math.toRadians(_.lon);var m=Cesium.Math.toRadians(_.lat);for(var L=0;L<p;L++){var C=Cesium.Math.lerp(g,d,L/(p-1));var f=Cesium.Math.lerp(O,m,L/(p-1));var w=new Cesium.Cartographic(C,f);u.push(w)}}for(var c=0;c<p;c++){var y=t[t.length-1];var b=Cesium.Math.toRadians(y.lon);var M=Cesium.Math.toRadians(y.lat);var A=t[0];var x=Cesium.Math.toRadians(A.lon);var I=Cesium.Math.toRadians(A.lat);var E=Cesium.Math.lerp(b,x,c/(p-1));var D=Cesium.Math.lerp(M,I,c/(p-1));var T=new Cesium.Cartographic(E,D);u.push(T)}var R=Cesium.sampleTerrain(a._viewer.terrainProvider,a._stkLevel,u);Cesium.when(R,function(e){for(var i=0;i<e.length;i++){e[i].lon=CommonFunc.deg(e[i].longitude);e[i].lat=CommonFunc.deg(e[i].latitude);if(typeof e[i].height!=="undefined"){e[i].alt=e[i].height}else{e[i].alt=0}}var t=new Array;for(var a=0;a<e.length;a++){t.push(e[a].lon);t.push(e[a].lat);t.push(e[a].alt+10)}h.vertexLineList=Cesium.Cartesian3.fromDegreesArrayHeights(t)});if(i)i(h);return h};e.prototype.removeArea=function(e){var i=this;i._viewer.entities.remove(e.polyline);i._viewer.entities.remove(e.polygon);i._viewer.entities.remove(e.areaLabel)};e.prototype.removeMeasureArea=function(){var e=this;e._areaOptions.draw=false;e._areaOptions.drawid="";e._areaOptions.pointList.splice(0);if(e._areaOptions.areaObj){e._viewer.entities.remove(e._areaOptions.areaObj.polyline);e._viewer.entities.remove(e._areaOptions.areaObj.polygon)}e._viewer.entities.remove(e._areaOptions.areaLabel);e._areaOptions.areaObj=null;e._areaOptions.areaLabel=null};e.prototype.measureHeight=function(e){var i=this;i._heightOptions.draw=true;i._showMenu=i._globe.globeMenu._showMenu;i._globe.globeMenu.setType(false)};e.prototype.removeMeasureHeight=function(){var e=this;e._heightOptions.pointList.splice(0);if(e._heightOptions.heightObj){e._heightOptions.heightObj.s_vertexLineList.splice(0);e._heightOptions.heightObj.h_vertexLineList.splice(0);e._heightOptions.heightObj.v_vertexLineList.splice(0);e._viewer.entities.remove(e._heightOptions.heightObj.s_polyline);e._viewer.entities.remove(e._heightOptions.heightObj.h_polyline);e._viewer.entities.remove(e._heightOptions.heightObj.v_polyline)}e._viewer.entities.remove(e._heightOptions.hLabel);e._viewer.entities.remove(e._heightOptions.vLabel);e._heightOptions.hLabel=null;e._heightOptions.vLabel=null;e._heightOptions.draw=false;e._heightOptions.drawid=""};e.prototype._drawHeight=function(e){var i=this;var t=new Array;var a=new Array;var s=new Array;var r=new Array;var n=new Array;var o;var l;var h;t.push(e[0].lon);t.push(e[0].lat);t.push(e[0].alt);t.push(e[e.length-1].lon);t.push(e[e.length-1].lat);t.push(e[e.length-1].alt);i._heightOptions.heightObj.s_vertexLineList=Cesium.Cartesian3.fromDegreesArrayHeights(t);var p=e[0];var u=e[e.length-1];var v=Cesium.Cartesian3.fromDegrees(p.lon,p.lat,p.alt);var _=Cesium.Cartesian3.fromDegrees(u.lon,u.lat,u.alt);o=Cesium.Cartesian3.distance(v,_);var g;var O;var d;if(p.alt<u.alt){g=p;O=u}else{g=u;O=p}d={lon:g.lon,lat:g.lat,alt:O.alt};s.push(O);s.push(d);var m=Cesium.Cartesian3.fromDegrees(O.lon,O.lat,O.alt);var L=Cesium.Cartesian3.fromDegrees(d.lon,d.lat,d.alt);l=Cesium.Cartesian3.distance(m,L);for(var C=0;C<s.length;C++){var f=s[C];a.push(f.lon);a.push(f.lat);a.push(f.alt)}i._heightOptions.heightObj.h_vertexLineList=Cesium.Cartesian3.fromDegreesArrayHeights(a);n.push(g);n.push(d);var w=Cesium.Cartesian3.fromDegrees(g.lon,g.lat,g.alt);var c=Cesium.Cartesian3.fromDegrees(d.lon,d.lat,d.alt);h=Cesium.Cartesian3.distance(w,c);for(var C=0;C<n.length;C++){var f=n[C];r.push(f.lon);r.push(f.lat);r.push(f.alt)}i._heightOptions.heightObj.v_vertexLineList=Cesium.Cartesian3.fromDegreesArrayHeights(r);i._viewer.entities.remove(i._heightOptions.hLabel);i._viewer.entities.remove(i._heightOptions.vLabel);i._heightOptions.hLabel=null;i._heightOptions.vLabel=null;i._heightOptions.hLabel=i._viewer.entities.add({position:Cesium.Cartesian3.fromDegrees(O.lon,O.lat,O.alt),label:{text:"水平距离： "+(l/1e3).toFixed(4)+"km",font:"14pt sans-serif",fillColor:Cesium.Color.YELLOW,horizontalOrigin:Cesium.HorizontalOrigin.LEFT,pixelOffset:new Cesium.Cartesian2(15,0),verticalOrigin:Cesium.VerticalOrigin.BASELINE,disableDepthTestDistance:Number.POSITIVE_INFINITY}});i._heightOptions.vLabel=i._viewer.entities.add({position:Cesium.Cartesian3.fromDegrees(g.lon,g.lat,g.alt),label:{text:"垂直距离： "+h.toFixed(4)+"m",font:"14pt sans-serif",fillColor:Cesium.Color.YELLOW,horizontalOrigin:Cesium.HorizontalOrigin.LEFT,pixelOffset:new Cesium.Cartesian2(15,0),verticalOrigin:Cesium.VerticalOrigin.BASELINE,disableDepthTestDistance:Number.POSITIVE_INFINITY}})};e.prototype._calculateArea=function(e){var o=6371e3;var l=2*Math.PI*o/360;var h=Math.PI/180;var p=180/Math.PI;function i(e){if(e.length>2){var i=a(e);if(i>1e6){i=t(e)}}return i}function t(e){var i=0;for(var t=0;t<e.length;t++){var a=(t+1)%e.length;var s=(t+2)%e.length;i+=u(e[t],e[a],e[s])}var r=(e.length-2)*180;var n=i-r;if(n>420){i=e.length*360-i;n=i-r}else if(n>300&&n<420){n=Math.abs(360-n)}return n*h*o*o}function u(e,i,t){var a=n(i,e);var s=n(i,t);var r=a-s;if(r<0){r+=360}return r}function n(e,i){var t=e.lat*h;var a=e.lon*h;var s=i.lat*h;var r=i.lon*h;var n=-Math.atan2(Math.sin(a-r)*Math.cos(s),Math.cos(t)*Math.sin(s)-Math.sin(t)*Math.cos(s)*Math.cos(a-r));if(n<0){n+=Math.PI*2}n=n*p;return n}function a(e){var i=0;for(var t=0;t<e.length;++t){var a=(t+1)%e.length;var s=e[t].lon*l*Math.cos(e[t].lat*h);var r=e[t].lat*l;var n=e[a].lon*l*Math.cos(e[a].lat*h);var o=e[a].lat*l;i+=s*o-n*r}return Math.abs(i/2)}return i(e)};return e});
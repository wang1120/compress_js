define([], function () {
    function OverlayAnalyse(globe) {
        var self = this;
        this._globe = globe;
        this._viewer = globe._viewer;
        this._entityList = [];
        /*
         * 2019/11/2
         * @author wangchenglei
         * @method   overlay
         * @for null
         * @param {overlayUrl} 叠加分析服务地址
         * @param {dataUrl} 数据服务地址
         * @param {operateDataset} 运算数据集
         * @param {resultDataset} 分析结果数据集
         * @param {operation}  叠加分析方式
         * @return {null} null
         */

        OverlayAnalyse.prototype.execute = function (options) {
            var self = this;

            var m_overlayUrl = options.overlayUrl ? options.overlayUrl : '';
            var m_dataUrl = options.dataUrl ? options.dataUrl : '';
            var m_operateDataset = options.operateDataset ? options.operateDataset : '';
            var m_resultDataset = options.resultDataset ? options.resultDataset : 'overlayDataset';
            var m_operation = options.operation ? options.operation : 'CLIP';
            var m_deleteExistResultDataset = options.deleteExistResultDataset ? options.deleteExistResultDataset : true;
            var m_polygonColor = options.polygonColor ? options.polygonColor : new Cesium.Color(1, 0, 0, 0.5);
            var m_outlineColor = options.polygonColor ? options.polygonColor : new Cesium.Color(0, 1, 0, 0.8);
            var queryObj = {
                dataReturnOption: {
                    dataset: m_resultDataset,
                    dataReturnMode: "DATASET_ONLY",
                    expectCount: 1000,
                    deleteExistResultDataset: m_deleteExistResultDataset
                },
                operateDataset: m_operateDataset,
                operateDatasetFilter: {attributeFilter: ""},
                operation: m_operation,
                sourceDatasetFilter: {attributeFilter: ""},
                tolerance: 0,
				sourceDatasetFields:[]
            }

            var queryObjJSON = JSON.stringify(queryObj);
            $.ajax({
                url: m_overlayUrl,
                async: true,
                data: queryObjJSON,
                method: "POST"
            }).done(function (data) {
                var resultUrl = m_dataUrl + m_resultDataset + "/features";
                $.ajax({
                    url: resultUrl + ".json",
                    method: "GET"
                }).done(function (data) {
                    for (let i = 0; i < data.featureCount; i++) {
                        $.ajax({
                            url: resultUrl + "/" + (i + 1) + ".json",
                            method: "GET"
                        }).done(function (data) {
                            if (data.geometry != null) {
                                var points = self.convertPoint3Ds(data.geometry.points);
                                var entityId = "overlay_entity" + i;
                                self._viewer.entities.add({
                                    id: entityId,
                                    polygon: {
                                        hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(points),
                                        material: m_polygonColor,
                                        // material: new Cesium.ImageMaterialProperty({
                                        //     image: "./images/办公地.jpg"
                                        // }),

                                        height: 5,
                                        outline: true,
                                        outlineColor: m_outlineColor
                                    }
                                });
                                self._entityList.push(entityId);
                            }
                        })
                    }
                })
            })
            return true;
        }
        /*
         * 2019/11/7 0007
         * @author wangchenglei
         * @method  {Object}
         * @for {Object}
         * @param {Object}
         * @return {Object}
         */
        OverlayAnalyse.prototype.convertPoint3Ds = function (points) {
            var Cesiumpoints = [];
            for (var i = 0, len = points.length - 1; i < len; i++) {
                Cesiumpoints.push(points[i].x)
                Cesiumpoints.push(points[i].y)
                Cesiumpoints.push(points[i].z)
            }
            return Cesiumpoints;
        }

        // var getDatasetName = function (name) {
        //     var end = name.indexOf("@");
        //     return name.substr(0, end);
        // }
        /*
         * 2019/11/7 0007
         * @author wangchenglei
         * @method  {Object}
         * @for {Object}
         * @param {Object}
         * @return {Object}
         */
        OverlayAnalyse.prototype.clear = function () {
            var self = this;
            var len = self._entityList.length;
            if (len > 0) {
                for (var i = 0; i < len; i++) {
                    var entity = self._viewer.entities.getById(self._entityList[i]);
                    self._viewer.entities.remove(entity);
                }
            }
        }
    }


    return OverlayAnalyse;
})
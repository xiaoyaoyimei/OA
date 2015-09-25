/**
 * Created by caoyu on 2015/7/10.
 */
angular.module('app.product')

	.factory('unitService', ["$http", "config", function ($http, config) {
		var baseUrl = config.baseUrl;
		return {
			getUnits: function (companyId, callback) {
				var url = baseUrl + "/units?companyId="+companyId;
				$http.get(url)
					.success(function (res) {
						if (res.statusCode == 200) {
							callback(null, res);
						} else {
							callback(res.message);
						}
					}).error(function (err) {
						callback(err);
					});
			},
			deleteUnit: function (id, callback) {
				var url = baseUrl + "/units/" + id;
				$http.delete(url, {"id": id})
					.success(function (res) {
						if (res.statusCode == 200) {
							callback(null, res);
						} else {
							callback(res.message);
						}
					}).error(function (err) {
						callback(err);
					});
			},
			getUnitById: function (id, callback) {
				var url=baseUrl + "/units/" + id;
				$http.get(url)
					.success(function (res) {
						if (res.statusCode == 200) {
							callback(null, res);
						} else {
							callback(res.message);
						}
					}).error(function (err) {
						callback(err);
					});
			},
			updateUnit:function(id,unit,callback){
				var url=baseUrl + "/units/" + id;
				$http.post(url,unit)
					.success(function (res) {


						if (res.statusCode == 200) {
							callback(null, res);
						} else {
							callback(res.message);
						}
					}).error(function (err) {
						callback(err);
					});
			},
			addUnit:function(unit,callback){
				var url=baseUrl + "/units";
				$http.post(url,unit)
					.success(function (res) {

						if (res.statusCode == 200) {
							callback(null, res);
						} else {

							callback(res.message);
						}
					}).error(function (err) {
						callback(err);
					});
			}
		}
	}]);
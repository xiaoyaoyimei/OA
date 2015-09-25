/**
 * Created by caoyu on 2015/7/9.
 */
angular.module('app.product')
	.factory('attributeService', ["$http", "config", function ($http, config) {
		var baseUrl = config.baseUrl;
		return {
			getAttributes: function (companyId,callback) {
				var url = baseUrl + "/attributes?companyId="+companyId;
				console.log(url);
				$http.get(url)
					.success(function (res) {
						console.log(res);
						if (res.statusCode == 200) {
							callback(null, res);
						} else {
							callback(res.message);
						}
					}).error(function (err) {
						callback(err);
					});
			},
			deleteAttribute: function (id, callback) {
				var url = baseUrl + "/attributes/" + id;
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
			getAttributeById: function (id, callback) {
				var url=baseUrl + "/attributes/" + id;
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
			updateAttribute:function(id,attribute,callback){
				var url=baseUrl + "/attributes/" + id;
				$http.post(url,attribute)
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
			addAttribute:function(attribute,callback){
				var url=baseUrl + "/attributes";
				$http.post(url,attribute)
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


			getAttributeValues: function (attributeId,callback) {
				var url = baseUrl + "/attributes/"+attributeId+"/values";
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
			deleteAttributeValue: function (attributeId,id, callback) {
				var url = baseUrl + "/attributes/"+attributeId+"/values/" + id;
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
			getAttributeValueById: function (attributeId,id, callback) {
				var url=baseUrl + "/attributes/" +attributeId+"/values"+ id;
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
			updateAttributeValue:function(attributeId,id,attribute,callback){
				var url=baseUrl + "/attributes/"+attributeId+"/values" + id;
				$http.post(url,attribute)
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
			addAttributeValue:function(attributeId,attributeValue,callback){
				var url=baseUrl + "/attributes/"+attributeId+"/values";
				$http.post(url,attributeValue)
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
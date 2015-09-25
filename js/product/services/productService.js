angular.module('app.product')

	.factory('productService', ["$http", "config", function ($http, config) {
		var baseUrl = config.baseUrl;

		return {
			getProducts: function (pager,categoryId,query,companyId,callback) {
				var url = "api/hotitem";
				$http.get(url, {params: pager})
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
			deleteProduct: function (id, callback) {
				var url = baseUrl + "/products/" + id;
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
			getProductById: function (id, callback) {
				var url="api/hotitem" ;
				$http.get(url)
					.success(function (res) {
						if (res.statusCode == 200) {
							alert(res);
							callback(null, res);
						} else {
							callback(res.message);
						}
					}).error(function (err) {
						callback(err);
					});
			},
			updateProduct:function(id,prodcut,callback){
				var url=baseUrl + "/products/" + id;
				$http.post(url,prodcut)
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
			addProduct:function(prodcut,callback){
				var url=baseUrl + "/products";
				$http.post(url,prodcut)
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




		}}]);
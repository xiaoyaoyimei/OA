/**
 * Created by caoyu on 2015/7/9.
 */
angular.module('app.product')
	.factory('categoryService', ["$http", "config", function ($http, config) {

		var baseUrl = config.baseUrl;
		return {
			getCategories: function ( companyId,callback) {
				var url='api/categories';
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
			deleteCategory: function (id, callback) {
				var url = baseUrl + "/categories/" + id;
				$http.delete(url, {"id": id})
					.success(function (res) {
						if (res.statusCode == 200) {
							callback(null, res);
						} else {
							res.message="该分类下有产品！无法删除";
							callback(res.message);
						}
					}).error(function (err) {
						callback(err);
					});
			},
			getCategoryById: function (id, callback) {
				var url='api/categories';
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
			updateCategory:function(id,category,callback){
				var url=baseUrl + "/categories/" + id;
				$http.post(url,category)
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
			addCategory:function(category,callback){
					var url=baseUrl + "/categories";
					$http.post(url,category)
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



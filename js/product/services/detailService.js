/**
 * Created by caoyu on 2015/7/9.
 */
angular.module('app.product')
	.factory('detailService', ["$http", "config", function ($http, config) {
		var baseUrl = config.baseUrl;
	}]);
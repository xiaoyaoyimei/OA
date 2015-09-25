angular.module('app.cart')

	.factory('cartService',["$http", "config", function($http, config){
		var baseUrl = config.baseUrl;
	}]);
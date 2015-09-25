angular.module('app.product')
	.controller('detailCtrl',['$scope','$rootScope', '$location', '$interval', '$modal', '$routeParams', 'productService',
		function ($scope,$rootScope,$location, $interval, $modal,$routeParams,productService) {
			var productId=$routeParams.pid;
			$scope.image = [];
			$scope.getProductById=function () {
				if (productId) {
					productService.getProductById(productId, function (err, res) {
						$scope.loading = false;
						if (err || !res) {
							$scope.errMsg = "获取商品失败";
						} else {

							$scope.product = res.data;
						}
					});
				}

			}
			//详情页图片轮播

			$scope.slides= function () {
				// 设置轮播图图片间隔
				$scope.myInterval = 5000;
				// 轮播图数据初始化
				var slides = $scope.slides = [];
				// 添加轮播图源
		/*		for (var i=0;i<$scope.image.length();i++)
				slides.push({ image:$scope.image[i]});*/

			};
			$scope.slides();

			$scope.getProductById();
			$scope.choosebt=false;
			$scope.chooseBt= function () {
				$scope.choosebt=!$scope.choosebt;

			}
		}]);
/**
 * Created by caoyu on 2015/7/9.
 */
angular.module('app.product')
	.controller('attributeCtrl', ['$scope', 'attributeService', '$location', '$interval', '$modal','loginService', function ($scope, attributeService, $location, $interval, $modal,loginService) {
		var user=loginService.getUser();
		var companyId=user.company.id;


		$scope.getAttributes = function () {
			$scope.loading = true;
			attributeService.getAttributes(companyId,function (err, res) {
				$scope.loading = false;
				if (err) {
					$scope.errMsg = err;
				} else {
					$scope.attributes = res.data;

				}
			});
		};
		$scope.getAttributes();
		$scope.addAttribute = function () {
			var modalInstance = $modal.open({
				templateUrl: 'partials/products/attributeDetail.html',
				controller: 'newAttributeCtrl',
				backdrop: 'static',
				resolve: {
					attribute: function () {
						return null;
					}
				}
			});
			modalInstance.result.then(function () {
				$scope.getAttributes();
			});
		};
		$scope.updateAttribute = function (attribute) {
			var modalInstance = $modal.open({
				templateUrl: 'partials/products/attributeDetail.html',
				controller: 'newAttributeCtrl',
				backdrop: 'static',
				resolve: {
					attribute: function () {
						return attribute;
					}
				}
			});
			modalInstance.result.then(function () {
				$scope.getAttributes();
			});
		};
		$scope.deleteAttribute=function(attribute){
			attributeService.deleteAttribute(attribute.id, function (err, res) {
				$scope.loading = false;
				if (err) {
					$scope.errMsg = "删除失败！该属性下存在属性值";
				} else {
					$scope.getAttributes();
				}
			});
		};

		$scope.editAttributeValue=function(attribute){
			var modalInstance = $modal.open({
				templateUrl: 'partials/products/attributeValueDetail.html',
				controller: 'newAttributeValueCtrl',
				backdrop: 'static',
				resolve: {
					attribute: function () {
						return attribute;
					}
				}
			});
			modalInstance.result.then(function () {
				$scope.getAttributes();
			});
		};


	}])
	.controller('newAttributeCtrl', ['$scope', 'attributeService', 'attribute', '$location', '$interval', '$modal', '$modalInstance', function ($scope, attributeService, attribute, $location, $interval, $modal, $modalInstance) {
		$scope.attribute={};
		$scope.title = "新增属性";
		if (attribute) {
			$scope.title = "修改属性";
			$scope.attribute=attribute;
		}
		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

		$scope.ok = function () {

			if (!$scope.attribute.name) {
				$scope.errMsg = "请输入属性名";
				return;
			}
			$scope.loading = true;
			if (attribute) {
				attributeService.updateAttribute(attribute.id, $scope.attribute, function (err, res) {
					$scope.loading = false;
					if (err || !res) {
						$scope.errMsg = "修改失败";
					} else {
						$modalInstance.close();
					}
				});
			} else {
				$scope.loading = true;

				attributeService.addAttribute($scope.attribute, function (err, res) {
					$scope.loading = false;
					if (err || !res) {
						$scope.errMsg = "添加失败";
					} else {
						$modalInstance.close();
					}
				});
			}
		}


	}])
	.controller('newAttributeValueCtrl', ['$scope', 'attributeService', 'attribute', '$location', '$interval', '$modal', '$modalInstance', function ($scope, attributeService, attribute, $location, $interval, $modal, $modalInstance) {

		$scope.attributeValue={};

		$scope.title = "编辑"+attribute.name+"属性值：";
		$scope.attribute=attribute;

		$scope.cancel = function () {
			$modalInstance.close();
		};
		$scope.addAttributeValue=function(attribute,attributeValue){
			if(!attributeValue.value){
				$scope.errMsg = "请输入属性值";
				return;
			}
			$scope.loading = true;
			attributeValue.attributeId=attribute.id;
			attributeService.addAttributeValue(attribute.id,attributeValue,function(err, res){
				$scope.loading = false;
				if (err || !res) {
					$scope.errMsg = "添加失败";
				} else {
					$scope.loading = true;
					attributeService.getAttributeById(attribute.id, function (err,res) {
						$scope.loading = false;
						if (err || !res) {
							$scope.errMsg = "获取失败";
						} else {
							$scope.attribute=res.data;
						}
					})
				}
			})
		};
		$scope.deleteAttributeValue= function (attribute,attributeValue) {
			$scope.loading = true;
			attributeService.deleteAttributeValue(attribute.id,attributeValue.id,function(err, res){
				$scope.loading = false;
				if (err || !res) {
					$scope.errMsg = "删除失败！该属性值已被使用";
				} else {
					$scope.loading = true;
					attributeService.getAttributeById(attribute.id, function (err,res) {
						$scope.loading = false;
						if (err || !res) {
							$scope.errMsg = "获取失败";
						} else {
							$scope.attribute=res.data;
						}
					})
				}
			})
		};
		$scope.ok = function () {

			$modalInstance.close();
		}



	}]);

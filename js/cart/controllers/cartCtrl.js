angular.module('app.cart')

	.controller('cartCtrl', ["$scope","homeService",
		function($scope,homeService) {
		 $scope.getshopcart = function() {
			homeService.getshopcart(function (err, res) {
				if (err) {
					$scope.errMsg = err;
				} else {
					$scope.shopcart=res.data;
				}
			})
		};
			$scope.checked=true;
			$scope.chooseAll=function(){
				$scope.checked=!$scope.checked;
			};
			$scope.getshopcart();
			$scope.treeOptions = {
			accept: function(sourceNodeScope, destNodesScope, destIndex) {
				return true;
			},

		};
		$scope.remove = function(scope) {
			alert(JSON.stringify(scope));
			scope.remove();
		};
		$scope.editCategory = function(scope) {

		};
		$scope.toggle = function(scope) {
			scope.toggle();
		};
		$scope.moveLastToTheBegginig = function() {
			var a = $scope.data.pop();
			$scope.data.splice(0, 0, a);
		};
		$scope.newSubItem = function(scope) {
			var nodeData = scope.$modelValue;
			nodeData.nodes.push({
				id: nodeData.id * 10 + nodeData.nodes.length,
				title: nodeData.title + '.' + (nodeData.nodes.length + 1),
				nodes: []
			});
		};
		var getRootNodesScope = function() {
			return angular.element(document.getElementById("tree-root")).scope();
		};
		$scope.collapseAll = function() {
			var scope = getRootNodesScope();
			scope.collapseAll();
		};
		$scope.expandAll = function() {
			var scope = getRootNodesScope();
			scope.expandAll();
		};
		$scope.data = [];

		$scope.addCategory = function() {
			$scope.data.push({id:1,title:"纯果汁",nodes:[]});
		};

	}])

.controller('settlementCtrl',["$scope", '$modal',
		function($scope,$modal) {
			$scope.chooseSaddress=function(){
				var modalInstance = $modal.open({
					templateUrl: "partials/cart/chooseSaddress.html",
					controller: 'chooseSaddressCtrl',
					backdrop: 'static',
					resolve: {
					}
				});
			};
	}])
	.controller('chooseSaddressCtrl',["$scope",'$modal','$modalInstance',
		function($scope,$modal,$modalInstance){

			$scope.editSaddress=function(){
				var modalInstance = $modal.open({
					templateUrl: "partials/cart/editSaddress.html",
					controller: 'editSaddressCtrl',
					backdrop: 'static',
					resolve: {
					}
				});
			}
			$scope.addSaddress=function(){
				var modalInstance = $modal.open({
					templateUrl: "partials/cart/addSaddress.html",
					controller: 'addSaddressCtrl',
					backdrop: 'static',
					resolve: {
					}
				});
			}
			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};

	}])
	.controller('editSaddressCtrl',["$scope",'$modalInstance',
		function($scope,$modalInstance){
			$scope.cancel = function () {
				$modalInstance.dismiss('cancel');
			};

		}
	]);
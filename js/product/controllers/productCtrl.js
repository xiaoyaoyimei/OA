angular.module('app.product')
	.controller('productCtrl',['$scope','$rootScope', 'productService', '$location', '$interval', '$modal', '$routeParams','loginService','homeService', 'categoryService',
		function ($scope,$rootScope, productService, $location, $interval, $modal,$routeParams, loginService, homeService,categoryService) {

			var companyId=1;
			$scope.ordernumber=0;
			$scope.ordertotalprice=0;
			$scope.choose=function(c) {
				$scope.selectedCategory=c;
				$scope.getProducts();
			}

			/*	var user = loginService.getUser();

			 var companyId = user.company.id;*/
			var orderItem={};
			$scope.addcart=function(p) {
				var modalInstance = $modal.open({
					templateUrl: "partials/home/addtocart.html",
					controller: 'addtocartCtrl',
					backdrop: 'static',
					resolve: {
						product: function () {
							return p;
						}
					}
				});
				modalInstance.result.then(function (orderItem) {
					orderItem=orderItem;
					$scope.ordernumber += orderItem.quantity;
					$scope.ordertotalprice+=  parseInt(orderItem.retailPrice)*parseInt(orderItem.quantity);

				});
			}
			$scope.placeorder=function(orderItem){

				$location.path("/cart");

			}
			$scope.pager = {
				pageNo: 1,
				totalItems: 0,
				itemsPerPage: 10
			};
			$scope.selectedCategory = {
				id: 1
			};
			var categories = [];
			$scope.getCategories = function () {
				$scope.loading = true;
				categoryService.getCategories(companyId, function (err, res) {
					$scope.loading = false;
					if (err) {
						$scope.errMsg = err;
					} else {
						categories = res.data;
						$scope.filterCategories(categories);
						// $scope.categories =[{"id":1,"deleteStatus":false,"companyId":1,"name":"全部分类","description":null,"parentId":1,"level":0,"children":[{"id":2,"deleteStatus":false,"companyId":1,"name":"纯果汁","description":null,"parentId":1,"level":0,"children":[{"id":28,"deleteStatus":false,"companyId":1,"name":"啊啊","description":null,"parentId":13,"level":1,"children":null}]},{"id":3,"deleteStatus":false,"companyId":1,"name":"果蔬汁","description":null,"parentId":2,"level":0,"children":null},{"id":4,"deleteStatus":false,"companyId":1,"name":"代餐饮","description":null,"parentId":3,"level":0,"children":null},{"id":5,"deleteStatus":false,"companyId":1,"name":"混合果汁","description":null,"parentId":4,"level":0,"children":null},{"id":6,"deleteStatus":false,"companyId":1,"name":"特惠果汁","description":null,"parentId":5,"level":0,"children":null},{"id":7,"deleteStatus":false,"companyId":1,"name":"啊啊","description":null,"parentId":2,"level":0,"children":null},{"id":8,"deleteStatus":false,"companyId":1,"name":"啊实打实","description":null,"parentId":1,"level":0,"children":null},{"id":13,"deleteStatus":false,"companyId":1,"name":"新品","description":null,"parentId":2,"level":0,"children":null},{"id":27,"deleteStatus":false,"companyId":1,"name":"啊","description":null,"parentId":13,"level":1,"children":null}]}]
					}
				});
			};


			$scope.getCategories();

			$scope.filterCategories = function (categories) {
				var newCategories = [];
				for (var i = 0; i < categories.length; i++) {
					if (categories[i].level == 1) {
						newCategories.push(categories[i]);
					}
					var children = [];
					for (var j = 0; j < categories.length; j++) {
						if (categories[i] != categories[j] && categories[i].id == categories[j].parentId) {
							children.push(categories[j]);
						}
						var children2 = [];
						for (var k = 0; k < categories.length; k++) {
							if (categories[j] != categories[k] && categories[j].id == categories[k].parentId) {
								children2.push(categories[k]);
							}
						}
						categories[j].children = children2;
					}
					categories[i].children = children;
				}

				$scope.categories = newCategories;
				$scope.selectedCategory = newCategories[0];
				$scope.getProducts(0);
			};

			$scope.showcategory = true;
			$scope.getProducts = function (s) {

				$scope.loading = true;
				if(s==1) {
					$scope.showcategory = false;
				}
				productService.getProducts({
					pageNo: $scope.pager.pageNo,
					pageSize: $scope.pager.itemsPerPage
				}, $scope.selectedCategory.id, $scope.query, companyId,
					function (err, res) {
					$scope.loading = false;
					if (err) {
						$scope.errMsg = err;
					} else {
						$scope.products = res.data;
						$scope.pager.totalItems = res.totalItems;
					}
				});


			};

			var query = $routeParams.query;
			if(query){

				if(query==0){

					$scope.getProducts(0);
				}
				else{
					$scope.query=query;

				$scope.getProducts(1);
				}
			}


			$scope.setPage = function () {
				$scope.getProducts();
			};

			$scope.addProduct = function () {
				$location.path("/products/detail");
			};

			$scope.updateProduct = function (p) {

				$location.path("/products/detail/" + p.id);
			};

			$scope.deleteProduct = function (p) {
				$scope.loading = true;
				productService.deleteProduct(p.id, function (err, res) {
					$scope.loading = false;
					if (err) {
						$scope.errMsg = err;
					} else {
						$scope.getProducts();
					}
				});
			};

		}])


	.controller('newProductCtrl', ['$scope', '$location', '$routeParams', 'productService', 'attributeService', 'categoryService', 'unitService', 'loginService',
		function ($scope, $location, $routeParams, productService, attributeService, categoryService, unitService, loginService) {
			var user = loginService.getUser();

			var companyId = user.company.id;

			var changed = false;
			$scope.ischanged = function () {
				changed = true;
			};
			$scope.product = {};
			$scope.title = "新增商品";
			var productId = $routeParams.productId;


			$scope.getUnits = function () {
				$scope.loading = true;
				unitService.getUnits(companyId, function (err, res) {
					$scope.loading = false;
					if (err) {
						$scope.errMsg = err;
					} else {
						$scope.units = res.data;
						$scope.selectedUnit = $scope.units[0];
						if (productId) {
							$scope.title = "编辑商品";
							$scope.loading = true;
							productService.getProductById(productId, function (err, res) {
								$scope.loading = false;
								if (err || !res) {
									$scope.errMsg = "获取商品失败";
								} else {
									$scope.product = res.data;

									for (var i = 0; i < $scope.categories.length; i++) {
										var cat = $scope.categories[i];
										if (cat.id == $scope.product.category.id)
											$scope.selectedCategory = cat;
									}
									for (var i = 0; i < $scope.units.length; i++) {
										var un = $scope.units[i];
										if (un.id == $scope.product.unit.id)
											$scope.selectedUnit = un;
									}
									for (var i = 0; i < $scope.attributes.length; i++) {
										var a = $scope.attributes[i];
										for (var j = 0; j < a.attributeValues.length; j++) {
											var av = a.attributeValues[j];
											for (var k = 0; k < $scope.product.attributes.length; k++) {
												var pa = $scope.product.attributes[k];
												if (a.id == pa.id) {
													for (var l = 0; l < pa.attributeValues.length; l++) {
														var pav = pa.attributeValues[l];
														if (av.id == pav.id) {
															av.checked = true;


														}

													}

												}

											}

										}


									}
								}
							});
						}
					}
				})
			};

			$scope.checkAttributeValue = function (attributeValue) {
				var checked = attributeValue.checked = !attributeValue.checked;
			};
			$scope.getAttributes = function () {
				$scope.loading = true;
				attributeService.getAttributes(companyId, function (err, res) {
					$scope.loading = false;
					if (err) {
						$scope.errMsg = err;
					} else {
						$scope.attributes = res.data;
						$scope.getUnits();

					}
				});
			};

			$scope.getCategories = function () {
				$scope.loading = true;
				categoryService.getCategories(companyId, function (err, res) {
					$scope.loading = false;
					if (err) {
						$scope.errMsg = err;
					} else {
						$scope.categories = res.data;
						$scope.selectedCategory = $scope.categories[0];
						$scope.getAttributes();
					}
				})
			};

			$scope.getCategories();
		}]);



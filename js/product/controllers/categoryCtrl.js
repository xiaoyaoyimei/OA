/**
 * Created by caoyu on 2015/7/9.
 */
angular.module('app.product')
	.controller('categoryCtrl', ['$scope', 'categoryService', '$location', '$interval', '$modal','loginService', function ($scope, categoryService, $location, $interval, $modal,loginService) {
		var user=loginService.getUser();
		var companyId=user.company.id;
		$scope.showOnMenu=false;
		var categories=[];
		$scope.getCategories = function () {
			$scope.loading = true;
			categoryService.getCategories(companyId,function (err, res) {
				$scope.loading = false;
				if (err) {
					$scope.errMsg = err;
				} else {
					categories=res.data;
					$scope. filterCategories(categories);
					// $scope.categories =[{"id":1,"deleteStatus":false,"companyId":1,"name":"全部分类","description":null,"parentId":1,"level":0,"children":[{"id":2,"deleteStatus":false,"companyId":1,"name":"纯果汁","description":null,"parentId":1,"level":0,"children":[{"id":28,"deleteStatus":false,"companyId":1,"name":"啊啊","description":null,"parentId":13,"level":1,"children":null}]},{"id":3,"deleteStatus":false,"companyId":1,"name":"果蔬汁","description":null,"parentId":2,"level":0,"children":null},{"id":4,"deleteStatus":false,"companyId":1,"name":"代餐饮","description":null,"parentId":3,"level":0,"children":null},{"id":5,"deleteStatus":false,"companyId":1,"name":"混合果汁","description":null,"parentId":4,"level":0,"children":null},{"id":6,"deleteStatus":false,"companyId":1,"name":"特惠果汁","description":null,"parentId":5,"level":0,"children":null},{"id":7,"deleteStatus":false,"companyId":1,"name":"啊啊","description":null,"parentId":2,"level":0,"children":null},{"id":8,"deleteStatus":false,"companyId":1,"name":"啊实打实","description":null,"parentId":1,"level":0,"children":null},{"id":13,"deleteStatus":false,"companyId":1,"name":"新品","description":null,"parentId":2,"level":0,"children":null},{"id":27,"deleteStatus":false,"companyId":1,"name":"啊","description":null,"parentId":13,"level":1,"children":null}]}]
				}
			});
		};


		$scope.getCategories();

		$scope. filterCategories=function(categories){
			var newCategories=[];
			for(var i=0;i<categories.length;i++){
				if(categories[i].level==1){
					newCategories.push(categories[i]);
				}
				var children=[];
				for(var j=0;j<categories.length;j++){
					if(categories[i]!=categories[j]&&categories[i].id==categories[j].parentId){
						children.push(categories[j]);
					}
					var children2=[];
					for(var k=0;k<categories.length;k++){
						if(categories[j]!=categories[k]&&categories[j].id==categories[k].parentId){
							children2.push(categories[k]);
						}
					}
					categories[j].children=children2;
				}
				categories[i].children=children;


			}




			$scope.categories=newCategories;
			$scope.selectedCategory =newCategories[0];

		};




		$scope.deleteCategory = function (category) {
			$scope.loading = true;
			categoryService.deleteCategory(category.id, function (err, res) {
				$scope.loading = false;
				if (err) {
					$scope.errMsg = err;
				} else {
					$scope.categories = res.data;

				}
			})
		};

		$scope.selectRestaurant = function ( category) {

			$scope.selectedCategory = category;


		};





		$scope.addCategory = function () {

			if (!$scope.selectedCategory) {
				$scope.errMsg = "请选中一个分类";
				return;
			}
			if ($scope.selectedCategory.level >= 2) {
				$scope.errMsg = "目录不能超过3级";
				return;
			}
			if(!$scope.name){
				$scope.errMsg = "请输入分类名";
				return;
			}
			var category={};
			category.parentId = $scope.selectedCategory.id;
			category.level = $scope.selectedCategory.level + 1;
			category.name=$scope.name;
			category.showOnMenu=$scope.showOnMenu;
			$scope.loading =true;
			categoryService.addCategory(category,function(err, res){
				$scope.loading = false;
				if (err) {
					$scope.errMsg = err;
				} else {
					$scope.getCategories();
				}

			});

		};
		$scope.updateCategory = function () {
			if (!$scope.selectedCategory) {
				$scope.errMsg = "请选中一个分类";
				return;
			}
			if(!$scope.selectedCategory.name){
				$scope.errMsg = "请输入分类名";
				return;
			}
			$scope.loading =true;
			categoryService.updateCategory($scope.selectedCategory.id, $scope.selectedCategory, function (err, res) {
				$scope.loading = false;
				if (err || !res) {
					$scope.errMsg = "修改失败";
				} else {

				}
			});
		};
		$scope.deleteCategory = function (category) {
			$scope.loading =true;
			categoryService.deleteCategory(category.id, function (err, res) {
				$scope.loading = false;
				if (err) {
					$scope.errMsg = err;
				} else {
					$scope.getCategories();
				}
			});
		};

	}]);

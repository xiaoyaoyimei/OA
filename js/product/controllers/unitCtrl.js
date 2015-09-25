/**
 * Created by caoyu on 2015/7/10.
 */
angular.module('app.product')
	.controller('unitCtrl','loginService', ['$scope', 'unitService', '$location', '$interval', '$modal', function ($scope, unitService, $location, $interval, $modal,loginService) {

		var user=loginService.getUser();
		var companyId=user.company.id;

		$scope.getUnits= function () {
			$scope.loading = true;
			unitService.getUnits( companyId,function (err, res) {
				$scope.loading = false;
				if (err) {
					$scope.errMsg = err;
				} else {
					$scope.units = res.data;
				}
			})};
		getUnits();

	}]);
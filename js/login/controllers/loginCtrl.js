angular.module('app.login')

    .controller('loginCtrl',['$rootScope','$location','$modal', '$scope', 'loginService',
        function($rootScope, $location,$modal, $scope, loginService){
            $scope.forgetP=function(){
                var modalInstance = $modal.open({
                    templateUrl: "partials/login/forgetpassword.html",
                    controller: 'forgetPCtrl',
                    backdrop: 'static',
                    resolve: {
                    }
                });
            }
  /*          var user = loginService.getUser();
            if(user) {
                $rootScope.user = user;
                $location.path("/profile");
                return;
            }
*/
            $scope.loading = false;

            $scope.login = function() {
                $scope.errMsg = null;

                if(!$scope.userName){
                    $scope.errMsg = "请输入用户名";
                    return;
                }

                if(!$scope.password){
                    $scope.errMsg = "请输入密码";
                    return;
                }

                $scope.loading = true;
                loginService.login($scope.userName, $scope.password, function(err, userInfo) {
                    $scope.loading = false;

                    if(err || !userInfo) {
                        $scope.errMsg = "用户名或密码错误";
                        return;
                    }

                    if(userInfo) {
                        $scope.errMsg = null;
                        $rootScope.user = userInfo;
                        $location.path("/profile");
                        return;
                    }

                    $scope.errMsg = "登录失败";
                });
            };

        }])
    .controller('forgetPCtrl',['$scope','$modalInstance',
    function($scope, $modalInstance){
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }]

    );
angular.module('app.login')

    .controller('loginCtrl',['$location', '$scope', 'loginService',
        function($location, $scope, loginService){

            /*	var user = loginService.getUser();


             if(user) {
             $location.path("/profile");
             return;
             }*/

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
                        $location.path("/profile");
                        return;
                    }

                    $scope.errMsg = "登录失败";
                });
            };
            $scope.adduser = function() {

            }
        }]);

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
                    $scope.errMsg = "�������û���";

                    return;
                }

                if(!$scope.password){
                    $scope.errMsg = "����������";
                    return;
                }

                $scope.loading = true;
                loginService.login($scope.userName, $scope.password, function(err, userInfo) {
                    $scope.loading = false;

                    if(err || !userInfo) {
                        $scope.errMsg = "�û������������";
                        return;
                    }

                    if(userInfo) {
                        $scope.errMsg = null;
                        $location.path("/profile");
                        return;
                    }

                    $scope.errMsg = "��¼ʧ��";
                });
            };
            $scope.adduser = function() {

            }
        }]);

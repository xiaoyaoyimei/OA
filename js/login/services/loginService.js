angular.module('app.login')

    .factory('loginService',["$http", "config", function($http, config){
        var baseUrl = config.baseUrl;

        var user = null;

        var _login = function(userName, password, callback) {
            var url = baseUrl + "/login";
            $http.post(url, {userName:userName, password: password})
                .success(function(res){
                    if(res.statusCode == 200) {
                        user = res.data;
                        //保存用户信息
                        localStorage.user = JSON.stringify(user);
                        callback(null, user);
                    } else {
                        user = null;
                        localStorage.removeItem('user');
                        callback(res.message);
                    }
                }).error(function(err){
                    user = null;
                    localStorage.removeItem('user');
                    callback(err);
                });
        };

        var _getUser = function( ) {
            if(user) {
                return user;
            }

            if(localStorage.user) {
                user = JSON.parse(localStorage.user);
            }
            return user;
        };

        var _getToken = function(){
            return user? user.token : "";
        };

        var _hasPermission = function(resource, method) {
            try {
                var user = _getUser();
                if(!user) {
                    return false;
                }

                var roles = user.roles;
                for(var i=0; i<roles.length; i++) {
                    var role = roles[i];
                    for(var j=0; j<role.permissions.length; j++) {
                        var  p = role.permissions[j];
                        if((!method || p.method.toLowerCase() == method.toLowerCase())
                            && p.resource.toLowerCase() == resource.toLowerCase()) {
                            return true;
                        }
                    }
                }

                return false;
            } catch (err) {
                return false;
            }

        };

        var _getUserName = function() {
            var user = _getUser();
            return user ? user.userName : "";
        };

        var _getOutletName = function() {
            var user = _getUser();
            return user ? user.outlet.name : "";
        };

        var _logout = function(){
            user = null;
            localStorage.removeItem('user');
        };

        return {
            login:_login,
            getUser: _getUser,
            getToken: _getToken,
            hasPermission: _hasPermission,
            logout: _logout
        }
    }]);
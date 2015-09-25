/**
 * Created by ·½Àö¾² on 2015/7/15.
 */
angular.module('app.home')

    .factory('homeService',["$http", "config", function($http, config){
        var baseUrl = config.baseUrl;
        return {
            gethotitem: function (callback) {
                var url = "api/hotitem";
                $http.get(url)
                    .success(function (res) {

                        if (res.statusCode == 200)
                        {

                            callback(null,res);
                        } else {
                            callback(res.message);
                        }
                    }).error(function (err) {

                        callback(err);
                    });
            },
            getshopcart: function (callback) {

                var url='api/shopcart';
                $http.get(url)
                    .success(function (res) {

                        if (res.statusCode == 200) {

                            callback(null, res);
                        } else {
                            callback(res.message);
                        }
                    }).error(function (err) {
                        callback(err);
                    });
            },
            addcart:function(shopcart,callback){
                var url=  "api/shopcart";
                $http.post(url,shopcart)
                    .success(function (res) {

                        if (res.statusCode == 200) {
                            callback(null, res);
                        } else {

                            callback(res.message);
                        }
                    }).error(function (err) {
                        callback(err);
                    });
            },
        }
    }]);


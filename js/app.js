var app = angular.module("app", ["ngRoute", "ngAnimate", "ui.bootstrap",
    "app.login", "app.product", "app.cart","app.home"]);

app.config(["$routeProvider",function($routeProvider) {
    $routeProvider.when("/", {
        redirectTo: "/home"
    }).when("/home/:companyId", {
        templateUrl: "partials/home/profile.html",
        controller: 'homeCtrl'
    }).when("/detail/:pid", {
        templateUrl: "partials/product/detail.html",
        controller: 'detailCtrl'
    }).when("/offlinestore", {
        templateUrl: "partials/product/detail-offline.html"
    }).when("/apply", {
        templateUrl: "partials/apply/entrance.html"
    }).when("/imgintro", {
        templateUrl: "partials/product/detail-img-intro.html"
    }).when("/me", {
        templateUrl: "partials/login/login.html",
        controller: "loginCtrl"
    }).when("/registered", {
        templateUrl: "partials/login/registered.html"
    }).when("/categories", {
        templateUrl: "partials/product/classify.html",
        controller: "productCtrl"
    }).when("/cart", {
        templateUrl: "partials/home/addtocart.html",
        controller: 'addtocartCtrl'
    }).when("/telebook", {
        templateUrl: "partials/telebook/addressbook.html",
        controller: 'addtocartCtrl'
    }).when("/member", {
        templateUrl: "partials/member/completemember.html"
    }).when("/cart", {
        templateUrl: "partials/cart/cart1.html",
        controller: 'cartCtrl'
    }).when("/forgetP", {
        templateUrl: "partials/login/forgetpassword.html"
    }).when("/settlement", {
        templateUrl: "partials/cart/cart2.html",
        controller: 'settlementCtrl'
    }).otherwise({
        redirectTo: "/404"
    });
}]);
app.factory('authInterceptor', ['$rootScope', '$q', '$location',
    function ($rootScope, $q, $location) {
        return {
            request: function (config) {
                return config;
            },
            response: function (response) {
                if (response.status === 401) {
                    // handle the case where the user is not authenticated
                    $location.path("/401");
                }
                return response || $q.when(response);
            },
            responseError: function (response) {
                if (response && response.status === 401) {
                    $location.path("/401");
                }
                if (response && response.status >= 500) {
                }
                return $q.reject(response);
            }
        };
    }]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);

app.controller("appCtrl", ["$scope", "$location", "loginService",
    function ($scope, $location, loginService) {
        $scope.isActive = function(viewLocation) {
            return $location.path().indexOf(viewLocation) >= 0;
        };

        $scope.logout = function () {
            loginService.logout();
            $location.path("/login");
        };
    }]);
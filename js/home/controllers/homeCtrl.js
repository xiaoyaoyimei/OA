/**
 * Created by ·½Àö¾² on 2015/7/15.
 */
angular.module('app.home')
    .controller('homeCtrl', ['$scope','$location', '$routeParams','$interval', '$modal','homeService','productService',
        function ($scope,$location,$routeParams, $interval, $modal, homeService,productService) {
            $scope.slides= function () {
                // ÉèÖÃÂÖ²¥Í¼Í¼Æ¬¼ä¸ô
                $scope.myInterval = 5000;
                // ÂÖ²¥Í¼Êý¾Ý³õÊ¼»¯
                var slides = $scope.slides = [];
                // Ìí¼ÓÂÖ²¥Í¼Ô´
                slides.push({ image: 'images/shop/details1.png', text: '1' });
                slides.push({ image: 'images/shop/details2.png', text: '2' });
                slides.push({ image: 'images/shop/details3.png', text: '3' });
            };
            $scope.slides();
            $scope.shopcartnumber=0;
            /*     var user = loginService.getUser();
             var companyId = user.company.id;*/
            $scope.gethotitem = function () {
                $scope.loading = true;
                homeService.gethotitem(function (err, res) {

                    $scope.loading = false;
                    if (err) {
                        alert(err);
                        $scope.errMsg = err;
                    } else {
                        $scope.hotitems = res.data
                    }
                });
            };
            $scope.gethotitem();
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
                modalInstance.result.then(function (shopcartItem) {

                    shopcartItem=shopcartItem;
                    $scope.shopcartnumber += shopcartItem.quantity;
                    //alert(  $scope.shopcartnumber);

                });
            };

            $scope.getProducts=function(){

                $location.path("/product/classify/"+$scope.query);
            }
        }])

    .controller('addtocartCtrl', ['$scope','$location', '$interval', '$modal', '$modalInstance','product','homeService','loginService',
        function ($scope,$location, $interval, $modal, $modalInstance,product,homeService,loginService) {
            $scope.product=product;
            $scope.loading = true
            $scope.quantity = 1;
            var status=1;
            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
            $scope.add = function () {
                $scope.quantity++;
            };
            /*¼õÉÙ*/
            $scope.minus = function () {
                if ($scope.quantity > 0) {
                    $scope.quantity--;
                }
            };
            $scope.dt = new Date();
            $interval(function() {
                $scope.dt = new Date();
            }, 1000);
            $scope.shopcart = {};
            $scope.shopcart.shopcartItems = [];
            $scope.addshopcart = function(product) {
                status=1;
                var shopcartItem = {};
                shopcartItem.produtctId = $scope.product.id;
                shopcartItem.quantity = $scope.quantity;
                shopcartItem.retailPrice= $scope.product.retailPrice;
                shopcartItem.attributeValueIds = [];
                for (var i = 0; i < $scope.product.attributes.length; i++) {
                    for (var j = 0; j < $scope.product.attributes[i].attributeValues.length; j++) {
                        if ($scope.product.attributes[i].attributeValues[j].checked) {
                            orderItem.attributeValueIds.push($scope.product.attributes[i].attributeValues[j]);
                        }
                    }
                }
                shopcartItem.dt = $scope.dt;
                shopcartItem.message = $scope.product.message;
                $scope.shopcart.shopcartItems.push(shopcartItem);
                $modalInstance.close(shopcartItem);
            }
            $scope.buynow = function (p) {

                $scope.addshopcart(p);
                $modalInstance.close();
                $location.path("/cart");

            }
        }])
    .controller('fljCtrl',['$scope',function ($scope) {

    }])
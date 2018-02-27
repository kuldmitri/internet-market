let InternetMarketApp = angular.module("InternetMarketApp",[]);
InternetMarketApp.controller("productController", function ($scope, $http) {
    $scope.data = model;

    $scope.loadProducts = function () {
        $http({method: 'GET', url: 'products/all'}).then(function success(products) {
            $scope.data.products = products.data;
            console.log(products.data);
        });
    };
});
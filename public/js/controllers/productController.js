let InternetMarketApp = angular.module("InternetMarketApp", []);
InternetMarketApp.controller("productController", function ($scope, $http) {
    $scope.data = model;

    $scope.loadProducts = function () {
        $http({method: 'GET', url: 'products/all'}).then(function success(products) {
            $scope.data.products = products.data;
            console.log(products.data);
        });
    };

    $scope.ShowId = function (event) {
        alert(event.target.id);
    };

    $scope.updateById = function (event) {
        model.productId = event.target.id;
        alert(event.target.id);
        $http({method: 'GET', url: 'products/find/' + event.target.id}).then(function success(product) {
            model.product = product;
        });
    };

    $scope.deleteById = function (event) {
        alert(event.target.id);
    };
});
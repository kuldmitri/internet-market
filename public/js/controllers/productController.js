InternetMarketApp.controller("productController", function ($scope, $http, $location) {

    $scope.loadProducts = function () {
        $http({method: 'GET', url: 'products/all'}).then(function success(products) {
            $scope.products = products.data;
        });
    };

    $scope.deleteById = function (id) {
        console.log(id);
        $http({method: 'GET', url: 'products/delete/' + id}).then(function success(product) {
            console.log(product);
        });
        $scope.loadProducts();
    };

    $scope.updateById = function (id) {
        app.productId = id;
        $location.path("/editProductPage");
    };

    $scope.products = $scope.loadProducts();

});
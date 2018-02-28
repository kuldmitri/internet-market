InternetMarketApp.controller("editProductController", function ($scope, $http) {
    $scope.product = model.products[0];
    $scope.productId = model.productId;
    $scope.options = [{label:"option1",value:"1"},{label:"option2",value:"2"},{label:"option3",value:"3"}];

    $scope.loadProduct = function () {
        $http({method: 'GET', url: 'products/find/' + model.productId}).then(function success(product) {
            console.log(product.data);
            $scope.product = product.data;
            $scope.productId = model.productId;
        });
    };
    $scope.saveProduct = function () {
        $http.post( 'products/update', $scope.product).then(function success(product) {
            console.log(product.data);
            $scope.product = product.data;
            $scope.productId = model.productId;
        });
    };
});
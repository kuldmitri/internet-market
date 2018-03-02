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

    $scope.getCategories = function () {
        $http({method: 'GET', url: 'categories/all'}).then(function success(categories) {
            let options = [];
            for (let i = 0; i < categories.data.length; i++) {
                options.push({label: categories.data[i].name, _id: categories.data[i]._id})
            }
            $scope.options = options;
        });
    };

    $scope.updateById = function (id) {
        app.productId = id;
        $location.path("/editProductPage");
    };

    $scope.findByCategoryId = function (id) {
        $http({method: 'GET', url: 'products/findCategory/'+id}).then(function success(products) {
            $scope.products = products.data;
        });
    };

    $scope.options = $scope.getCategories();
    $scope.products = $scope.loadProducts();

});


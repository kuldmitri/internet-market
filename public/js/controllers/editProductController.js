InternetMarketApp.controller("editProductController", function ($scope, $http) {
    $scope.productId = app.productId;

    $scope.category = {};

    $scope.saveProduct = function () {
        if ($scope.category._id){
            $scope.product.categoryId = $scope.category._id;
        }
        console.log({product: $scope.product});
        if ($scope.productId) {
            $http.post('products/update', {product: $scope.product}).then(function success(product) {
                console.log(product.data);
                $scope.product = product.data;
                app.productId = "";
            })
        } else {
            $http.post('products/add', {product: $scope.product}).then(function success(product) {
                console.log(product.data);
                $scope.product = product.data;
            })
        }
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

    $scope.loadProduct = function () {
        if ($scope.productId) {
            $http({method: 'GET', url: 'products/find/' + $scope.productId}).then(function success(product) {
                $scope.product = product.data;
            })
        } else {
            $scope.product = {}
        }
    };

    $scope.options = $scope.getCategories();
    $scope.product = $scope.loadProduct();
});
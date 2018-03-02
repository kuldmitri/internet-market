InternetMarketApp.controller("categoryController", function ($scope, $http, $location) {

    $scope.loadCategories = function () {
        $http({method: 'GET', url: 'categories/all'}).then(function success(categories) {
            $scope.categories = categories.data;
        });
    };

    $scope.updateById = function (id) {
        app.categoryId = id;
        $location.path("/editCategoryPage");
    };

    $scope.deleteById = function (id) {
        $http({method: 'GET', url: 'categories/delete/' + id}).then(function success(category) {
            console.log(category);
        });
        $scope.loadCategories();
    };

    $scope.categories = $scope.loadCategories();
});
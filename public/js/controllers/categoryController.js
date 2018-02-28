InternetMarketApp.controller("categoryController", function ($scope, $http) {
    $scope.data = model;

    $scope.loadCategories = function () {
        $http({method: 'GET', url: 'categories/all'}).then(function success(categories) {
            $scope.data.categories = categories.data;
            model.categories = categories.data;
        });
    };

    $scope.updateById = function (event) {
        model.categoryId = event.target.id;
        $http({method: 'GET', url: 'categories/' + event.target.id}).then(function success(category) {
            model.category = category;
        });
    };

    $scope.deleteById = function (event) {
        model.categoryId = event.target.id;
        $http({method: 'GET', url: 'categories/delete/' + event.target.id}).then(function success(category) {
            model.category = category;
        });
    };
});
InternetMarketApp.controller("editCategoryController", function ($scope, $http) {

    $scope.loadCategory = function () {
        if ($scope.categoryId) {
            $http({method: 'GET', url: 'categories/' + $scope.categoryId}).then(function success(category) {
                $scope.category = category.data;
            })
        } else {
            $scope.category = {}
        }
    };

    $scope.saveCategory = function () {
        if ($scope.category._id) {
            $http.post('categories/update', $scope.category).then(function success(category) {
                console.log(category);
                app.categoryId = "";
            });
        } else {
            $http.post('categories/add', $scope.category).then(function success(category) {
                console.log(category);
            });
        }
    };

    $scope.category = $scope.loadCategory();

});
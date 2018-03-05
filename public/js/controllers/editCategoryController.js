InternetMarketApp.controller("editCategoryController", function ($scope, $http, dataCategory) {
    $scope.category = dataCategory;

    $scope.saveCategory = function () {
        if ($scope.category._id) {
            $http.post('categories/update', $scope.category).then(function success(category) {
                console.log(category);
            });
        } else {
            $http.post('categories/add', $scope.category).then(function success(category) {
                console.log(category);
            });
        }
    };

    $scope.deleteCategory= function (id) {
        $http({method: 'GET', url: 'categories/delete/' + id}).then(function success(category) {
            console.log(category);
        });
    };

});
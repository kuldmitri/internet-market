InternetMarketApp.controller("editCategoryController", function ($scope, $http) {
    $scope.category = {name:'wewewe'};
    $scope.categoryId = model.categoryId;

    $scope.loadCategory = function () {
        $http({method: 'GET', url: 'categories/' + model.categoryId}).then(function success(category) {
            $scope.category = category.data;
            $scope.categoryId = model.categoryId;
            alert(model.categoryId);
        });
    };
    $scope.saveCategory = function () {
        console.log($scope.category);
        if ($scope.categoryId) {
            $http.post('categories/update', $scope.category).then(function success(category) {
                $scope.category = category.data;
            });
        } else {
            $http.post('categories/add', $scope.category).then(function success(category) {
                $scope.category = category.data;
            });
        }
        $scope.categoryId = null;
    };
});
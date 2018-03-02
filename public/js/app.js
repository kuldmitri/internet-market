let InternetMarketApp = angular.module('InternetMarketApp', ["ngRoute"])
    .config(function($routeProvider){
        $routeProvider.when('/productsPage',
            {
                templateUrl:'views/product.html',
                controller:'productController'
            });
        $routeProvider.when('/categoriesPage',
            {
                templateUrl:'views/category.html',
                controller:'categoryController'
            });
        $routeProvider.when('/editProductPage',
            {
                templateUrl:'views/editProduct.html',
                controller:'editProductController'
            });
        $routeProvider.when('/editCategoryPage',
            {
                templateUrl:'views/editCategory.html',
                controller:'editCategoryController'
            });

        $routeProvider.otherwise({redirectTo: '/productsPage'});
    });
let InternetMarketApp = angular.module('InternetMarketApp', ["ui.router"]);

InternetMarketApp.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('products', {
            url: "/products",
            templateUrl: "views/product.html",
            controller: "productController"
        })
        .state('add product', {
            url: "products-add",
            templateUrl: "views/editProduct.html",
            controller: "editProductController",
            resolve: {
                dataProduct: [() => {}],
            }
        })
        .state('edit product', {
            url: "products/:id",
            templateUrl: "views/editProduct.html",
            controller: "editProductController",
            resolve: {
                dataProduct: ['$stateParams', '$http', ($stateParams, $http) => {
                    if ($stateParams.id) {
                        return $http({method: 'GET', url: 'products/find/' + $stateParams.id})
                            .then(result => result.data);
                    }
                    return {};
                }],
            },
        })

        .state('categories', {
            url: "/categories",
            templateUrl: "views/category.html",
            controller: 'categoryController',
        })
        .state('add category', {
            url: "category-add",
            templateUrl: "views/editCategory.html",
            controller: "editCategoryController",
            resolve: {
                dataCategory: [() => {}],
            }
        })
        .state('edit category', {
            url: "categories/:id",
            templateUrl: "views/editCategory.html",
            controller: "editCategoryController",
            resolve: {
                dataCategory: ['$stateParams', '$http', ($stateParams, $http) => {
                    if ($stateParams.id) {
                        return $http({method: 'GET', url: 'categories/' + $stateParams.id})
                            .then(result => result.data);
                    }
                    return {};
                }],
            },
        })

    // $urlRouterProvider.otherwise("/products");
});

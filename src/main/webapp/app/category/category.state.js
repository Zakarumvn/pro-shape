(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig ($stateProvider) {
        $stateProvider.state('category', {
            parent: 'app',
            url: '/category/:id',
            data: {
                authorities: [],
                pageTitle: 'Category'
            },
            views: {
                'content@': {
                    templateUrl: 'app/category/category.html',
                    controller : 'CategoryController',
                    controllerAs : 'catCtrl'
                }
            }
        });
    }
})();

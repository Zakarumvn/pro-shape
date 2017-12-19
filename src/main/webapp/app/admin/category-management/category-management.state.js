(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('category-management', {
            parent: 'admin',
            url: '/category-management',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Category Management'
            },
            views: {
                'content@': {
                    templateUrl: 'app/admin/category-management/category-management.html',
                    controller: 'CatManagementController',
                    controllerAs: 'cmCtrl'
                }
            }
        });
    }
})();

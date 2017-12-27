(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig ($stateProvider) {
        $stateProvider.state('category', {
            parent: 'app',
            url: '/category/:id?page&sort',
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
            }, params: {
                page: {
                    value: '1',
                    squash: true
                },
                sort: {
                    value: 'id,asc',
                    squash: true
                }
            }, resolve: {
                pagingParams: ['$stateParams', 'PaginationUtil', function ($stateParams, PaginationUtil) {
                    return {
                        page: PaginationUtil.parsePage($stateParams.page),
                        sort: $stateParams.sort,
                        predicate: PaginationUtil.parsePredicate($stateParams.sort),
                        ascending: PaginationUtil.parseAscending($stateParams.sort)
                    };
                }]
            }
        });
    }
})();

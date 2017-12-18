/**
 * Created by Katarzyna on 2017-12-02.
 */
(function() {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('group', {
            url: '/group/:id?page&sort',
            parent: 'app',
            data: {
                authorities: [],
                pageTitle: 'Group'
            },
            views: {
                'content@': {
                    templateUrl: 'app/groups/groupPage/groupPage.html',
                    controller: 'GroupPageController',
                    controllerAs: 'gCtrl'
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


/**
 * Created by Katarzyna on 2017-09-23.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('groups', {
            url: '/groups',
            parent: 'app',
            data: {
                authorities: [],
                pageTitle: 'Groups'
            },
            views: {
                'content@': {
                    templateUrl: 'app/groups/groups.html',
                    controller: 'GroupController',
                    controllerAs: 'groupCtrl'
                }
            }
        });

    }
})();

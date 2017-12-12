/**
 * Created by Katarzyna on 2017-11-29.
 */
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
        $stateProvider.state('createGroup', {
            url: '/createGroup',
            parent: 'app',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Create group'
            },
            views: {
                'content@': {
                    templateUrl: 'app/groups/create/createGroup.html',
                    controller: 'CreateGroupController',
                    controllerAs: 'cgCtrl'
                }
            }
        });

    }
})();

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
        $stateProvider.state('manageGroup', {
            url: '/manageGroup',
            parent: 'app',
            data: {
                authorities: ['ROLE_MODERATOR', 'ROLE_ADMIN'],
                pageTitle: 'Manage group'
            },
            views: {
                'content@': {
                    templateUrl: 'app/groups/manage/manageGroup.html',
                    controller: 'ManageGroupController',
                    controllerAs: 'mgCtrl'
                }
            }
        });
    }
})();

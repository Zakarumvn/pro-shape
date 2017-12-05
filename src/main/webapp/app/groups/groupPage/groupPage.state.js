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
            url: '/group/:id',
            parent: 'app',
            data: {
                authorities: ['ROLE_USER', 'ROLE_MODERATOR'],
                pageTitle: 'Group'
            },
            views: {
                'content@': {
                    templateUrl: 'app/groups/groupPage/groupPage.html',
                    controller: 'GroupPageController',
                    controllerAs: 'gCtrl'
                }
            }
        });
    }
})();

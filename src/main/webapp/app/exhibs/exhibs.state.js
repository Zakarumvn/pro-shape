
(function() {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('exhibs', {
            url: '/exhibs',
            parent: 'app',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'My exhibitions'
            },
            views: {
                'content@': {
                    templateUrl: 'app/exhibs/exhibs.html',
                    controller: 'ExhibsController',
                    controllerAs: 'exhibsCtrl'
                }
            }
        });
    }
})();

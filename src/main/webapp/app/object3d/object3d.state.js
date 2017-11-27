/**
 * Created by Katarzyna on 2017-09-23.
 */
(function() {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('object3d', {
            url: '/model/:id',
            parent: 'app',
            data: {
                authorities: [],
                pageTitle: 'Model'
            },
            views: {
                'content@': {
                    templateUrl: 'app/object3d/object3d.html',
                    controller: 'ObjectController',
                    controllerAs: 'objCtrl'
                }
            }
        });
    }
})();

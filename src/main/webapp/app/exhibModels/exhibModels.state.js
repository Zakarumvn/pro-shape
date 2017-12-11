(function() {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('exhibModels', {
            url: '/exhib/:id/models',
            parent: 'app',
            data: {
                authorities: [],
                pageTitle: 'Exhibition'
            },
            views: {
                'content@': {
                        templateUrl: 'app/exhibModels/exhibModels.html',
                        controller: 'exhibModelsController',
                        controllerAs: 'exModCtrl'
                }
            }
        });
    }
})();


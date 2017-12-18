(function() {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('exhibModels', {
            url: '/exhib/:id',
            parent: 'app',
            data: {
                authorities: [],
                pageTitle: 'Exhibition'
            },
            views: {
                'content@': {
                        templateUrl: 'app/exhibs/exhibModels/exhibModels.html',
                        controller: 'exhibModelsController',
                        controllerAs: 'exModCtrl'
                }
            }
        });
    }
})();


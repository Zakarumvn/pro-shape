(function() {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('exhibDisplay', {
            url: '/exhib/:id/:mId',
            parent: 'app',
            data: {
                authorities: [],
                pageTitle: 'Exhibition'
            },
            views: {
                'content@': {
                    templateUrl: 'app/exhibDisplay/exhibDisplay.html',
                    controller: 'ExhibDisplayController',
                    controllerAs: 'exDispCtrl'
                }
            }
        });
    }
})();

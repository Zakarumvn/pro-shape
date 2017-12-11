(function() {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('exhibEdit', {
            url: '/exhibEdit/:id',
            parent: 'app',
            data: {
                authorities: [],
                pageTitle: 'Exhibition edit'
            },
            views: {
                'content@': {
                    templateUrl: 'app/exhibEdit/exhibEdit.html',
                    controller: 'ExeditController',
                    controllerAs: 'exedCtrl'
                }
            }
        });
    }
})();

(function() {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('cat_exhib', {
            url: '/cat_exhib',
            parent: 'app',
            data: {
                authorities: [],
                pageTitle: 'Categories: exhibitions'
            },
            views: {
                'content@': {
                    templateUrl: 'app/cat_exhib/cat_exhib.html',
                    controller: 'ExhibCategController',
                    controllerAs: 'exCCtrl'
                }
            }
        });
    }
})();

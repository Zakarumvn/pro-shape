(function() {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('cat_obj', {
            url: '/cat_obj',
            parent: 'app',
            data: {
                authorities: [],
                pageTitle: 'Categories: Models'
            },
            views: {
                'content@': {
                    templateUrl: 'app/category/cat_obj/cat_obj.html',
                    controller: 'ModelCategController',
                    controllerAs : 'modCCtrl'
                }
            }
        });
    }
})();

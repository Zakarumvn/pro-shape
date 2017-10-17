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
                pageTitle: 'Kategorie: Obiekty'
            },
            views: {
                'content@': {
                    templateUrl: 'app/cat_obj/cat_obj.html'
                }
            }
        });
    }
})();

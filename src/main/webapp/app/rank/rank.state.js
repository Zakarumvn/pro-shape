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
        $stateProvider.state('rank', {
            url: '/rank',
            parent: 'app',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Ranking'
            },
            views: {
                'content@': {
                    templateUrl: 'app/rank/rank.html'
                }
            }
        });
    }
})();

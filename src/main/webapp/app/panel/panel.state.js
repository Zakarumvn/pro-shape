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
        $stateProvider.state('panel', {
            url: '/panel',
            parent: 'app',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Panel'
            },
            views: {
                'content@': {
                    templateUrl: 'app/panel/panel.html',
                    controller: 'PanelController',
                    controllerAs: 'panelCtrl'
                }
            }
        });
    }
})();

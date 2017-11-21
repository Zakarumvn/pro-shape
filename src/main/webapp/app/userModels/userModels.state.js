/**
 * Created by Katarzyna on 2017-11-18.
 */
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
        $stateProvider.state('userModels', {
            url: '/userModels',
            parent: 'app',
            data: {
                authorities: [],
                pageTitle: 'My models'
            },
            views: {
                'content@': {
                    templateUrl: 'app/userModels/userModels.html',
                    controller: 'UserModelsController',
                    controllerAs: 'userModelsCtrl'
                }
            }
        });
    }
})();

/**
 * Created by Katarzyna on 2017-10-13.
 */
(function() {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('upload', {
            url: '/upload',
            parent: 'app',

            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'Upload model'
            },
            views: {
                'content@': {
                    templateUrl: 'app/upload/upload.html',
                    controller: 'UploadController',
                    controllerAs: 'uploadCtrl'
                }
            }
        });
    }
})();

(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig ($stateProvider) {
        $stateProvider.state('admin', {
            parent: 'app',
            url: '/admin',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Administration'
            },
            views: {
                'content@': {
                    templateUrl: 'app/admin/admin.html'
                }
            }
        });
    }
})();

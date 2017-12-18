(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('AdminPanelController', AdminPanelController);

    AdminPanelController.$inject = ['$scope'];

    /* @ngInject */
    function AdminPanelController($scope) {
        var vm = this;
        vm.title = 'AdminPanelController';

        activate();

        /////

        function activate() {

        }
    }

})();

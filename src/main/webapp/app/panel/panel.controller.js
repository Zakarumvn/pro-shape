

(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('PanelController', PanelController);

    PanelController.$inject = ['$scope', 'Principal', '$http', '$uibModal'];

    /* @ngInject */
    function PanelController($scope, Principal, $http, $uibModal) {
        var vm = this;
        vm.title = 'PanelController';
        var modalInstance = $uibModal.open({
            templateUrl : 'app/panel/components/delete.html'
        });

        Principal.identity().then(function(account) {
            vm.account = account;
        });

        activate();

        ////////////////

        function activate() {
            $http.get('api/file/getRank').then(function (response) {
                vm.models = response.data;
            });
            $http.get('api/exhib/getUserExhibs').then(function (response) {
                vm.exhibs = response.data;
            });
        }


    }

})();


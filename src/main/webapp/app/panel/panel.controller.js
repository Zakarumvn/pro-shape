

(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('PanelController', PanelController);

    PanelController.$inject = ['$scope', 'Principal', '$http'];

    /* @ngInject */
    function PanelController($scope, Principal, $http) {
        var vm = this;
        vm.title = 'PanelController';

        vm.account = null;
        vm.currentModel = null;
        vm.data = null;

        vm.getUserModels = getUserModels;
        vm.setCurrentModel = setCurrentModel;
        vm.deleteModel = deleteModel;


        activate();

        ////////////////

        function activate() {
            Principal.identity().then(function(account) {
                vm.account = account;
            });

            vm.getUserModels();

            $http.get('api/exhib/getUserExhibs').then(function (response) {
                vm.exhibs = response.data;
            });
        }

        function getUserModels(){
            $http.get('api/file/getUserObjects').then(function (response) {
                vm.models = response.data;
            });
        }

        function setCurrentModel(model){
            vm.currentModel = model;
        }

        function deleteModel(){
            vm.data = {
                'modelId': vm.currentModel.id
            };

            $http({
                url: 'api/file/deleteModel',
                params: vm.data,
                method: 'post'
            }).then(function (response) {
                vm.getUserModels();
            })

        }

    }

})();


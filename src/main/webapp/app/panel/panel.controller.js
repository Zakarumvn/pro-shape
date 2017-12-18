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
        vm.succes = null;

        vm.account = null;
        vm.currentModel = null;
        vm.data = null;
        vm.modelCategories = [];
        vm.exhibCategories = [];

        /// Modals
        vm.editedModel = {};
        vm.editedExhib = {};
        ///

        vm.getUserModels = getUserModels;
        vm.setCurrentModel = setCurrentModel;
        vm.setCurrentExhib = setCurrentExhib;
        vm.deleteModel = deleteModel;
        vm.deleteExhib = deleteExhib;

        vm.setEditedModel = setEditedModel;
        vm.setEditedExhib = setEditedExhib;
        vm.updateModel = updateModel;
        vm.updateExhib = updateExhib;


        activate();

        ////////////////

        function activate() {
            Principal.identity().then(function (account) {
                vm.account = account;
            });

            vm.getUserModels();

            $http.get('api/file/getUserObjects').then(function (response) {
                vm.models = response.data;
            });
            $http.get('api/exhib/getUserExhibs').then(function (response) {
                vm.exhibs = response.data;
            });

            vm.data = {
                type : "model"
            }
            $http({
                url: 'api/cat/getAllByType',
                params: vm.data,
                method: 'get'
            }).then(function (response) {
                vm.modelCategories = response.data;
            });

            vm.data = {
                type : "exhib"
            }
            $http({
                url: 'api/cat/getAllByType',
                params: vm.data,
                method: 'get'
            }).then(function (response) {
                vm.exhibCategories = response.data;
            });
        }

        function getUserModels() {
            $http.get('api/file/getUserObjects').then(function (response) {
                vm.models = response.data;
            });
        }

        function getUserExhibs() {
            $http.get('api/exhib/getUserExhibs').then(function (response) {
                vm.exhibs = response.data;
            });
        }

        function setEditedModel(model) {
            vm.editedModel = model;
        }

        function setEditedExhib(exhib) {
            vm.editedExhib = exhib;
        }

        function setCurrentModel(model) {
            vm.currentModel = model;
        }

        function setCurrentExhib(exhib) {
            vm.currentExhib = exhib;
        }

        function deleteModel() {
            vm.data = {
                'modelId': vm.currentModel.id
            };

            $http({
                url: 'api/file/deleteModel',
                params: vm.data,
                method: 'post'
            }).then(function (response) {
                vm.succes = "Model deleted!"
            })
        }

        function deleteExhib() {
            vm.data = {
                'id': vm.currentExhib.id
            };

            $http({
                url: 'api/exhib/deleteExhib',
                params: vm.data,
                method: 'post'
            }).then(function (response) {
                vm.succes = "Exhibition deleted!"
            })

        }

        function updateModel() {
            vm.data = {
                'modelId' : vm.editedModel.id,
                'modelName' : vm.editedModel.modelName,
                'modelDescription' : vm.editedModel.modelDescription,
                'categoryId' : vm.editedModel.category
            };
            $http({
                url: 'api/file/updateModel',
                params: vm.data,
                method: 'post'
            }).then(function (response) {
                vm.succes = "Model updated!"
            })
        }

        function updateExhib() {
            vm.data = {
                'id' : vm.editedExhib.id,
                'name' : vm.editedExhib.name,
                'description' : vm.editedExhib.description,
                'categoryId' : vm.editedExhib.category
            };
        }
    }

})();




(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('PanelController', PanelController);

    PanelController.$inject = ['$scope', 'Principal', '$http', 'Upload', '$timeout', '$state'];

    /* @ngInject */
    function PanelController($scope, Principal, $http, Upload, $timeout, $state) {
        var vm = this;
        vm.title = 'PanelController';
        vm.success = null;
        vm.error = null;

        vm.account = null;
        vm.currentModel = null;
        vm.data = null;
        vm.modelCategories = [];
        vm.exhibCategories = [];

        /// Modals
        vm.editedModel = {};
        vm.editedExhib = {};
        vm.picFile = null;
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

        vm.nullEdit = nullEdit;


        activate();

        ////////////////

        function activate() {
            Principal.identity().then(function(account) {
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
            };

            $http({
                url: 'api/cat/getAllByType',
                params: vm.data,
                method: 'get'
            }).then(function (response) {
                vm.modelCategories = response.data;
            });

            vm.data = {
                type : "exhib"
            };

            $http({
                url: 'api/cat/getAllByType',
                params: vm.data,
                method: 'get'
            }).then(function (response) {
                vm.exhibCategories = response.data;
            });
        }


        function getUserModels(){
            $http.get('api/file/getUserObjects').then(function (response) {
                vm.models = response.data;
            });
        }

        function getUserExhibs(){
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

        function setCurrentExhib(exhib){
            vm.currentExhib = exhib;
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
                vm.success = "Model deleted!";
                $timeout(function () {
                    $state.reload();
                }, 1500);
            }).catch(function (response) {
                vm.error = "Error. Try again later.";
                vm.error.response = response;
            });
        }

        function deleteExhib(){
            vm.data = {
                'id': vm.currentExhib.id
            };

            $http({
                url: 'api/exhib/deleteExhib',
                params: vm.data,
                method: 'post'
            }).then(function (response) {
                vm.success = "Exhibition deleted!";
                $timeout(function () {
                    $state.reload();
                }, 1500);
            }).catch(function (response) {
                vm.error = "Error. Try again later.";
                vm.error.response = response;
            });

        }

        function uploadModelPicture(file) {
            Upload.upload({
                url: 'api/file/pictureUpload',
                data: { id: vm.editedModel.id, picture: file}
            }).then(function (response) {
                //console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ' + response.data);
            }, function (response) {
                //console.log('Error status: ' + response.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            });
        };

        function updateModel() {
            //sprawdzic czy jest zdjec, jak nie to nie zmieniac
            if(vm.picFile) uploadModelPicture(vm.picFile);

            vm.data = {
                'modelId' : vm.editedModel.id,
                'modelName' : vm.editedModel.modelName,
                'modelDescription' : vm.editedModel.modelDescription,
                'categoryId' : vm.editedModel.category == null ?  '' : vm.editedModel.category.categoryId
            };
            $http({
                url: 'api/file/updateModel',
                params: vm.data,
                method: 'post'
            }).then(function (response) {
                vm.success = "Model updated!";

                $timeout(function () {
                    $state.reload();
                }, 1500);

            }).catch(function (response) {
                vm.error = "Error. Try again later.";
                vm.error.response = response;
            });
        }

        function updateExhib() {
            vm.data = {
                'id' : vm.editedExhib.id,
                'name' : vm.editedExhib.name,
                'description' : vm.editedExhib.description,
                'categoryId' : vm.editedExhib.category.categoryId
            };
            $http({
                url: 'api/exhib/updateExhib',
                params: vm.data,
                method: 'post'
            }).then(function (response) {
                vm.success = "Exhibition updated!";
                $timeout(function () {
                    $state.reload();
                }, 1500);
            }).catch(function (response) {
                vm.error = "Error. Try again later.";
                vm.error.response = response;
            });
        }

        function nullEdit() {
            vm.editedModel = {};
            vm.picFile = null;
            vm.editedExhib = {};
        }

    }

})();


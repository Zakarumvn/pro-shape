(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('ExeditController', ExeditController);

    ExeditController.$inject = ['Principal', '$http', '$stateParams', '$log'];

    /* @ngInject */
    function ExeditController(Principal, $http, $stateParams, $log) {
        var vm = this;
        vm.title = 'ExeditController';
        vm.error = null;
        vm.success = null;
        vm.empty = null;

        vm.data = [];
        vm.exhib = [];
        vm.exhibModels = [];



        vm.tempExhibModels = [];
        vm.userModels = [];
        vm.availabeModels = [];

        //vm.addModels = addModels;
        vm.addModel = addModel;
        vm.saveModels = saveModels;
        vm.removeTempModel = removeTempModel;
        vm.selected = [];
        vm.modelsIds = [];
        vm.selectedModels = [];
        vm.newTemp = {};

        Principal.identity().then(function(account) {
            vm.account = account;
        });

        activate();

        ////////////////

        function activate() {
            vm.data = {
                id: $stateParams.id
            };
            $http.get('api/file/getUserObjects').then(function (response) {
                if(!response.data.isEmpty) {
                    vm.userModels = response.data;
                    vm.availabeModels = response.data;
                }
            });
            $http({
                url: 'api/exhib/getExhibById',
                method: 'get',
                params: vm.data
            })
                .then(function (response) {
                    if(!response.data.isEmpty) {
                            vm.exhib = response.data;

                            angular.forEach(vm.exhib.models, function (value) {
                                vm.modelsIds.push(value.id);
                            });

                            if(vm.modelsIds.length == 0){
                                vm.empty = "True";
                            }
                        }
                    }
                );

        }

        function addModel(givenId) {
            $log.info("GivenID: " + givenId);
            vm.tempExhibModels.splice(vm.tempExhibModels.sizeOf, 0, vm.availabeModels[givenId]);
            vm.availabeModels.splice(givenId, 1);
        }

        function removeTempModel(givenId){
            vm.availabeModels.splice(vm.availabeModels.sizeOf, 0, vm.tempExhibModels[givenId]);
            vm.tempExhibModels.splice(givenId, 1);
        }


        function setAvailableModels(){
            //vm.tempExhibModels = vm.exhib.models;
            vm.availabeModels = vm.userModels;

            angular.forEach(vm.exhib.models, function (value, key) {
                var i = 0;
                if(value.id === vm.availabeModels[i].id){
                    addModel(i);
                }
            });
        }


        function saveModels(){
            vm.modelIds = [];
            angular.forEach(vm.tempExhibModels, function (value, key) {
                vm.modelIds.push(value.id);
            });
            vm.dataForDb = {
                id : vm.exhib.id,
                models : vm.modelIds
            }
            $http({
                url: 'api/exhib/setExhibModels',
                method: 'post',
                params: vm.dataForDb
            })
                .success(function () {
                    vm.success = "True";
                })
        }
    }

})();


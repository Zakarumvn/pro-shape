(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('exhibModelsController', exhibModelsController);

    exhibModelsController.$inject = ['$http', '$stateParams'];

    /* @ngInject */
    function exhibModelsController($http, $stateParams) {
        var vm = this;
        vm.title = 'exhibModelsController';
        vm.data = [];
        vm.exhib = [];
        vm.models = [];
        vm.modelsIds = [];
        vm.empty = null;

        activate();

        function  activate() {
            vm.data = {
                id: $stateParams.id
            };
            $http({
                url: 'api/exhib/getExhibById',
                method: 'get',
                params: vm.data
            })
                .then(function (response) {
                    vm.exhib = response.data;
                    vm.models = vm.exhib.models;

                    angular.forEach(vm.models, function (value) {
                        vm.modelsIds.push(value.id);
                    });

                    if(vm.modelsIds.length == 0){
                        vm.empty = "True";
                    }
                });


        }

    }

})();

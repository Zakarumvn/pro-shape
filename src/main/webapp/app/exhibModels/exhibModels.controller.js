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
                });
        }

    }

})();

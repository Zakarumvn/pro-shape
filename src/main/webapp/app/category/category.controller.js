(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$scope', '$stateParams', '$http'];

    /* @ngInject */
    function CategoryController($scope, $stateParams, $http) {
        var vm = this;
        vm.title = 'CategoryController';

        vm.category = [];
        vm.models = [];
        vm.exhibs = [];
        activate();

        /////

        function activate() {
            vm.data = {
                categoryId: $stateParams.id
            }
            $http({
                url: 'api/cat/getById',
                params: vm.data,
                method: 'get'
            }).then(function (response) {
                vm.category = response.data;

                vm.send = {
                    categoryId : vm.category.categoryId
                }

                if(vm.category.type == "model"){
                    $http({
                        url: 'api/cat/getModels',
                        params: vm.send,
                        method: 'get'
                    }).then(function (response) {
                        vm.models = response.data;
                    });
                }else{
                    $http({
                        url: 'api/cat/getExhibs',
                        params: vm.send,
                        method: 'get'
                    }).then(function (response) {
                        vm.exhibs = response.data;
                    });
                }
            });
        }
    }

})();

(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('ModelCategController', ModelCategController);

    ModelCategController.$inject = ['$scope', '$http'];

    /* @ngInject */
    function ModelCategController($scope, $http) {
        var vm = this;
        vm.title = 'ModelCategController';

        vm.categories = [];

        activate();

        /////

        function activate() {
            vm.data = {
                type : "model"
            }
            $http({
                url: 'api/cat/getAllByType',
                params: vm.data,
                method: 'get'
            }).then(function (response) {
                vm.categories = response.data;
            });
        }
    }

})();

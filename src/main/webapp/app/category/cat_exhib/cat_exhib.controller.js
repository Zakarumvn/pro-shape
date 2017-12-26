(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('ExhibCategController', ExhibCategController);

    ExhibCategController.$inject = ['$scope', '$http'];

    /* @ngInject */
    function ExhibCategController($scope, $http) {
        var vm = this;
        vm.title = 'ExhibCategController';

        vm.categories = [];

        activate();

        /////

        function activate() {
            vm.data = {
                type : "exhib"
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

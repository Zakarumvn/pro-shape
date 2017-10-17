/**
 * Created by Katarzyna on 2017-10-09.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('TestController', TestController);

    TestController.$inject = ['rankService', '$http'];

    /* @ngInject */
    function TestController(rankService, $http) {
        var vm = this;
        vm.title = 'TestController';
        vm.temp = [];

        activate();

        ////////////////

        function activate() {
            $http.get('api/test/testujemy').then(function (response) {
                vm.temp = response.data;
            })
        }

    }

})();


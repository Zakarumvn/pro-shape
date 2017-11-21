/**
 * Created by Katarzyna on 2017-10-09.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('RankController', RankController);

    RankController.$inject = ['rankService', '$http'];

    /* @ngInject */
    function RankController(rankService, $http) {
        var vm = this;
        vm.title = 'RankController';
        vm.models = [];

        activate();

        ////////////////

        function activate() {
            $http.get('api/file/getRank').then(function (response) {
                vm.models = response.data;
            });
        }

    }

})();


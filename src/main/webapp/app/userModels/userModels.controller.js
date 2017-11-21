/**
 * Created by Katarzyna on 2017-11-18.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('UserModelsController', UserModelsController);

    UserModelsController.$inject = ['$http', '$scope', '$filter'];

    /* @ngInject */
    function UserModelsController($http, $scope, $filter) {
        var vm = this;
        vm.title = 'UserModelsController';
        vm.userFiles = [];
        vm.currentPage = 0;
        vm.pageSize = 6;
        vm.data = [];
        vm.q = '';
        vm.getData = getData;
        vm.getNumberOfPages = getNumberOfPages;
        vm.range = range;
        activate();

        ////////////////


        function activate() {
            $http.get('api/file/getUserObjects').then(function (response) {
                vm.userFiles = response.data;
            }).catch(function error(response){
                console.log("error getting user objects");
            });
        }

        function getData() {
            return $filter('filter')(vm.userFiles, vm.q)
        }

        function getNumberOfPages() {
            return Math.ceil(vm.getData().length/vm.pageSize);
        }

        function range(start, stop) {
            var set = [];
            for(var i = start; i <=stop; i++ ){
                set.push(i);
            }
            return set;
        }
    }

})();


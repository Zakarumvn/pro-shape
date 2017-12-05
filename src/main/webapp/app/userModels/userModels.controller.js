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


        $scope.models = [];

        $scope.filteredModels = []
            ,$scope.currentPage = 1
            ,$scope.numPerPage = 6
            ,$scope.maxSize = 5;

        ////////////////

        function activate() {
            $http.get('api/file/getUserObjects').then(function (response) {
                vm.userFiles = response.data;
                $scope.models = response.data;
                $scope.$watch('currentPage + numPerPage', function() {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                        , end = begin + $scope.numPerPage;

                    $scope.filteredModels = $scope.models.slice(begin, end);
                });
            }).catch(function error(response){
                console.log("error getting user objects");
            });
        }

        $scope.selectPage = function (newPage) {
            if(newPage > 0 && newPage <= $scope.lastPage()){
                $scope.currentPage = newPage;
            }

        };

        $scope.lastPage = function () {
            return Math.ceil($scope.models.length / $scope.numPerPage );
        };

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


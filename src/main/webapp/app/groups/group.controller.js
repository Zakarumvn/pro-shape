/**
 * Created by Katarzyna on 2017-11-29.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('GroupController', GroupController);

    GroupController.$inject = ['$http', '$scope'];

    /* @ngInject */
    function GroupController($http, $scope) {
        var vm = this;
        vm.title = 'GroupController';

        $scope.groups = [];

        $scope.filteredGroups = []
            ,$scope.currentPage = 1
            ,$scope.numPerPage = 6
            ,$scope.maxSize = 5;

        activate();

        ////////////////

        function activate() {
            $http.get('api/group/getAllGroups').then(function (response) {
                $scope.groups = response.data;

                $scope.$watch('currentPage + numPerPage', function() {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                        , end = begin + $scope.numPerPage;

                    $scope.filteredGroups = $scope.groups.slice(begin, end);
                });
            });
        }

        $scope.selectPage = function (newPage) {
            if(newPage > 0 && newPage <= $scope.lastPage()){
                $scope.currentPage = newPage;
            }

        };

        $scope.lastPage = function () {
            return Math.ceil($scope.groups.length / $scope.numPerPage );
        };


    }

})();


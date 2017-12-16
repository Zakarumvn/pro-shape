/**
 * Created by Katarzyna on 2017-10-09.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('RankController', RankController);

    RankController.$inject = ['rankService', '$http', '$scope', 'ParseLinks', 'AlertService', '$state', 'pagingParams', 'paginationConstants'];

    /* @ngInject */
    function RankController(rankService, $http, $scope, ParseLinks, AlertService, $state, pagingParams, paginationConstants) {
        var vm = this;
        vm.title = 'RankController';
        $scope.models = [];
        vm.data = null;
        vm.links = null;
        vm.totalItems = null;
        vm.queryCount = null;
        vm.page = 1;
        vm.models = [];
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.itemsPerPage = paginationConstants.itemsPerPage;

        vm.transition = transition;
        vm.loadPage = loadPage;
        vm.getRank = getRank;

        $scope.filteredModels = []
            , $scope.currentPage = 1
            , $scope.numPerPage = 6
            , $scope.maxSize = 5;


        activate();

        ////////////////

        function activate() {
            vm.getRank();
            /*            $http.get('api/file/getRank').then(function (response) {
             $scope.models = response.data;

             $scope.$watch('currentPage + numPerPage', function() {
             var begin = (($scope.currentPage - 1) * $scope.numPerPage)
             , end = begin + $scope.numPerPage;

             $scope.filteredModels = $scope.models.slice(begin, end);
             });
             });*/
        }

        function getRank() {
            vm.data = {
                page: pagingParams.page - 1,
                size: vm.itemsPerPage,
                sort: sort()
            };

            $http({
                url: 'api/file/rank',
                method: 'post',
                params: vm.data
            }).then(function (response) {
                vm.links = ParseLinks.parse(response.headers('link'));
                vm.totalItems = response.headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.page = pagingParams.page;
                vm.models = response.data;
            }).catch(function (response) {
                AlertService.error(response.message);
            })
        }

        function onSuccess(data, headers) {

        }

        function onError(error) {
            AlertService.error(error.data.message);
        }

        function loadPage(page) {
            vm.page = page;
            vm.transition();
        }

        function transition() {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }

        function sort() {
            var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
            if (vm.predicate !== 'id') {
                result.push('id');
            }
            return result;
        }

        ////

        $scope.selectPage = function (newPage) {
            if (newPage > 0 && newPage <= $scope.lastPage()) {
                $scope.currentPage = newPage;
            }

        };

        $scope.lastPage = function () {
            return Math.ceil($scope.models.length / $scope.numPerPage);
        };
    }

})();

(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['$scope', '$stateParams', '$http', 'ParseLinks', 'AlertService', '$state', 'pagingParams', 'paginationConstants'];

    /* @ngInject */
    function CategoryController($scope, $stateParams, $http, ParseLinks, AlertService, $state, pagingParams, paginationConstants) {
        var vm = this;
        vm.title = 'CategoryController';

        vm.category = [];
        vm.models = [];
        vm.exhibs = [];

        vm.totalItems = null;
        vm.queryCount = null;
        vm.page = 1;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.itemsPerPage = paginationConstants.itemsPerPage;

        vm.transition = transition;
        vm.loadPage = loadPage;
        vm.getContent = getContent;
        vm.sliceIfTooLongText = sliceIfTooLongText;
        activate();

        /////

        function activate() {
            vm.data = {
                categoryId: $stateParams.id
            };

            $http({
                url: 'api/cat/getById',
                params: vm.data,
                method: 'get'
            }).then(function (response) {
                vm.category = response.data;
                vm.getContent();
            });
        }

        function sliceIfTooLongText(text) {
            if(text.includes('@')){
                return text.slice(0, text.indexOf('@'));
            } else {
                return text;
            }
        }


        function getContent() {
            vm.data = {
                page: pagingParams.page - 1,
                size: vm.itemsPerPage,
                sort: sort(),
                categoryId : vm.category.categoryId
            };


            if(vm.category.type == "model"){
                $http({
                    url: 'api/cat/getModels',
                    method: 'get',
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
            } else {
                $http({
                    url: 'api/cat/getExhibs',
                    method: 'get',
                    params: vm.data
                }).then(function (response) {
                    vm.links = ParseLinks.parse(response.headers('link'));
                    vm.totalItems = response.headers('X-Total-Count');
                    vm.queryCount = vm.totalItems;
                    vm.page = pagingParams.page;
                    vm.exhibs = response.data;
                }).catch(function (response) {
                    AlertService.error(response.message);
                })
            }


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
    }

})();

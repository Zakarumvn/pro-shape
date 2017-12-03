/**
 * Created by Katarzyna on 2017-12-02.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('GroupPageController', GroupPageController);

    GroupPageController.$inject = ['$stateParams', '$http', '$scope'];

    /* @ngInject */
    function GroupPageController($stateParams, $http, $scope) {
        var vm = this;
        vm.title = 'GroupPageController';
        vm.groupId = $stateParams.id;

        activate();

        ////////////////

        function activate() {

        }
    }

})();


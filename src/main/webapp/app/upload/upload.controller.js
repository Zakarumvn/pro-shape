/**
 * Created by Katarzyna on 2017-10-13.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('UploadController', UploadController);

    UploadController.$inject = ['$http'];

    /* @ngInject */
    function UploadController($http) {
        var vm = this;
        vm.title = 'UploadController';
        vm.temp = [];
        vm.files = [];

        activate();

        ////////////////

        function activate() {

        }

    }

})();


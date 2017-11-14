/**
 * Created by Katarzyna on 2017-10-13.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('UploadController', UploadController);

    UploadController.$inject = ['$scope', 'Upload', '$timeout', '$http'];

    /* @ngInject */
    function UploadController($scope, Upload, $timeout, $http) {
        var vm = this;
        vm.title = 'UploadController';
        vm.temp = [];
        vm.files = [];
        vm.data = new FormData();
        vm.fileGroupName = '';
        vm.response = null;

        activate();

        ////////////////

        function activate() {

        }

        $scope.uploadFiles = function (files) {
            $scope.files = files;
            if (files && files.length) {

                Upload.upload({
                    url: 'api/upload/object',
                    fields: {'fileGroupName': vm.fileGroupName},
                    file: files,
                    arrayKey: ''
                }).then(function (response) {
                    $timeout(function () {
                        $scope.result = response.data;
                        vm.response  = response.data;
                    });
                }, function (response) {
                    if (response.status > 0) {
                        $scope.errorMsg = response.status + ': ' + response.data;
                    }
                }, function (evt) {
                    $scope.progress =
                        Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
            }
        };

    }

})();


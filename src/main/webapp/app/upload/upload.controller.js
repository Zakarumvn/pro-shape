/**
 * Created by Katarzyna on 2017-10-13.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('UploadController', UploadController);

    UploadController.$inject = ['$scope', 'Upload', '$timeout'];

    /* @ngInject */
    function UploadController($scope, Upload, $timeout) {
        var vm = this;
        vm.title = 'UploadController';
        vm.temp = [];
        vm.files = [];

        activate();

        ////////////////

        function activate() {

        }

        $scope.uploadFiles = function (files) {
            $scope.files = files;
            if (files && files.length) {
                Upload.upload({
                    //url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                    url: 'api/upload/object',
                    fields: {'username': 'zizitop'},
                    file: files

                }).then(function (response) {
                    $timeout(function () {
                        $scope.result = response.data;
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


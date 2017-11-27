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
        vm.description = '';

        vm.validate = validate;

        activate();

        ////////////////

        function activate() {

        }

        function validate(files){
            if (files && files.length && (files.length === 2 || files.length === 3)) {
                var obj=0, mtl=0,jpg=0, png=0;

                for (var i = 0; i < files.length; i++) {
                    if (files[i].name.slice(-3) == 'obj'
                        || files[i].name.slice(-3) == 'mtl'
                        || files[i].name.slice(-3) == 'jpg'
                        || files[i].name.slice(-3) == 'jpeg'
                        || files[i].name.slice(-3) == 'png') {
                        $scope.wrongFormat = false;
                    } else $scope.wrongFormat = true;

                    if(files[i].name.slice(-3) == 'obj') {obj++;}
                    if(files[i].name.slice(-3) == 'mtl') {mtl++;}
                    if(files[i].name.slice(-3) == 'png') {png++;}
                    if(files[i].name.slice(-3) == 'jpg') {jpg++;}

                }

                if(obj > 1 || mtl > 1 || png > 1|| jpg > 1){
                    $scope.wrongFormat = true;
                    return false;
                } else {
                        if(mtl == 1 && obj == 1){
                            return true;
                        } else {
                            return false;
                        }
                }
            } else {
                return false;
            }

        }

        $scope.uploadFiles = function (files) {
            $scope.files = files;
            if (files && files.length) {
                if(vm.validate(files) == true){
                    Upload.upload({
                        url: 'api/file/upload',
                        fields: {'fileGroupName': vm.fileGroupName, 'description': vm.description},
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


            }
        };

    }

})();


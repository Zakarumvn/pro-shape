/**
 * Created by Katarzyna on 2017-11-02.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('ObjectController', ObjectController);

    ObjectController.$inject = ['$scope', '$http'];

    /* @ngInject */
    function ObjectController($scope, $http) {
        var vm = this;
        vm.title = 'ObjectController';
        vm.obj = [];
        vm.fileName = ['M2-04_czaszka_simple100K.obj', 'M2-04_czaszka_simple100K.obj.mtl', 'M2-04_czaszka1_0.jpg'];
        vm.getFile = getFile;
        vm.fileURL = ['','',''];
        vm.files = [];

        $scope.display = 0;
        activate();
        vm.setMaterialObj = setMaterialObj;

        ////////////////

        function activate() {
                for(var i = 0; i< vm.fileName.length; i++){
                    vm.getFile(vm.fileName[i]);
                }

/*            $scope.materialObj = [{

                "name": "Czaszka",
                "objUrl": vm.fileURL[0],
                "mtlUrl": vm.fileURL[1],
                "baseUrl": vm.fileURL[2],
                "position": {
                    "x": 0,
                    "y": 2,
                    "z": 0
                }
            }];*/
            $scope.canvasWidth = 400;
            $scope.canvasHeight = 600;
            $scope.dofillcontainer = true;
            $scope.scale = 1;
            $scope.materialType = 'lambert';

        }

        function setMaterialObj(){
            $scope.materialObj = [{

                "name": "Czaszka",
                "objUrl": vm.fileURL[0],
                "mtlUrl": vm.fileURL[1],
                "baseUrl": vm.fileURL[2],
                "position": {
                    "x": 0,
                    "y": 2,
                    "z": 0
                }
            }];
        }

        function getFile(fileName) {
            if(fileName.slice(-3) === 'png'){
                $http({
                    url: 'api/upload/getTexture',
                    params: {
                        'fileName' : fileName
                    },
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    var file = new Blob([response.data], {
                        type: 'image/png'
                    });
                    vm.files[2] = file;
                    vm.fileURL[2]= URL.createObjectURL(file);
                    $scope.display++;
                });
            }
            else if(fileName.slice(-3) === 'jpg'){
                $http({
                    url: 'api/upload/getTexture',
                    params: {
                        'fileName' : fileName
                    },
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    var file = new Blob([response.data], {
                        type: 'image/jpg'
                    });

                    vm.files[2] = file;
                    vm.fileURL[2]= URL.createObjectURL(file);
                    $scope.display++;
                });
            } else if(fileName.slice(-3) === 'obj'){
                $http({
                    url: 'api/upload/getObject',
                    params: {
                        'fileName' : fileName
                    },
                    responseType: 'blob'
                }).then(function (response) {
                    vm.files[0] = response.data;
                    vm.fileURL[0]= URL.createObjectURL(vm.files[0]);
                    $scope.display++;
                });
            } else if(fileName.slice(-3) === 'mtl'){
                $http({
                    url: 'api/upload/getMaterial',
                    params: {
                        'fileName' : fileName
                    },
                    responseType: 'blob'
                }).then(function (response) {
                    vm.files[1] = response.data;
                    vm.fileURL[1] = URL.createObjectURL(vm.files[1]);
                    $scope.display++;
                });
            }


            return "";



        }

    }

})();


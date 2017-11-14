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
        vm.fileURL = [];
        vm.files = [];




        vm.display = false;
        activate();

        ////////////////

        function activate() {
            for(var i = 0; i < 3; i++){
                var file=0;
       //gdy obrazek ustawic type image/jpg lub png
                //TO DO
                vm.files.push(vm.getFile(vm.fileName[i]));
                vm.fileURL.push(URL.createObjectURL(vm.files[i]));
            }


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
            $scope.canvasWidth = 400;
            $scope.canvasHeight = 600;
            $scope.dofillcontainer = true;
            $scope.scale = 1;
            $scope.materialType = 'lambert';

            if(fileURL[0].length > 0 && fileURL[1].length > 0 && fileURL[2].length > 0 ){
                vm.display = true;
            }
        }

        function getFile(fileName) {
            $http({
                url: 'api/upload/getObject',
                params: {
                    'fileName' : fileName
                },
                responseType: 'blob'
            }).then(function (response) {

                return response.data;
            });
        }

    }

})();


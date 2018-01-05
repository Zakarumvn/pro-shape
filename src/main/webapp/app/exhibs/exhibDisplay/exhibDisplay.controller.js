(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('ExhibDisplayController', ExhibDisplayController);

    ExhibDisplayController.$inject = ['$scope', '$http', '$stateParams'];

    /* @ngInject */
    function ExhibDisplayController($scope, $http, $stateParams) {
        var vm = this;
        vm.title = 'ExhibDisplayController';
        vm.obj = [];
        vm.fileName = [];
        vm.getFile = getFile;
        vm.fileURL = ['', '', ''];
        vm.files = [];
        vm.exhibData = [];
        vm.modelData = [];
        vm.model = [];
        vm.author = 0;

        //exhib
        vm.exhib = [];
        vm.models = [];
        vm.currentModel = 0;
        vm.modelList = [];
        vm.nextModel = 0;
        vm.nextDeactive = null;
        vm.prevModel = 0;
        vm.prevDeactive = null;


        $scope.display = 0;

        activate();

        vm.setMaterialObj = setMaterialObj;


        function activate() {

            vm.exhibData = {
                id: $stateParams.id
            };
            vm.modelData = {
                id: $stateParams.mId
            };
            $http({
                url: 'api/exhib/getExhibById',
                method: 'get',
                params: vm.exhibData
            })
                .then(function (response) {
                    vm.exhib = response.data;
                    vm.models = response.data.models;
                    angular.forEach(vm.exhib.models, function (value) {
                    vm.modelList.push(value.id);
                    });
                    vm.currentModel = vm.modelData.id;
                    getModel(vm.modelList[vm.currentModel]);

                    //Don't ask... JavaScript is a lol.
                    vm.tempCheckNext = vm.currentModel;
                    vm.tempCheckNext++;
                    vm.tempCheckPrev = vm.currentModel;
                    vm.tempNextLength = vm.modelList.length;
                    vm.tempNextLength--;


                    if(vm.tempCheckNext > vm.tempNextLength){
                        vm.nextModel = vm.currentModel;
                        vm.nextDeactive = "True";
                    }else{
                        vm.nextModel = vm.currentModel;
                        vm.nextModel++;
                    }

                    if((vm.tempCheckPrev - 1) < 0){
                        vm.prevDeactive = "True";
                        vm.prevModel = 0;
                    }else{
                        vm.prevModel = vm.currentModel;
                        vm.prevModel--;
                    }

                });
        }

        function getModel(giveId) {

            $http({
                url: 'api/file/getModelById',
                method: 'get',
                params: {id: giveId}
            })
                .then(function (response) {
                    vm.model = response.data;
                    vm.author = vm.model.user.id;
                    for (var i = 0; i < 3; i++) {
                        vm.fileName.push(response.data.files[i].fileName);
                    }
                    for (var j = 0; j < vm.fileName.length; j++) {
                        vm.getFile(vm.fileName[j]);
                    }

                    $scope.canvasWidth = 600;
                    $scope.canvasHeight = 600;
                    $scope.dofillcontainer = true;
                });
        }

        function setMaterialObj() {
            $scope.materialObj = [{

                "name": vm.model.modelName,
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
            if (fileName.slice(-3) === 'png') {
                $http({
                    url: 'api/file/getTexture',
                    params: {
                        'author': vm.author,
                        'fileName': fileName
                    },
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    var file = new Blob([response.data], {
                        type: 'image/png'
                    });
                    vm.files[2] = file;
                    vm.fileURL[2] = URL.createObjectURL(file);
                    $scope.display++;
                });
            }
            else if (fileName.slice(-3) === 'jpg') {
                $http({
                    url: 'api/file/getTexture',
                    params: {
                        'author': vm.author,
                        'fileName': fileName
                    },
                    responseType: 'arraybuffer'
                }).then(function (response) {
                    var file = new Blob([response.data], {
                        type: 'image/jpg'
                    });

                    vm.files[2] = file;
                    vm.fileURL[2] = URL.createObjectURL(file);
                    $scope.display++;
                });
            } else if (fileName.slice(-3) === 'obj') {
                $http({
                    url: 'api/file/getObject',
                    params: {
                        'author': vm.author,
                        'fileName': fileName
                    },
                    responseType: 'blob'
                }).then(function (response) {
                    vm.files[0] = response.data;
                    vm.fileURL[0] = URL.createObjectURL(vm.files[0]);
                    $scope.display++;
                });
            } else if (fileName.slice(-3) === 'mtl') {
                $http({
                    url: 'api/file/getMaterial',
                    params: {
                        'author': vm.author,
                        'fileName': fileName
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


/**
 * Created by Katarzyna on 2017-11-02.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('ObjectController', ObjectController);

    ObjectController.$inject = ['$scope'];

    /* @ngInject */
    function ObjectController($scope) {
        var vm = this;
        vm.title = 'ObjectController';

        activate();

        ////////////////

        function activate() {
            $scope.canvasWidth = 400;
            $scope.canvasHeight = 600;
            $scope.dofillcontainer = true;
            $scope.scale = 1;
            $scope.materialType = 'lambert';
            $scope.materialObj = [{
                "name": "Boar",
                "objUrl": "https://dl.dropboxusercontent.com/s/pn3yw6w5962o5r8/BIGIPIGI.obj?raw=1",
                "colorMapUrl": "https://dl.dropboxusercontent.com/s/19ksb14mroehc8v/mount_boar_02_Color.png?raw=1",
                "normalMapUrl": "https://dl.dropboxusercontent.com/s/19ksb14mroehc8v/mount_boar_02_Normal.png?raw=1",
                "specularMapUrl": "https://dl.dropboxusercontent.com/s/19ksb14mroehc8v/mount_boar_02_Specular.png?raw=1",
                "alphaMapUrl": "https://dl.dropboxusercontent.com/s/19ksb14mroehc8v/mount_boar_02_Alpha.png?raw=1",
                "position": {
                    "x": 0,
                    "y": -1.25,
                    "z": 0
                }
            }, {
                "name": "Shark",
                "alphaMapUrl": "",
                "colorMapUrl": "https://dl.dropboxusercontent.com/s/mf6wy8cvmufez0r/sharknoid_c.png?raw=1",
                "specularMapUrl": "",
                "normalMapUrl": "https://dl.dropboxusercontent.com/s/mf6wy8cvmufez0r/sharknoid_n.png?raw=1",
                "objUrl": "https://dl.dropboxusercontent.com/s/mf6wy8cvmufez0r/SharkNoid_01.obj?raw=1",
                "position": {
                    "x": 0,
                    "y": -.40,
                    "z": 1
                }
            }];
        }

    }

})();


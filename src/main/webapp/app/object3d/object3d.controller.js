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
                "name": "Dzbanek",
                "objUrl": "M2-02_dzbanek_z_nozkami_simple80K.obj",
                "mtlUrl": "M2-02_dzbanek_z_nozkami_simple80K.obj.mtl",
                "baseUrl": "content/objects3d/dzbanek/",
                "position": {
                    "x": 0,
                    "y": 2,
                    "z": 0
                }
            }];
        }

    }

})();


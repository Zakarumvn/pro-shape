/**
 * Created by Katarzyna on 2017-11-29.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('CreateGroupController', CreateGroupController);

    CreateGroupController.$inject = ['$http', '$scope', 'Upload'];

    /* @ngInject */
    function CreateGroupController($http, $scope, Upload) {
        var vm = this;
        vm.title = 'CreateGroupController';
        vm.description = '';
        vm.groupName = '';
        vm.file = [];
        vm.data = [];
        vm.error = null;
        vm.errorUserExists = null;
        vm.success = null;


        vm.createGroup = createGroup;
        vm.validate = validate;
        vm.attachFile = attachFile;

        activate();

        ////////////////

        function activate() {
            $scope.errorMsg = null;
            $scope.file = null;
        }


        function attachFile(file) {
            vm.file = file;
        }

        function validate() {
            if (vm.groupName.length < 0) {
                return false;
            } else return true;
        }

        function createGroup() {
            if (vm.validate()) {

                vm.data = {
                    'groupName': vm.groupName,
                    'groupDescription': vm.description
                };

                $http.post('api/group/createGroup', vm.data).then(function (response) {
                    if (response.status == 200) {
                        vm.success = true;
                    }
                }).catch(function error(response) {
                    if (response.status == 400) {
                        $scope.errorMsg = response.status;
                    }

                });
            }

        }

    }

})();


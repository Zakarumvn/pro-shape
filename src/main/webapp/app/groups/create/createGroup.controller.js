/**
 * Created by Katarzyna on 2017-11-29.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('CreateGroupController', CreateGroupController);

    CreateGroupController.$inject = ['$http', '$scope', 'Upload', 'Principal'];

    /* @ngInject */
    function CreateGroupController($http, $scope, Upload, Principal) {
        var vm = this;
        vm.title = 'CreateGroupController';
        vm.account = null;
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
        vm.isUserGroupMember = isUserGroupMember;

        activate();

        ////////////////

        function activate() {
            Principal.identity().then(function(account) {
                vm.account = account;
            });

            $scope.errorMsg = null;
            $scope.file = null;
        }

        function isUserGroupMember(){
            if(vm.account != undefined && vm.account != null){
                if(vm.account.groupId != null){
                    if(vm.account.groupId == 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }

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

                $http({
                    method: 'post',
                    url: 'api/group/createGroup',
                    params: vm.data
                }).then(function (response) {
                    vm.success = true;
                }).catch(function error(response) {
                    if (response.status == 400) {
                        $scope.errorMsg = response.status;
                    }

                });
            }

        }

    }

})();


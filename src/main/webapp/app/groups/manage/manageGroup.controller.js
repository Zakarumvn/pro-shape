/**
 * Created by Katarzyna on 2017-11-29.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('ManageGroupController', ManageGroupController);

    ManageGroupController.$inject = ['$http', '$scope'];

    /* @ngInject */
    function ManageGroupController($http, $scope) {
        var vm = this;
        vm.title = 'ManageGroupController';
        vm.description = '';
        vm.groupName = '';
        vm.data = [];
        vm.error = null;
        vm.errorUserExists = null;
        vm.success = null;
        vm.group = null;
        vm.currentMember = 0;
        vm.successAccept = false;
        vm.successDelete = false;
        $scope.errorMsg=0;



        vm.getGroup = getGroup;
        vm.updateGroup = updateGroup;
        vm.setCurrentMember = setCurrentMember;
        vm.deleteMember = deleteMember;
        vm.acceptMember = acceptMember;

        activate();

        ////////////////

        function activate() {
            vm.getGroup();

        }

        function getGroup(){
            $http.get('api/group/getGroup').then(function (response) {

                vm.group = response.data;
                vm.description =  vm.group.groupDescription;
                vm.groupName = vm.group.groupName;

            });
        }

        function updateGroup() {
            vm.data = {
                'id': vm.group.id,
                'groupName': vm.groupName,
                'groupDescription': vm.description
            };

            $http({
                url: 'api/group/updateGroup',
                params: vm.data,
                method: 'post'
            }).then(function (response) {
                if (response.status == 200) {
                    vm.success = true;
                }
            }).catch(function error(response) {
                if (response.status == 400 || response.status == 403) {
                    $scope.errorMsg = response.status;
                }

            });
        }

        function setCurrentMember(member){
            vm.currentMember = member;
        }

        function deleteMember() {
            vm.data = {
                member: vm.currentMember.id
            };

            $http({
                method: 'put',
                url: 'api/group/deleteMember',
                params: vm.data
            }).then(function (response) {
                vm.successDelete = true;
                vm.getGroup();
            });
        }

        function acceptMember() {
            vm.data = {
                member: vm.currentMember.id
            };

            $http({
                method: 'put',
                url: 'api/group/acceptMember',
                params: vm.data
            }).then(function (response) {
                vm.successAccept = true;
                vm.getGroup();
            });
        }

    }


})();


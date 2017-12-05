/**
 * Created by Katarzyna on 2017-12-02.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('GroupPageController', GroupPageController);

    GroupPageController.$inject = ['$stateParams', '$http', '$scope', 'Principal', '$filter'];

    /* @ngInject */
    function GroupPageController($stateParams, $http, $scope, Principal, $filter) {
        var vm = this;
        vm.title = 'GroupPageController';
        vm.groupId = { groupId: $stateParams.id };
        vm.group = null;
        vm.account = null;
        vm.data = [];
        vm.status = null;
        vm.joinGroup = joinGroup;
        vm.leaveGroup = leaveGroup;
        vm.getAccount = getAccount;
        vm.checkIfLoggedIsGroupMember = checkIfLoggedIsGroupMember;
        vm.checkIfLoggedIsModerator = checkIfLoggedIsModerator;
        vm.checkUserStatus = checkUserStatus;
        vm.getStatusMessage = getStatusMessage
        vm.checkIfAlreadyHasGroup = checkIfAlreadyHasGroup;


        activate();

        ////////////////

        function activate() {
            vm.getAccount();

            $http({
                url: 'api/group/getGroupById',
                params: vm.groupId,
                method: 'get'
            }).then(function (response) {
                vm.group = response.data;
                vm.status = vm.checkUserStatus();
            });
        }

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
            });
        }

        function joinGroup() {
            vm.data = {groupId: $stateParams.id};

            $http({
                url: 'api/group/joinGroup',
                params: vm.data,
                method: 'post'
            }).then(function (response) {
                vm.status = 1;
            });

        }

        function checkIfAlreadyHasGroup() {
            if(vm.account !== null){
                if(vm.account.groupId !== null && vm.account.groupId !== 0 ){
                    return true;
                } else {
                    return false;
                }
            }

        }


        function leaveGroup(){
            vm.data = {groupId: $stateParams.id};

            $http({
                url: 'api/group/leaveGroup',
                params: vm.data,
                method: 'post'
            }).then(function (response) {
                vm.status = 0;
            });
        }

        function checkIfLoggedIsGroupMember() {
            if(vm.group !== null && vm.account !== null){
                var isMember = $filter('filter')(vm.group.members, {'id': vm.account.id})
                if(isMember.length == 1) return true;
                else return false;
            }
        }


        function checkIfLoggedIsModerator() {
            if(vm.group !== null && vm.account !== null){
                if(vm.account.id == vm.group.ownerId){
                    return true;
                } else return false;
            }
        }

        function checkUserStatus(){
            if(vm.group !== null && vm.account !== null){
                if(vm.checkIfLoggedIsGroupMember() == true){
                    if(vm.account.acceptedInGroup == true){
                        if(vm.checkIfLoggedIsModerator() == true){
                            return 3;
                        } else {
                            return 2;
                        }

                    } else {
                        return 1;
                    }

                } else {
                    return 0;
                }
            }


        }

        function getStatusMessage(){
            var message = '';
            if(vm.status !== null){
                switch(vm.status){
                    case 0: message = "You aren't member of this group."; break;
                    case 1: message = "Awaiting acceptation."; break;
                    case 2: message = "You're member of this group."; break;
                    case 3: message = "You're moderator of this group"; break;
                }
                return message;
            }
        }
    }

})();


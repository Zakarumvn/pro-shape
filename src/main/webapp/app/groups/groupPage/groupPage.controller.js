/**
 * Created by Katarzyna on 2017-12-02.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('GroupPageController', GroupPageController);

    GroupPageController.$inject = ['$stateParams', '$http', '$scope', 'Principal', '$filter',  'ParseLinks', 'AlertService', '$state', 'pagingParams', 'paginationConstants'];

    /* @ngInject */
    function GroupPageController($stateParams, $http, $scope, Principal, $filter, ParseLinks, AlertService, $state, pagingParams, paginationConstants) {
        var vm = this;
        vm.title = 'GroupPageController';
        vm.groupId = { groupId: $stateParams.id };
        vm.group = null;
        vm.account = null;
        vm.data = [];
        vm.status = null;

        vm.links = null;
        vm.totalItems = null;
        vm.queryCount = null;
        vm.page = 1;
        vm.messages = [];
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.itemsPerPage = 3;

        vm.content = "";
        vm.currentMessage = null;

        vm.transition = transition;
        vm.loadPage = loadPage;
        vm.transition = transition;
        vm.sort = sort;

        vm.joinGroup = joinGroup;
        vm.leaveGroup = leaveGroup;
        vm.getAccount = getAccount;
        vm.checkIfLoggedIsGroupMember = checkIfLoggedIsGroupMember;
        vm.checkIfLoggedIsModerator = checkIfLoggedIsModerator;
        vm.checkUserStatus = checkUserStatus;
        vm.getStatusMessage = getStatusMessage
        vm.checkIfAlreadyHasGroup = checkIfAlreadyHasGroup;
        vm.chunk = chunk;

        vm.getMessages = getMessages;
        vm.setCurrentMessage = setCurrentMessage;
        vm.deleteMessage = deleteMessage;
        vm.editMessage = editMessage;
        vm.sendMessage = sendMessage;
        vm.checkPermissionToSendMessage = checkPermissionToSendMessage;
        vm.adminPermission = adminPermission;
        vm.checkPermissionToEditOrDelete = checkPermissionToEditOrDelete;

        activate();

        ////////////////

        function activate() {
            vm.getAccount();
            if(vm.groupId !== null) {
                $http({
                    url: 'api/group/getGroupById',
                    params: vm.groupId,
                    method: 'get'
                }).then(function (response) {
                    vm.group = response.data;
                    vm.status = vm.checkUserStatus();
                    $scope.chunkedMembers = chunk(response.data.members, 2);
                    vm.getMessages();
                });
            }
        }

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
            });
        }

        function sendMessage(){
            vm.data = {
                groupId: $stateParams.id,
                content: vm.content,
                userId: vm.account.id
            };

            $http({
                url: 'api/group/sendMessage',
                params: vm.data,
                method: 'post'
            }).then(function (response) {
                getMessages();
            });
        }

        function getMessages(){
            vm.data = {
                page: pagingParams.page - 1,
                size: vm.itemsPerPage,
                sort: sort(),
                groupId: $stateParams.id
            };

            $http({
                url: 'api/group/getMessages',
                method: 'get',
                params: vm.data
            }).then(function (response) {
                vm.links = ParseLinks.parse(response.headers('link'));
                vm.totalItems = response.headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.page = pagingParams.page;
                vm.messages = response.data;
                vm.content = '';

            }).catch(function (response) {
                AlertService.error(response.message);
            })
        }


        function setCurrentMessage(message) {
            vm.currentMessage = message;
            vm.content = message.messageContent;
        }

        function deleteMessage() {
            vm.data = {
                messageId: vm.currentMessage.id
            };

            $http({
                url: 'api/group/deleteMessage',
                method: 'delete',
                params: vm.data
            }).then(function (response) {
                vm.getMessages();
            });

        }

        function editMessage() {
            vm.data = {
                messageId: vm.currentMessage.id,
                content: vm.content
            };

            $http({
                url: 'api/group/editMessage',
                method: 'post',
                params: vm.data
            }).then(function (response) {
                vm.getMessages();
                vm.content = '';
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
                    if(vm.checkIfLoggedIsModerator() == true){
                        return 3;
                    } else {
                        if(vm.account.acceptedInGroup == true){
                            return 2;
                        } else {
                            return 1;
                        }
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

        function chunk(arr, size) {
            var newArr = [];
            for (var i=0; i<arr.length; i+=size) {
                newArr.push(arr.slice(i, i+size));
            }
            return newArr;
        }


        function loadPage(page) {
            vm.page = page;
            vm.transition();
        }

        function transition() {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }

        function sort() {
            var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
            if (vm.predicate !== 'id') {
                result.push('id');
            }
            return result;
        }

        function checkPermissionToSendMessage() {
            if(vm.account !== null && vm.account !== undefined)
            {
                if(vm.account.groupId == $stateParams.id){
                    return true;
                } else {
                    if(vm.adminPermission() == true){
                        return true;
                    } else {
                        return false;
                    }

                }
            } else {
                return false;
            }


        }


        function adminPermission(){
            if(vm.account !== null && vm.account !== undefined){
                if(vm.account.authorities.includes('ROLE_ADMIN')){
                    return true;
                }

                return false;
            }

            return false;
        }

        function checkPermissionToEditOrDelete(message) {
            if(vm.account !== null && vm.account !== undefined){

                if(message != null){
                    if(message.user.id == vm.account.id){
                        return true;
                    } else {
                        if(vm.adminPermission() == true || vm.checkIfLoggedIsModerator() == true){
                            return true;
                        } else {
                            return false;
                        }
                    }
                }
            }
        }
    }

})();




(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('ExhibsController', ExhibsController);

    ExhibsController.$inject = ['$scope', 'Principal', '$http'];

    /* @ngInject */
    function ExhibsController($scope, Principal, $http) {
        var vm = this;
        vm.title = 'ExhibsController';
        vm.exhib = {};
        vm.error = null;
        vm.success = null;
        vm.createExhibUser = createExhibUser;

        Principal.identity().then(function(account) {
            vm.account = account;
        });

        activate();

        ////////////////

        function activate() {

        }

        function createExhibUser(event){
            event.preventDefault();
            vm.exhib = {
                name : vm.exhib.name,
                description : vm.exhib.description
            };
            $http.post('/api/exhib/createExhibUser', vm.exhib);
        }

    }

})();


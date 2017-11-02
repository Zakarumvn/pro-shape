/**
 * Created by Katarzyna on 2017-11-02.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('ObjectController', ObjectController);

    ObjectController.$inject = [];

    /* @ngInject */
    function ObjectController() {
        var vm = this;
        vm.title = 'ObjectController';

        activate();

        ////////////////

        function activate() {
            window.onload = function(){
                initParameters();
            }
        }

    }

})();


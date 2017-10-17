/**
 * Created by Katarzyna on 2017-10-09.
 */
(function() {
    'use strict';

    angular
        .module('proshapeApp')
        .service('rankService', rankService);

    rankService.$inject = ['$http'];

    function rankService($http) {
        var service = {
            getTestujemy : getTestujemy
        };

        return service;

        function getTestujemy() {
            $http.get('api/test/testujemy');
        }
    }
})();

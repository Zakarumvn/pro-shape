/**
 * Created by Katarzyna on 2017-11-18.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .filter('startFrom', startFrom);

    function startFrom() {
        return startFromFilter;

        ////////////////

        function startFromFilter(input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    }

})();


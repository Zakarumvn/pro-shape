/**
 * Created by Katarzyna on 2017-11-24.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .filter('pageCount', pageCount);

    function pageCount() {
        return pageCountFilter;

        ////////////////

        function pageCountFilter(data, size) {
                if (angular.isArray(data)) {
                    var result = [];
                    for (var i = 0; i < Math.ceil(data.length / size) ; i++) {
                        result.push(i);
                    }
                    return result;
                } else {
                    return data;
                }
        }
    }

})();


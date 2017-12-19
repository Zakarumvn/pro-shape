/**
 * Created by Katarzyna on 2017-10-09.
 */
(function () {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('RankController', RankController);

    RankController.$inject = ['rankService', '$http', '$scope'];

    /* @ngInject */
    function RankController(rankService, $http, $scope) {
        var vm = this;
        vm.title = 'RankController';
        $scope.models = [];

        $scope.filteredModels = []
            ,$scope.currentPage = 1
            ,$scope.numPerPage = 6
            ,$scope.maxSize = 5;


        activate();

        vm.getImage = getImage;

        ////////////////

        function activate() {
            $http.get('api/file/getRank').then(function (response) {
                $scope.models = response.data;

                $scope.$watch('currentPage + numPerPage', function() {
                    var begin = (($scope.currentPage - 1) * $scope.numPerPage)
                        , end = begin + $scope.numPerPage;

                    $scope.filteredModels = $scope.models.slice(begin, end);
                });
            });
        }

        $scope.selectPage = function (newPage) {
            if(newPage > 0 && newPage <= $scope.lastPage()){
                $scope.currentPage = newPage;
            }

        };

        $scope.lastPage = function () {
            return Math.ceil($scope.models.length / $scope.numPerPage );
        };

        function getImage(url){
            //vm.anImage = window.URL.createObjectURL(url);
            var img = URL.createObjectURL(url);
            return img;
        }

    }

})();

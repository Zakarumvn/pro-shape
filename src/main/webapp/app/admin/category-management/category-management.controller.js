(function() {
    'use strict';

    angular
        .module('proshapeApp')
        .controller('CatManagementController', CatManagementController);

    CatManagementController.$inject = ['$scope', '$http', '$timeout', '$state'];

    function CatManagementController($scope, $http, $timeout, $state) {
        var vm = this;

        vm.data = {};
        vm.success = null;
        vm.err = null;

        vm.modelCategories = [];
        vm.exhibCategories = [];

        //// for modals
        vm.activeCategory = null;
        vm.newCategory = {};
        vm.editCategory = {};
        vm.delCategory = {};
        ////

        vm.setNewCategoryType = setNewCategoryType;
        vm.createCategory = createCategory;
        vm.setEditedCategory = setEditedCategory;
        vm.updateCategoryNames = updateCategoryNames;
        vm.setDeletedCategory = setDeletedCategory;
        vm.deleteCategory = deleteCategory;


        activate();

        function activate() {
            vm.data = {
                type : "model"
            }
            $http({
                url: 'api/cat/getAllByType',
                params: vm.data,
                method: 'get'
            }).then(function (response) {
                vm.modelCategories = response.data;
            });

            vm.data = {
                type : "exhib"
            }
            $http({
                url: 'api/cat/getAllByType',
                params: vm.data,
                method: 'get'
            }).then(function (response) {
                vm.exhibCategories = response.data;
            });
        }

        function setEditedCategory(category) {
            vm.editCategory = category;
        }

        function setDeletedCategory(category) {
            vm.delCategory = category;
        }

        function setNewCategoryType(type) {
            vm.newCategory.type = type;
        }

        function createCategory() {
            vm.newCategory = {
                name : vm.newCategory.name,
                description : vm.newCategory.description,
                type : vm.newCategory.type
            };
            $http.post('/api/cat/createCategory', vm.newCategory)
                .success(function () {
                    vm.success = "New category ("+vm.newCategory.name+") created!";
                    $timeout(function () {
                        $state.reload();
                    }, 3000);
                });
        }

        function updateCategoryNames() {
            vm.editCategory = {
                categoryId : vm.editCategory.categoryId,
                name : vm.editCategory.name,
                description : vm.editCategory.description
            }
            $http.post('/api/cat/updateCategoryNames', vm.editCategory)
                .success(function () {
                    vm.success = "Category "+vm.editCategory.name+" updated!";
                    $timeout(function () {
                        $state.reload();
                    }, 3000);
                });
        }

        function deleteCategory() {
            vm.delCategory = {
                categoryId : vm.delCategory.categoryId
            }
            $http.post('/api/cat/deleteCategory', vm.delCategory)
                .success(function () {
                    vm.success = "Category deleted!";
                    $timeout(function () {
                        $state.reload();
                    }, 3000);
                });

        }
    }
})();

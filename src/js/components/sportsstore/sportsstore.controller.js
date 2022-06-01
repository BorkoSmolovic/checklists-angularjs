(function () {
    'use strict';

    angular
        .module('app.components.sportsstore')
        .constant('productListActiveClass', 'btn-primary')
        .constant('productListPageCount', 3)
        .controller('SportsstoreController', SportsstoreController);

    SportsstoreController.$inject = ["$http", "productListActiveClass", "productListPageCount"];

    function SportsstoreController($http, productListActiveClass, productListPageCount) {

        var vm = this;

        var products = {};

        vm.data = products;

        $http.get("src/js/components/sportsstore/data.json").then(function (response) {
            products.items = response.data;
        });

        var selectedCategory = null;

        vm.selectedPage = 1;
        vm.pageSize = productListPageCount;

        vm.selectCategory = function (newCategory) {
            selectedCategory = newCategory;
            vm.selectedPage = 1;
        };

        vm.selectPage = function (newPage) {
            vm.selectedPage = newPage;
        };

        vm.categoryFilterFn = function (product) {
            return selectedCategory === null || product.category === selectedCategory;
        };

        vm.getCategoryClass = function (category) {
            return selectedCategory === category ? productListActiveClass : "";
        };

        vm.getPageClass = function (page) {
            return vm.selectedPage === page ? productListActiveClass : "";
        };


    }


})();

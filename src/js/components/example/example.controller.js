(function () {
    'use strict';

    angular
        .module('app.components.example')
        .controller('ExampleController', ExampleController);

    ExampleController.$inject = ["$http"];

    function ExampleController($http) {

        var vm = this;

        var model = {
            user: "Jovana"
        };

        vm.todo = model;

        $http.get("src/js/components/example/todo.json").then(function (response) {
            model.items = response.data;
        });

        vm.incompleteCount = function () {
            var count = 0;
            angular.forEach(vm.todo.items, function (item) {
                if (!item.done) {
                    count++;
                }
            });
            return count;
        };

        vm.warningLevel = function () {
            return vm.incompleteCount() < 3 ? "label-success" : "label-warning";
        };

        vm.addNewItem = function (actionText) {
            vm.todo.items.push({action: actionText, done: false});
        };




    }

})();

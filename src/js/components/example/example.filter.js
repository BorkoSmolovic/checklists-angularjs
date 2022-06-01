(function () {
        'use strict';

        angular
            .module('app.components.example')
            .filter('ExampleFilter', ExampleFilter);

        ExampleFilter.$inject = [];

        function ExampleFilter() {
            return function (items, showComplete) {
                var resultArr = [];
                angular.forEach(items, function (item) {
                    if (item.done == false || showComplete == true) {
                        resultArr.push(item);
                    }
                });
                return resultArr;
            };

        }

    }

)();

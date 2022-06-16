/**
 * Created by Borko Smolovic on 15.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components')
        .directive('subtaskRow', subtaskRow);

    subtaskRow.$inject = [];

    function subtaskRow() {

        function link($scope, element, attr) {
        }

        return {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                subtask: '<'
            },
            templateUrl: 'src/js/components/directives/subtaskRow/views/subtaskRow.view.html',
        };
    }

})();
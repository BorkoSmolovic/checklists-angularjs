/**
 * Created by Borko Smolovic on 7.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components')
        .directive('checklistsRow', checklistsRow);

    checklistsRow.$inject = [];

    function checklistsRow() {

        function link($scope, element, attr) {
        }

        return {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                checklist: '<'
            },
            templateUrl: 'src/js/components/directives/checklistsRow/views/checklistsRow.view.html',
            controller: 'ChecklistsRowController',
            controllerAs: 'vm',
            bindToController: true,
        };
    }

})();
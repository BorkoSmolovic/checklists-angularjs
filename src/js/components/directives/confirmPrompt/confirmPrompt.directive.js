/**
 * Created by Borko Smolovic on 14.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components')
        .directive('confirmPrompt', confirmPrompt);

    confirmPrompt.$inject = [];

    function confirmPrompt() {

        function link($scope, element, attr) {
            console.log('scop',$scope)
            console.log('attrs',attr)
        }

        return {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                title: '<',
                text: '<',
                result: '&result'
            },
            templateUrl: 'src/js/components/directives/confirmPrompt/views/confirmPrompt.view.html',
        };
    }

})();
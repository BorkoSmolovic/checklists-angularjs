/**
 * Created by Lindon Camaj on 10/9/17.
 */
(function () {
    'use strict';

    angular
        .module('app.core.layout', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    /**
     * Module configuration
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('app', {
                abstract: true,
                url: '/app',
                controller: 'LayoutController',
                controllerAs: 'vm',
                templateUrl: 'core/layout/views/layout.view.html'
            });
    }

})();

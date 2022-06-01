/**
 * Created by Jovana Tesovic on 15/03/19.
 */
(function(){
    'use strict';

    angular
        .module('app.components.sportsstore', [])
        .config(config);

    config.$inject = ['$stateProvider' ];

    /**
     * Module config
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('sportsstore', {
                url: '/sportsstore',
                parent: 'app',
                views: {
                    content: {
                        controller: 'SportsstoreController',
                        controllerAs: 'vm',
                        templateUrl: 'components/sportsstore/sportsstore.view.html'
                    }
                }
            });
    }

})();

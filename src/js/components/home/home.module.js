/**
 * Created by Lindon Camaj on 10/9/17.
 */
(function(){
    'use strict';

    angular
        .module('app.components.home', [])
        .config(config);

    config.$inject = ['$stateProvider' ];

    /**
     * Module config
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('home', {
                url: '/home',
                parent: 'app',
                views: {
                    content: {
                        controller: 'HomeController',
                        controllerAs: 'vm',
                        templateUrl: 'components/home/views/home.view.html'
                    }
                }
            });
    }

})();

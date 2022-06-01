/**
 * Created by Lindon Camaj on 10/9/17.
 */
(function(){
    'use strict';

    angular
        .module('app.components.example', [])
        .config(config);

    config.$inject = ['$stateProvider' ];

    /**
     * Module config
     * @param $stateProvider
     */
    function config($stateProvider) {
        $stateProvider
            .state('example', {
                url: '/example',
                parent: 'app',
                views: {
                    content: {
                        controller: 'ExampleController',
                        controllerAs: 'vm',
                        templateUrl: 'components/example/example.view.html'
                    }
                }
            });
    }

})();

/**
 * Created by Lindon Camaj on 10/9/17.
 */
(function(){
    'use strict';

    angular
        .module('app', [
            'ui.router',
            'ngSanitize',
            'app.core',
            'app.components'
        ])
        .config(config)
        .run(run);

    config.$inject = ['$urlRouterProvider', '$locationProvider', '$urlMatcherFactoryProvider', '$httpProvider'  ];
    run.$inject = ['$rootScope', '$http', '$state', '$transitions'];

    function config($urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider, $httpProvider) {
        $urlMatcherFactoryProvider.strictMode(false);
        // $httpProvider.defaults.withCredentials = true;

        // $httpProvider.interceptors.push('APIInterceptor');

        // Rule that converts url to lower case
        $urlRouterProvider.rule(function ($injector, $location) {
            var path = $location.path(),
                lowerCasePath = path.toLowerCase();

            // if path is not lower case then convert to lower case
            if (path !== lowerCasePath) {
                $location.replace().path(lowerCasePath);
            }
        });

        $locationProvider.hashPrefix("!");
        $urlRouterProvider.otherwise("/app/home");
    }

    function run($rootScope, $http, $state, $transitions) {

        // on state successfully changed
        $transitions.onSuccess({to: '**'}, function(trans){
            $rootScope.title = "SynergySuite ";
            var state = trans.router.stateService;
            if(angular.isDefined(state.current) && angular.isDefined(state.current.title)){
                $rootScope.title += state.current.title;
            }
        });

    }

})();

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
            'app.components',
            'ngMaterial',
        ])
        .config(config)
        .run(run);

    config.$inject = ['$urlRouterProvider', '$locationProvider', '$urlMatcherFactoryProvider', '$httpProvider', '$mdThemingProvider'];
    run.$inject = ['$rootScope', '$http', '$state', '$transitions'];

    function config($urlRouterProvider, $locationProvider, $urlMatcherFactoryProvider, $httpProvider, $mdThemingProvider) {
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

        addCustomPalettes($mdThemingProvider)
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

        $http.defaults.headers.common['synergy-login-token'] = '908c7162-8c74-4691-b775-be31e4f94ec5';
    }

    function addCustomPalettes($mdThemingProvider){

        $mdThemingProvider.definePalette('synorange', {
            '50': 'fdede4',
            '100': 'fad2bc',
            '200': 'f7b590',
            '300': 'f39763',
            '400': 'f18041',
            '500': 'ee6a20',
            '600': 'ec621c',
            '700': 'e95718',
            '800': 'e74d13',
            '900': 'e23c0b',
            'A100': 'ffffff',
            'A200': 'ffe0da',
            'A400': 'ffb7a7',
            'A700': 'ffa28d',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': [
                '700',
                '800',
                '900'
            ]
        });

        $mdThemingProvider.definePalette('synblue', {
            '50': 'e7f5fb',
            '100': 'c3e6f5',
            '200': '9cd6ee',
            '300': '74c6e7',
            '400': '56b9e1',
            '500': '38addc',
            '600': '32a6d8',
            '700': '2b9cd3',
            '800': '2493ce',
            '900': '1783c5',
            'A100': 'f7fcff',
            'A200': 'c4e7ff',
            'A400': '91d2ff',
            'A700': '78c8ff',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': [
                '800',
                '900'
            ]
        });

        $mdThemingProvider.definePalette('synred', {
            '50': 'fde7e6',
            '100': 'fbc4c1',
            '200': 'f99d98',
            '300': 'f6756e',
            '400': 'f4584f',
            '500': 'f23a30',
            '600': 'f0342b',
            '700': 'ee2c24',
            '800': 'ec251e',
            '900': 'e81813',
            'A100': 'ffffff',
            'A200': 'ffe4e4',
            'A400': 'ffb2b1',
            'A700': 'ff9997',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': [
                '500',
                '600',
                '700',
                '800',
                '900'
            ]
        });

        $mdThemingProvider.definePalette('synyellow', {
            '50': 'fff9e8',
            '100': 'fef1c6',
            '200': 'fde7a0',
            '300': 'fcdd7a',
            '400': 'fcd65e',
            '500': 'fbcf41',
            '600': 'faca3b',
            '700': 'fac332',
            '800': 'f9bd2a',
            '900': 'f8b21c',
            'A100': 'ffffff',
            'A200': 'fffdf9',
            'A400': 'ffecc6',
            'A700': 'ffe3ad',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': []
        });

        $mdThemingProvider.definePalette('syngray', {
            '50': 'f6f6f6',
            '100': 'e9e9e9',
            '200': 'dadada',
            '300': 'cbcbcb',
            '400': 'c0c0c0',
            '500': 'b5b5b5',
            '600': 'aeaeae',
            '700': 'a5a5a5',
            '800': '9d9d9d',
            '900': '8d8d8d',
            'A100': 'ffffff',
            'A200': 'fef4f4',
            'A400': 'ffc0c0',
            'A700': 'ffa7a7',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': []
        });

        $mdThemingProvider.definePalette('synpink', {
            '50': 'fef6f6',
            '100': 'fee8e7',
            '200': 'fdd9d8',
            '300': 'fccac8',
            '400': 'fbbebc',
            '500': 'fab3b0',
            '600': 'f9aca9',
            '700': 'f9a3a0',
            '800': 'f89a97',
            '900': 'f68b87',
            'A100': 'ffffff',
            'A200': 'ffffff',
            'A400': 'ffffff',
            'A700': 'ffffff',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': []
        });

        $mdThemingProvider.definePalette('synwhite', {
            '50': 'ffffff',
            '100': 'ffffff',
            '200': 'ffffff',
            '300': 'ffffff',
            '400': 'ffffff',
            '500': 'ffffff',
            '600': 'ffffff',
            '700': 'ffffff',
            '800': 'ffffff',
            '900': 'ffffff',
            'A100': 'ffffff',
            'A200': 'ffffff',
            'A400': 'ffffff',
            'A700': 'ffffff',
            'contrastDefaultColor': 'light',
            'contrastDarkColors': [
                '50',
                '100',
                '200',
                '300',
                '400',
                '500',
                '600',
                '700',
                '800',
                '900',
                'A100',
                'A200',
                'A400',
                'A700'
            ],
            'contrastLightColors': []
        });

        $mdThemingProvider.theme('default')
            .primaryPalette('synorange')
    }

})();

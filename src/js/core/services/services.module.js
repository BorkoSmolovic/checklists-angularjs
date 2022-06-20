/**
 * Created by Lindon Camaj on 10/9/17.
 */
(function () {
    'use strict';

    angular
        .module('app.core.services', [])
        .factory('HttpInterceptorService', HttpInterceptorService);

    HttpInterceptorService.$inject = ['$q', '$rootScope'];

    function HttpInterceptorService($q,$rootScope) {
        var interceptor = {
            'request': function (config) {
                $rootScope.loading = true;
                // Successful request method
                return config; // or $q.when(config);
            },
            'response': function (response) {
                $rootScope.loading = false;
                // successful response
                return response; // or $q.when(config);
            },
            'requestError': function (rejection) {
                // an error happened on the request
                // if we can recover from the error
                // we can return a new request
                // or promise
                return response; // or new promise
                // Otherwise, we can reject the next
                // by returning a rejection
                // return $q.reject(rejection);
            },
            'responseError': function (rejection) {
                // an error happened on the request
                // if we can recover from the error
                // we can return a new response
                // or promise
                return rejection; // or new promise
                // Otherwise, we can reject the next
                // by returning a rejection
                // return $q.reject(rejection);
            }
        };
        return interceptor;
    }
})();

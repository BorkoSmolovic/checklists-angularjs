/**
 * Created by misur on 30/10/17.
 */
(function () {
    'use strict';

    angular
        .module('app.components.home')
        .factory('HomeService', HomeService);

    HomeService.$inject = [];

    function HomeService() {
        var factory = {};
        return factory;
    }

})();

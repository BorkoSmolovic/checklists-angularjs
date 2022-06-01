/**
 * Created by Lindon Camaj on 10/9/17.
 */
(function(){
    'use strict';

    angular
        .module('app.core.layout')
        .controller('LayoutController', LayoutController);

    LayoutController.$inject = ['$scope'];

    /**
     * LayoutController
     * @param $scope
     * @constructor
     */
    function LayoutController($scope) {
        var layoutCtrl = this;
    }
})();

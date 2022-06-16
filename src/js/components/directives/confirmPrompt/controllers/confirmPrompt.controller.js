/**
 * Created by Borko Smolovic on 14.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.checklists')
        .controller('ConfirmPromptController', ConfirmPromptController);

    ConfirmPromptController.$inject = ['$scope','$mdDialog', 'data'];

    function ConfirmPromptController($scope, $mdDialog, data) {

        var vm = this;
        vm.data = data;
        vm.onClose = onClose;
        vm.onConfirm = onConfirm;

        function onClose(){
            $mdDialog.hide(false);
        }

        function onConfirm(){
            $mdDialog.hide(true)
        }

    }
})();
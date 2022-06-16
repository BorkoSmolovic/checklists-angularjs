/**
 * Created by Borko Smolovic on 16.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.checklists')
        .controller('TaskNoteController', TaskNoteController);

    TaskNoteController.$inject = ['$scope','$mdDialog', 'data'];

    function TaskNoteController($scope, $mdDialog, data) {

        var vm = this;
        vm.comment = '';
        vm.data = data;
        vm.onClose = onClose;
        vm.onConfirm = onConfirm;

        function onClose(){
            $mdDialog.hide(false);
        }

        function onConfirm(){
            $mdDialog.hide(vm.comment)
        }
    }
})();
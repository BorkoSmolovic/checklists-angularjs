/**
 * Created by Lindon Camaj on 10/9/17.
 */
(function () {
    'use strict';

    angular
        .module('app.core.layout')
        .controller('LayoutController', LayoutController);

    LayoutController.$inject = ['$scope', '$state', 'ChecklistsService', '$mdDialog'];

    /**
     * LayoutController
     * @param $scope
     * @constructor
     */
    function LayoutController($scope, $state, ChecklistsService, $mdDialog) {
        var vm = this;
        vm.showBackBtn = false;
        vm.showDelBtn = false;
        vm.showChecklistSetupBtn = false;
        vm.onBackBtn = onBackBtn;
        vm.onDelBtn = onDelBtn;
        vm.showDialog = showDialog;
        vm.$onInit = onInit;
        $scope.$on("openSetup", onOpenSetup);
        $scope.$on("closeSetup", onCloseSetup);
        $scope.$on("openTasks", onOpenTasks)

        function onInit() {
            if ($state.router.globals.params.checklistId) {
                vm.showBackBtn = true;
                vm.showDelBtn = true;
            }
        }

        function onBackBtn() {
            $state.go($state.current.previousState.name);
            vm.showBackBtn = false;
            vm.showDelBtn = false;
            vm.showChecklistSetupBtn = false;
        }

        function onDelBtn() {
            let data = {
                title: 'Delete Checklist',
                text: 'Are you sure that you want to delete the checklist?',
            }
            vm.showDialog(data).then(function (data) {
                if (data) {
                    ChecklistsService.deleteChecklist($state.router.globals.params.checklistId).then(function () {
                        onBackBtn()
                    })
                }
            }).catch(function (data) {
                console.log('catch', data)
            }).finally(function () {

            });
        }

        function onOpenSetup(evt, data) {
            vm.showBackBtn = true;
            vm.showDelBtn = true;
        }

        function onCloseSetup(evt, data) {
            vm.showBackBtn = false;
            vm.showDelBtn = false;
            vm.showChecklistSetupBtn = false;
        }

        function showDialog(data) {
            return $mdDialog.show({
                controller: 'ConfirmPromptController',
                controllerAs: 'vm',
                locals: {data: data},
                templateUrl: 'src/js/components/directives/confirmPrompt/views/confirmPrompt.view.html',
                targetEvent: event,
            })
        }

        function onOpenTasks(evt, data){
            vm.showBackBtn = true;
            vm.showChecklistSetupBtn = true;
        }

    }
})();

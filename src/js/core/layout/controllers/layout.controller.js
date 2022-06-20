/**
 * Created by Lindon Camaj on 10/9/17.
 */
(function () {
    'use strict';

    angular
        .module('app.core.layout')
        .controller('LayoutController', LayoutController);

    LayoutController.$inject = ['$scope', '$state', 'ChecklistsService', '$mdDialog', '$rootScope', 'TasksService'];

    /**
     * LayoutController
     * @param $scope
     * @constructor
     */
    function LayoutController($scope, $state, ChecklistsService, $mdDialog, $rootScope, TasksService) {
        var vm = this;
        vm.data = '';
        vm.showBackBtn = false;
        vm.showDelBtn = false;
        vm.showChecklistSetupBtn = false;
        vm.isTask = false;
        vm.onBackBtn = onBackBtn;
        vm.onDelBtn = onDelBtn;
        vm.showDialog = showDialog;
        vm.onChecklistSetup = onChecklistSetup;
        vm.$onInit = onInit;
        $scope.$on("openSetup", onOpenSetup);
        $scope.$on("closeSetup", onCloseSetup);
        $scope.$on("openTasks", onOpenTasks);
        $scope.$on("openTaskSetup", onOpenTaskSetup);

        function onInit() {
            if ($state.router.globals.params.checklistId) {
                vm.showBackBtn = true;
                vm.showDelBtn = true;
            }
        }

        function onBackBtn() {
            $state.go($rootScope.previousState.name,$rootScope.previousState.params);
            if($rootScope.previousState.name == 'tasks'){
                onOpenTasks()
                }
            else if($rootScope.previousState.name == 'tasksSetup'){
                onOpenTaskSetup()
            }else{
                vm.showBackBtn = false;
                vm.showDelBtn = false;
                vm.showChecklistSetupBtn = false;
            }
        }

        function onDelBtn() {
            vm.showDialog(vm.data).then(function (data) {
                if (data) {
                    if(vm.isTask){
                        TasksService.deleteTask($state.router.globals.params.subtaskId).then(function (){
                            onBackBtn()
                        })
                    }else{
                        ChecklistsService.deleteChecklist($state.router.globals.params.checklistId).then(function () {
                            onBackBtn()
                        })
                    }

                }
            }).catch(function (data) {
                console.log('catch', data)
            }).finally(function () {

            });
        }

        function onOpenSetup(evt, data) {
            vm.isTask = false;
            vm.data = {
                title: 'Delete Checklist',
                text: 'Are you sure that you want to delete the checklist?',
            }
            vm.showBackBtn = true;
            vm.showDelBtn = true;
            vm.showChecklistSetupBtn = false;
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

        function onOpenTasks(evt, data) {
            vm.showBackBtn = true;
            vm.showDelBtn = false;
            vm.showChecklistSetupBtn = true;
        }

        function onOpenTaskSetup(evt, data){
            vm.isTask = true;
            vm.data = {
                title: 'Delete Task',
                text: 'Are you sure that you want to delete the task?',
            }
            vm.showBackBtn = true;
            vm.showDelBtn = true;
            vm.showChecklistSetupBtn = false;
        }

        function onChecklistSetup() {
            $rootScope.$broadcast("openChecklistSetupFromHeader");
            onOpenSetup();
        }
    }
})();

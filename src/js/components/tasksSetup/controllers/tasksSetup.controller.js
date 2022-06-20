/**
 * Created by Borko Smolovic on 17.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.tasksSetup')
        .controller('TasksSetupController', TasksSetupController);

    TasksSetupController.$inject = ['subtaskDetails', '$rootScope', 'TasksService', '$state'];

    function TasksSetupController(subtaskDetails, $rootScope, TasksService, $state) {

        var vm = this;
        vm.subtaskDetails = subtaskDetails;
        vm.onCancel = onCancel;
        vm.updateTask = updateTask;
        vm.clearCompleteByTime = clearCompleteByTime;

        function onCancel(){
            $rootScope.$broadcast("openTasks");
            $state.go($rootScope.previousState.name,$rootScope.previousState.params);
        }

        function updateTask(){
            TasksService.onSubtaskUpdate(vm.subtaskDetails).then(function () {
                onCancel()
            })
        }

        function clearCompleteByTime(){
            console.log('wtf')
            vm.subtaskDetails.completeByTime = '';
        }

    }
})();
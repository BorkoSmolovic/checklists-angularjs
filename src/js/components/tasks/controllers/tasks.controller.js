/**
 * Created by Borko Smolovic on 15.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.tasks')
        .controller('TasksController', TasksController);

    TasksController.$inject = ['tasks', 'TasksService', '$stateParams', '$mdDialog', '$scope', '$state', '$rootScope'];

    function TasksController(tasks, TasksService, $stateParams, $mdDialog, $scope, $state, $rootScope) {

        var vm = this;
        vm.task = tasks;
        vm.subTasks = tasks.subTasks;
        vm.showAddTaskBtn = true;
        vm.newTask = '';
        vm.onAddBtnPress = onAddBtnPress;
        vm.onTaskAdd = onTaskAdd;
        vm.handleSwipe = handleSwipe;
        vm.onSubtaskNA = onSubtaskNA;
        vm.showDialog = showDialog;
        vm.onSubtaskNote = onSubtaskNote;
        vm.onCheckboxClick = onCheckboxClick;
        vm.onSubtaskSetup = onSubtaskSetup;
        $scope.$on("openChecklistSetupFromHeader",openChecklistSetupFromHeader);

        function onAddBtnPress() {
            vm.showAddTaskBtn = false;
        }

        function onTaskAdd() {
            TasksService.addNewTask(vm.newTask).then(function () {
                TasksService.getTasks($stateParams).then(function (data){
                    vm.subTasks = data.subTasks;
                    vm.showAddTaskBtn = true;
                    vm.newTask = '';
                })
            })
        }

        function handleSwipe(evt, target) {

            //get id
            let id = evt.target.id;
            if (!id) {
                id = evt.target.offsetParent.id;
            }

            //prep id
            id = id.includes("inside1") ? id.replace("inside1", "") : id;

            //reset other swiped rows
            if (vm.prevID1 && "inside1" + id != vm.prevID1) {
                let temp1 = document.getElementById(vm.prevID1);
                let temp2 = document.getElementById(vm.prevID2);
                if (temp1 && temp2) {
                    temp1.style.transform = "translateX(0)";
                    temp2.style.transform = "translateX(0)";
                }
            }

            //save prev id for closing other rows
            vm.prevID1 = "inside1" + id;
            vm.prevID2 = "inside2" + id;

            //get items to swipe
            // let in1 = document.getElementById(vm.prevID1);
            // let in2 = document.getElementById(vm.prevID2);
            let in1 = document.getElementById(vm.prevID1)
            let in2 = document.getElementById(vm.prevID2)

            //handle left and right
            if (evt.pointer.directionX == "left" && in1 && in2) {
                in1.style.transform = "translateX(-" + in2.offsetWidth + "px)";
                in2.style.transform = "translateX(-100%)";
            } else if (evt.pointer.directionX == "right" && in1 && in2) {
                in1.style.transform = "translateX(0)";
                in2.style.transform = "translateX(0)";
            }
        }

        function onSubtaskNA(subtask){
            TasksService.onSubtaskNA(subtask).then(function (){
                TasksService.getTasks($stateParams).then(function (data){
                    vm.subTasks = data.subTasks;
                });
            });
        }

        function showDialog(data) {
            return $mdDialog.show({
                controller: 'TaskNoteController',
                controllerAs: 'vm',
                locals: {data: data},
                templateUrl: 'src/js/components/directives/taskNote/views/taskNote.view.html',
                targetEvent: event,
            })
        }

        function onSubtaskNote(subtask){
            vm.showDialog(subtask).then(function (data){
                if(data){
                    subtask.note = data;
                    TasksService.onSubtaskNote(subtask).then(function (){
                        TasksService.getTasks($stateParams).then(function (data){
                            vm.subTasks = data.subTasks;
                        });
                    })
                }
            }).catch(function (data){
                console.log('catch',data)
            }).finally(function (){

            });
        }

        function onCheckboxClick(subtask){
            TasksService.onCheckboxClick(subtask).then(function (){
                TasksService.getTasks($stateParams).then(function (data){
                    vm.subTasks = data.subTasks;
                });
            });
        }

        function openChecklistSetupFromHeader(){
            $state.go('checklistsSetup', {checklistId: vm.task.id});
        }

        function onSubtaskSetup(subtaskId){
            $rootScope.$broadcast("openTaskSetup", subtaskId);
            $state.go('tasksSetup', {subtaskId: subtaskId});
        }
    }
})();
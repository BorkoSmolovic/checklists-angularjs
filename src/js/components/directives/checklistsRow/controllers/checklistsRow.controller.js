/**
 * Created by Borko Smolovic on 7.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components')
        .controller('ChecklistsRowController', ChecklistsRowController);

    ChecklistsRowController.$inject = ['$timeout'];

    function ChecklistsRowController($timeout) {

        var vm = this;
        $timeout(function () {
            vm.totalSubTasks = totalSubTasks();
            vm.completedSubTasks = completedSubTasks();
            vm.competedPercentage = completedPercentage();
        }, 0);

        function completedSubTasks() {
            if (!vm.checklist.subTasks) {
                return 0;
            }
            let completed = 0;
            vm.checklist.subTasks.forEach(subtask => {
                if(subtask.result){
                    subtask.result.completed ? completed++ : '';
                    subtask.result.na ? completed++ : '';
                }

            })
            return completed;
        }

        function totalSubTasks() {
            return vm.checklist.subTasks ? vm.checklist.subTasks.length : 0;
        }

        function completedPercentage(){
            if(vm.totalSubTasks < 1){
                return 0
            }
            return Math.floor((vm.completedSubTasks / vm.totalSubTasks )*100)
        }

    }
})();
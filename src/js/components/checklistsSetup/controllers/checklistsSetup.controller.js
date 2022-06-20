/**
 * Created by Borko Smolovic on 10.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.checklistsSetup')
        .controller('ChecklistsSetupController', ChecklistsSetupController);

    ChecklistsSetupController.$inject = ['checklistDetails', 'ChecklistsService', '$state', '$rootScope'];

    function ChecklistsSetupController(checklistDetails, ChecklistsService, $state, $rootScope) {
        var vm = this;
        vm.checklistDetails = checklistDetails;
        vm.updateChecklist = updateChecklist;
        vm.onCancel = onCancel;

        function updateChecklist() {
            ChecklistsService.updateChecklist(vm.checklistDetails).then(function () {
                onCancel()
            })
        }

        function onCancel(){
            $rootScope.$broadcast("openTasks");
            $state.go($rootScope.previousState.name,$rootScope.previousState.params);
        }
    }
})();
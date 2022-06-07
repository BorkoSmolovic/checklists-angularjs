/**
 * Created by Borko Smolovic on 2.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.checklists')
        .controller('ChecklistsController', ChecklistsController);

    ChecklistsController.$inject = ['outlets', 'ChecklistsService'];

    function ChecklistsController(outlets, ChecklistsService) {

        var vm = this;
        vm.outlets = outlets;
        vm.selectedOutlet = {};
        vm.checklists = []
        vm.onChangeOutlet = onChangeOutlet(vm.selectedOutlet)

        function onChangeOutlet(outlet){
            console.log("evo ga " + outlet)
            // vm.checklists = ChecklistsService.getChecklists(vm.selectedOutlet)
        }

    }
})();
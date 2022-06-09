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
        vm.selectedOutlet = null;
        vm.checklists = [];
        vm.showAddChecklistButton = true;
        vm.newChecklist = ''
        vm.getOutlets = getOutlets;
        vm.onChecklistAdd = onChecklistAdd;
        vm.onAddBtnPress = onAddBtnPress;
        vm.test = test;

        function getOutlets() {
            ChecklistsService.loadChecklists(vm.selectedOutlet).then(function (data) {
                vm.checklists = data;
                vm.showAddChecklistButton = true;
                vm.newChecklist = '';

            })
        }

        function onAddBtnPress() {
            vm.showAddChecklistButton = false;
        }

        function onChecklistAdd() {
            let data = {
                name: vm.newChecklist,
                validDays: 'montuewedthufrisatsun',
                companyId: vm.selectedOutlet.id,
            }
            ChecklistsService.addNewChecklist(data).then(function () {
                getOutlets();
            })
        }

        function test() {
            console.log('test', vm.checklists)
        }
    }
})();
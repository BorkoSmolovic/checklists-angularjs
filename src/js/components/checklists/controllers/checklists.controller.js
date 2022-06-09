/**
 * Created by Borko Smolovic on 2.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.checklists')
        .controller('ChecklistsController', ChecklistsController);

    ChecklistsController.$inject = ['outlets', 'ChecklistsService', '$scope'];

    function ChecklistsController(outlets, ChecklistsService, $scope) {

        var vm = this;
        vm.outlets = outlets;
        vm.selectedOutlet = null;
        vm.checklists = [];
        vm.showAddChecklistBtn = true;
        vm.newChecklist = '';
        vm.prevId = -1;
        vm.getOutlets = getOutlets;
        vm.onChecklistAdd = onChecklistAdd;
        vm.onAddBtnPress = onAddBtnPress;
        vm.handleSwipe = handleSwipe;
        vm.test = test;

        function getOutlets() {
            ChecklistsService.loadChecklists(vm.selectedOutlet).then(function (data) {
                vm.checklists = data;
                vm.showAddChecklistBtn = true;
                vm.newChecklist = '';
            })
        }

        function onAddBtnPress() {
            vm.showAddChecklistBtn = false;
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

        function test() {
            console.log('test', vm.checklists)
        }
    }
})();
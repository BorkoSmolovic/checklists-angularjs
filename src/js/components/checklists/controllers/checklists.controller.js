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
        vm.onChangeOutlet = onChangeOutlet;
        vm.test = test;

        function onChangeOutlet() {
            ChecklistsService.loadChecklists(vm.selectedOutlet).then(function (data) {
                vm.checklists = data;
            })
        }

        function test() {
            console.log('test', vm.checklists)
        }

        vm.menuSettings = {
            enhance: true,
            actions: [{
                icon: 'settings',
                action: function (event, inst) {
                    mobiscroll.toast({
                        message: 'Settings'
                    });
                }
            },
                {
                    icon: 'remove',
                    undo: true,
                    action: function (event, inst) {
                        $scope.$apply(function () {
                            $scope.menuImages.splice(event.index, 1);
                        });
                    }
                }]
        }
    }
})();
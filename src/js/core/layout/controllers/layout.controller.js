/**
 * Created by Lindon Camaj on 10/9/17.
 */
(function(){
    'use strict';

    angular
        .module('app.core.layout')
        .controller('LayoutController', LayoutController);

    LayoutController.$inject = ['$scope','$state','ChecklistsService'];

    /**
     * LayoutController
     * @param $scope
     * @constructor
     */
    function LayoutController($scope,$state,ChecklistsService) {
        var vm = this;
        vm.showBackBtn = false;
        vm.showDelBtn = false;
        vm.showConfirmPrompt = false;
        vm.confirmPromptTitle = '';
        vm.confirmPromptText = '';
        vm.onBackBtn = onBackBtn;
        vm.onDelBtn = onDelBtn;
        vm.onConfirmPromptResult = onConfirmPromptResult;
        vm.$onInit = onInit;
        $scope.$on("openSetup", onOpenSetup);
        $scope.$on("closeSetup", onCloseSetup);

        function onInit(){
            if($state.router.globals.params.checklistId){
                vm.showBackBtn = true;
                vm.showDelBtn = true;
            }
        }

        function onBackBtn(){
            $state.go($state.current.previousState.name);
            vm.showBackBtn = false;
            vm.showDelBtn = false;
        }

        function onDelBtn(){
            vm.showConfirmPrompt = true;
            // ChecklistsService.deleteChecklist($state.router.globals.params.checklistId).then(function (){
            //     onBackBtn()
            // })
        }

         function onOpenSetup(evt,data){
             vm.showBackBtn = true;
             vm.showDelBtn = true;
        }

        function onCloseSetup(evt,data){
            vm.showBackBtn = false;
            vm.showDelBtn = false;
        }

        function onConfirmPromptResult(evt){
            vm.showConfirmPrompt = false;
            console.log('stiglo',evt)
        }

    }
})();

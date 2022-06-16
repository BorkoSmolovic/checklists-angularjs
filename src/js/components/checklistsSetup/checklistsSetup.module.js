/**
 * Created by Borko Smolovic on 10.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.checklistsSetup', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('checklistsSetup', {
                url: '/checklists-setup/{checklistId}',
                parent: 'app',
                title: 'Checklist Setup',
                previousState: {name: 'checklists'},
                views: {
                    content: {
                        controller: 'ChecklistsSetupController',
                        controllerAs: 'vm',
                        templateUrl: 'src/js/components/checklistsSetup/views/checklistsSetup.view.html',
                    }
                },
                resolve: {
                    checklistDetails: ['ChecklistsService', '$stateParams', function (ChecklistsService, $stateParams) {
                        return ChecklistsService.getChecklistDetails($stateParams.checklistId);
                    }]
                },
                bindToController: true,
            });
    }

})();
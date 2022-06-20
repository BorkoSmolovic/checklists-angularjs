/**
 * Created by Borko Smolovic on 17.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.tasksSetup', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('tasksSetup', {
                url: '/tasks-setup/{subtaskId}',
                parent: 'app',
                title: 'Task Setup',
                previousState: {name: 'checklists'},
                views: {
                    content: {
                        controller: 'TasksSetupController',
                        controllerAs: 'vm',
                        templateUrl: 'src/js/components/tasksSetup/views/tasksSetup.view.html',
                    }
                },
                resolve: {
                    subtaskDetails: ['TasksService', '$stateParams', function (TasksService, $stateParams) {
                        return TasksService.getSubtaskDetails($stateParams.subtaskId);
                    }]
                },
                bindToController: true,
            });
    }

})();
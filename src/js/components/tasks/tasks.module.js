/**
 * Created by Borko Smolovic on 15.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.tasks', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('tasks', {
                url: '/checklists/{checklistId}/tasks',
                parent: 'app',
                title: 'Checklist',
                previousState: {name: 'checklists'},
                params: {
                    personId: '',
                    companyId: '',
                    date: ''
                },
                views: {
                    content: {
                        controller: 'TasksController',
                        controllerAs: 'vm',
                        templateUrl: 'src/js/components/tasks/views/tasks.view.html',
                    }
                },
                resolve: {
                    tasks: ['TasksService', '$stateParams', function (TasksService, $stateParams) {
                        return TasksService.getTasks($stateParams);
                    }]
                },
                bindToController: true,
            });
    }

})();
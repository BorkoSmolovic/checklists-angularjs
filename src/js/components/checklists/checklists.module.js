/**
 * Created by Borko Smolovic on 2.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.checklists', [])
        .config(config);

    config.$inject = ['$stateProvider'];

    function config($stateProvider) {
        $stateProvider
            .state('checklists', {
                url: '/checklists',
                parent: 'app',
                title: 'Checklists',
                views: {
                    content: {
                        controller: 'ChecklistsController',
                        controllerAs: 'vm',
                        templateUrl: 'components/checklists/views/checklists.view.html',
                    }
                },
                resolve: {
                    outlets: ['ChecklistsService',  function (ChecklistsService){
                        return ChecklistsService.getOutlets();
                    }]
                },
                bindToController: true,
            });
    }

})();
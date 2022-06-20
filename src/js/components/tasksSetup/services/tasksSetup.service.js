/**
 * Created by Borko Smolovic on 17.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.tasksSetup')
        .factory('TasksSetupService', TasksSetupService);

    TasksSetupService.$inject = [];

    function TasksSetupService() {

        var factory = {
        }
        return factory;
    }

})();
/**
 * Created by Borko Smolovic on 10.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.checklistsSetup')
        .factory('ChecklistsSetupService', ChecklistsSetupService);

    ChecklistsSetupService.$inject = ['$http', '$q'];

    function ChecklistsSetupService($http,$q) {
        var factory = {
            getChecklistDetails: getChecklistDetails,
        }
        return factory;

        function getChecklistDetails(checklistId){
            var deferred = $q.defer();
            $http.get('http://api-development.synergysuite.net/rest/checklists/tasks/'+checklistId).then((response) => {
                deferred.resolve(response.data);
            }).catch((error) => {
                deferred.reject(error);
            }).finally(() => {

            });
            return deferred.promise;
        }

    }

})();
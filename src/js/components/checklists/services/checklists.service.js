/**
 * Created by Borko Smolovic on 2.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.checklists')
        .factory('ChecklistsService', ChecklistsService);

    ChecklistsService.$inject = ['$http', 'UserService', '$q'];

    function ChecklistsService($http, UserService, $q) {
        var user = UserService.user;
        var factory = {
            getOutlets: getOutlets,
            getCurrentBusinessDate: getCurrentBusinessDate,
            getChecklists: getChecklists,
            loadChecklists: loadChecklists,
            addNewChecklist: addNewChecklist,
            deleteChecklist: deleteChecklist,
            updateChecklist: updateChecklist,
            getChecklistDetails: getChecklistDetails,
        }
        return factory;

        function getOutlets() {
            var deferred = $q.defer();
            $http.get('http://api-development.synergysuite.net/rest/permission/allowedCompanies?userId=' + user.id).then((response) => {
                deferred.resolve(response.data);
            }).catch((error) => {
                deferred.reject(error);
            }).finally(() => {

            });
            return deferred.promise;
        }

        function getCurrentBusinessDate(outlet) {
            var deferred = $q.defer();
            $http.get('http://api-development.synergysuite.net/rest/companyDates/currentBusinessDate/' + outlet.id).then((response) => {
                deferred.resolve(response.data);
            }).catch((error) => {
                deferred.reject(error);
            }).finally(() => {

            });
            return deferred.promise;
        }

        function getChecklists(outlet, currentBusinessDate) {
            var deferred = $q.defer();
            $http.get('http://api-development.synergysuite.net/rest/checklists/tasks?' +
                'date=' + currentBusinessDate +
                '&companyId=' + outlet.id +
                '&corporateId=' + user.corporateId +
                '&personId=' + user.id +
                '&type=CHECK_LIST').then((response) => {
                deferred.resolve(response.data);
            }).catch((error) => {
                deferred.reject(error);
            }).finally(() => {

            });
            return deferred.promise;
        }

        function loadChecklists(outlet) {
            var deferred = $q.defer();
            getCurrentBusinessDate(outlet).then(function(response){
                getChecklists(outlet, response).then(function(data){
                    deferred.resolve(data)
                });
            });
            return deferred.promise;
        }

        function addNewChecklist(checklist){
            checklist.corporateId = user.corporateId
            checklist.personId = user.id
            var deferred = $q.defer();
            $http.post('http://api-development.synergysuite.net/rest/checklists/tasks/CHECK_LIST',checklist).then((response) => {
                deferred.resolve(response.data);
            }).catch((error) => {
                deferred.reject(error);
            }).finally(() => {

            });
            return deferred.promise;
        }

        function deleteChecklist(checklistId){
            var deferred = $q.defer();
            $http.delete('http://api-development.synergysuite.net/rest/checklists/tasks/'+checklistId).then((response) => {
                deferred.resolve(response.data);
            }).catch((error) => {
                deferred.reject(error);
            }).finally(() => {

            });
            return deferred.promise;
        }

        function updateChecklist(checklist){
            var deferred = $q.defer();
            $http.post('http://api-development.synergysuite.net/rest/checklists/tasks/CHECK_LIST', checklist).then((response) => {
                deferred.resolve(response.data);
            }).catch((error) => {
                deferred.reject(error);
            }).finally(() => {

            });
            return deferred.promise;
        }

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
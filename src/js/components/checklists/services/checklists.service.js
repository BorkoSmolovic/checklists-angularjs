/**
 * Created by Borko Smolovic on 2.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.checklists')
        .factory('ChecklistsService', ChecklistsService);

    ChecklistsService.$inject = ['$http', 'UserService', '$q', '$timeout'];

    function ChecklistsService($http, UserService, $q, $timeout) {
        var user = UserService.user;
        var factory = {
            getOutlets: getOutlets,
            getCurrentBusinessDate: getCurrentBusinessDate,
            getChecklists: getChecklists,
            loadChecklists: loadChecklists,
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
    }

})();
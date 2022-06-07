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

        var factory = {
            getOutlets : getOutlets,
            getChecklists : getChecklists
        }

        var user = UserService.user;

        return factory;

        function getOutlets(){

            var deferred = $q.defer();

            $http.get('http://api-development.synergysuite.net/rest/permission/allowedCompanies?userId='+user.id).then((response) => {
                deferred.resolve(response.data)
            }).catch((error) => {
                deferred.reject(error)
            }).finally(()=>{

            });
            return deferred.promise;
        }

        function getChecklists(outlet){
            console.log("dobili smo outlet evo ga", outlet)
        }
    }

})();
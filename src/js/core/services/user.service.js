/**
 * Created by Borko Smolovic on 3.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.core.services')
        .factory('UserService', UserService);

    UserService.$inject = [];

    function UserService() {

        var factory = {
            user : getUser(),
        }



        return factory;

        function getUser(){
            let user = {
                id: '1490106392118050028',
                corporateId: '500000000',
            }
            return user;
        }
    }

})();
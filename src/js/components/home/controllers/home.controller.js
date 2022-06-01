/**
 * Created by Lindon Camaj on 10/9/17.
 */
(function () {
    'use strict';

    angular
        .module('app.components.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$scope', 'HomeService'];

    /**
     * Home controller
     * @param $scope
     * @param HomeService
     * @constructor
     */
    function HomeController($scope, HomeService) {
        var homeCtrl = this;

        homeCtrl.tab1 = true;
        homeCtrl.tab2 = false;
        homeCtrl.tab3 = false;
        homeCtrl.tab4 = false;
        homeCtrl.progressStyle1 = 'is-active';
        homeCtrl.progressStyle2 = '';
        homeCtrl.progressStyle3 = '';
        homeCtrl.progressStyle4 = 'progress__last';
        homeCtrl.showErrorName = false;

        homeCtrl.user = {};
        homeCtrl.businessCategory = [];
        homeCtrl.features = [];

        //initialize controller
        function init() {
            // getBusinessType();
            // loadCountries();
            // getAllModules();
        }

        init();

        /**
         * Load countries
         */
        function loadCountries() {
            HomeService.getCountries()
                .then(function (response) {
                    homeCtrl.countries = response.data;
                });
        }

        /**
         * Get all business type
         */
        function getBusinessType() {
            HomeService.getBusinessType()
                .then(function (response) {
                    homeCtrl.businessType = response.data;
                });
        }


        /**
         * Get all modules
         */
        function getAllModules() {
            HomeService.getModules()
                .then(function (response) {
                    homeCtrl.modules = response.data;
                });
        }


        /**
         * Check domain exists
         * @param domain
         */
        function checkDomain(domain) {
            HomeService.checkDomain(domain)
                .then(function (response) {
                    if (response.data.message === 'SUCCESS') {
                        afterCheck(true, domain);
                    } else {
                        afterCheck(false);
                    }
                });
        }

        /**
         * After check domain
         * @param resp
         * @param name
         */
        function afterCheck(resp, name) {
            if (resp) {
                homeCtrl.newUser.loginUrl = name + ".synergysuite.net";
                homeCtrl.showErrorName = false;
            } else {
                homeCtrl.showErrorName = true;
            }
        }

        //show tab 1
        homeCtrl.saveUser = function () {
            homeCtrl.tab1 = false;
            homeCtrl.tab2 = true;
            homeCtrl.progressStyle1 = 'is-complete';
            homeCtrl.progressStyle2 = 'is-active';
        };
        //show tab 2
        homeCtrl.moreAboutCompany = function () {
            homeCtrl.tab2 = false;
            homeCtrl.tab3 = true;
            homeCtrl.progressStyle2 = 'is-complete';
            homeCtrl.progressStyle3 = 'is-active';
        };
        //show tab 3
        homeCtrl.selectModule = function () {
            homeCtrl.tab3 = false;
            homeCtrl.tab4 = true;
            homeCtrl.progressStyle3 = 'is-complete';
            homeCtrl.progressStyle4 = 'is-active';
            addModulesToUser();
            addAddonToUser();
            console.log(homeCtrl.newUser);
        };


        /**
         * Check company domain name
         */
        homeCtrl.checkCompanyDomain = function () {

            if (angular.isDefined(homeCtrl.newUser)) {
                if (angular.isDefined(homeCtrl.newUser.companyName) && homeCtrl.newUser.companyName !== '') {
                    var name = refactorCompanyName(homeCtrl.newUser.companyName);
                    checkDomain(name);
                } else {
                    homeCtrl.newUser.loginUrl = '';
                }
            }
        };

        /**
         * Refactor name
         * @param companyName
         * @returns {*}
         */
        function refactorCompanyName(companyName) {
            return companyName.replace(/[.,\/#!$%\^&\*;:{}=\-_'"`~()\s]/g, "").trim();
        }

        /**
         * Load business sub type
         */
        homeCtrl.loadBusinessSubType = function () {
            console.log(homeCtrl.newUser.businessType);
            HomeService.getBusinessSubType(homeCtrl.newUser.businessType.id)
                .then(function (response) {
                    homeCtrl.businessCategory = response.data;
                });
        };

        /**
         * Change selected module
         * @param item
         */
        homeCtrl.showChanges = function (item) {
            debugger;
            if (angular.isDefined(item)) {
                if (angular.isDefined(item.value) && item.value === true) {

                    getAddonFeature(item.id);
                }

            }
            if (item.value === false) {
                removeFeatures(item);
            }
        };

        /**
         * Remove selected
         * @param item
         */
        function removeFeatures(item) {
            var features = [];
            for (var i = 0; i < homeCtrl.features.length; i++) {
                if (homeCtrl.features[i].module.id !== item.id) {
                    features.push(homeCtrl.features[i])
                }
            }
            homeCtrl.features = features;
        }

        /**
         * Show addon
         * @returns {boolean}
         */
        homeCtrl.showAddon = function () {
            if (angular.isUndefined(homeCtrl.features) || homeCtrl.features.length === 0)
                return false;
            return true;
        };

        /**
         * Load addons feature by module
         * @param id
         */
        function getAddonFeature(id) {
            HomeService.getAddonFeatures(id)
                .then(function (response) {
                    homeCtrl.features = homeCtrl.features.concat(response.data);
                    console.log(homeCtrl.features);
                });
        }

        /**
         * Add addon to user
         */
        function addAddonToUser() {
            var arr = [];

            for (var i = 0; i < homeCtrl.features.length; i++) {
                var obj = homeCtrl.features[i];
                if (angular.isDefined(obj.value) && obj.value === true) {
                    arr.push(obj);
                }
            }
            homeCtrl.newUser.addon = arr;
        }


        /**
         * Add modules to user
         */
        function addModulesToUser() {
            var arr = [];
            for (var i = 0; i < homeCtrl.modules.length; i++) {
                var obj = homeCtrl.modules[i];
                if (angular.isDefined(obj.value) && obj.value === true) {
                    arr.push(obj);
                }
            }
            homeCtrl.newUser.module = arr;
        }
    }

})();

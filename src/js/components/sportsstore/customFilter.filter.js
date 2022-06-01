(function () {
        'use strict';

        angular
            .module('app.components.sportsstore')
            .filter('unique', unique)
            .filter('range', range)
            .filter('pageCount', pageCount);

        unique.$inject = [];
        range.$inject = ['$filter'];
        pageCount.$inject = [];

        function unique() {

            return function (data, propertyName) {
                if (angular.isArray(data) && angular.isString(propertyName)) {
                    var results = [];
                    var keys = {};
                    for (var i = 0; i < data.length; i++) {
                        var val = data[i][propertyName];
                        if (angular.isUndefined(keys[val])) {
                            keys[val] = true;
                            results.push(val);
                        }
                    }
                    return results;
                } else {
                    return data;
                }
            };
        }

        function range($filter) {
            return function (data, page, size) {
                if (angular.isArray(data) && angular.isNumber(page) && angular.isNumber(size)) {
                    var startIndex = (page - 1) * size;
                    if (data.length < startIndex) {
                        return [];
                     } else {
                        return $filter("limitTo")(data.splice(startIndex), size);
                    }
                } else {
                    return data;
                }
            };
        }

        function pageCount(){
            return function (data, size) {
                if (angular.isArray(data)) {
                    var result = [];
                    for (var i = 0; i < Math.ceil(data.length / size); i ++) {
                        result.push(i);
                    }
                    return result;
                } else {
                    return data;
                }
            };
        }

    }
)();

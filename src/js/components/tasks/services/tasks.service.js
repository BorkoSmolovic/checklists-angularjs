/**
 * Created by Borko Smolovic on 15.6.22..
 */
(function () {
    'use strict';

    angular
        .module('app.components.tasks')
        .factory('TasksService', TasksService);

    TasksService.$inject = ['$http', '$q', '$timeout', '$stateParams'];

    function TasksService($http, $q, $timeout, $stateParams) {

        var factory = {
            getTasks: getTasks,
            addNewTask: addNewTask,
            onSubtaskNA: onSubtaskNA,
            onSubtaskNote: onSubtaskNote,
        }
        return factory;

        function getTasks(data) {
            var deferred = $q.defer();
            $timeout(function () {
                $http.get('http://api-development.synergysuite.net/rest/checklists/' +
                    'tasks/' + data.checklistId + '/subtasks?' +
                    'id=' + data.checklistId + '' +
                    '&companyId=' + data.companyId + '' +
                    '&personId=' + data.personId + '' +
                    '&date=' + data.date).then((response) => {
                    deferred.resolve(response.data);
                }).catch((error) => {
                    deferred.reject(error);
                }).finally(() => {

                });
            }, 0)
            return deferred.promise;
        }

        function addNewTask(taskName) {
            let data = {
                companyId: $stateParams.companyId,
                name: taskName,
                validDays: "montuewedthufrisatsun",
                taskId: $stateParams.checklistId
            }
            var deferred = $q.defer();
            $http.post('http://api-development.synergysuite.net/rest/checklists/subtasks', data).then((response) => {
                deferred.resolve(response.data);
            }).catch((error) => {
                deferred.reject(error);
            }).finally(() => {

            });
            return deferred.promise;
        }

        function getDateTime(){
            var today = new Date();
            var date = today.getDate() + ' ' + (today.getMonth() + 1) + ' ' + today.getFullYear();
            var minutes = today.getMinutes().length < 2 ? '0' + today.getMinutes() : today.getMinutes();
            var hours = today.getHours().length < 2 ? '0' + today.getHours() : today.getHours();
            var dateTime = date + ' ' + hours + ':' + minutes;

            return {
                dateTime: dateTime,
                today: today,
            }
        }

        function onSubtaskNA(subtask) {
            let data = {
                subTaskId: subtask.id,
                companyId: $stateParams.companyId,
                person: {id: $stateParams.personId},
                taskDate: $stateParams.date,
                na: true,
                completed: false,
                completedTime: getDateTime().dateTime,
                completedDateTime: getDateTime().today,
                result: subtask.result,
                taskId: subtask.taskId,
            }
            updateResult(data)
        }

        function onSubtaskNote(subtask) {
            let data = {
                subTaskId: subtask.id,
                companyId: $stateParams.companyId,
                person: {id: $stateParams.personId},
                taskDate: $stateParams.date,
                note: subtask.note,
                completedTime: getDateTime().dateTime,
                completedDateTime: getDateTime().today,
                result: subtask.result,
                taskId: subtask.taskId,
            }
            updateResult(data)
        }

        function updateResult(data){
            var deferred = $q.defer();
            if (data.result) {
                $http.put('http://api-development.synergysuite.net/rest/checklists/subtasks/results/' + data.taskId, data).then((response) => {
                    deferred.resolve(response.data);
                }).catch((error) => {
                    deferred.reject(error);
                }).finally(() => {

                });
            } else {
                $http.post('http://api-development.synergysuite.net/rest/checklists/subtasks/results/', data).then((response) => {
                    deferred.resolve(response.data);
                }).catch((error) => {
                    deferred.reject(error);
                }).finally(() => {

                });
            }
            return deferred.promise;
        }

    }

})();
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
            onSubtaskComplete: onSubtaskComplete,
            onSubtaskNA: onSubtaskNA,
            onSubtaskClear: onSubtaskClear,
            onSubtaskNote: onSubtaskNote,
            onCheckboxClick: onCheckboxClick,
            getSubtaskDetails: getSubtaskDetails,
            onSubtaskUpdate: onSubtaskUpdate,
            deleteTask: deleteTask,
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
                    response.data.subTasks = determineStatus(response.data.subTasks)
                    deferred.resolve(response.data);
                }).catch((error) => {
                    deferred.reject(error);
                }).finally(() => {

                });
            }, 0)
            return deferred.promise;
        }

        function determineStatus(subtasks) {
            subtasks.forEach(subtask => {
                if (!subtask.result) {
                    subtask.checkbox = null;
                } else if (subtask.result.completed) {
                    subtask.checkbox = true;
                } else if (subtask.result.na) {
                    subtask.checkbox = false;
                } else {
                    subtask.checkbox = null;
                }
            })
            return subtasks;
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

        function getDateTime() {
            var today = new Date();
            var date = today.getDate() + ' ' + (today.getMonth() + 1) + ' ' + today.getFullYear();
            var minutes = today.getMinutes().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
            var hours = today.getHours().toLocaleString('en-US', {
                minimumIntegerDigits: 2,
                useGrouping: false
            });
            var dateTime = date + ' ' + hours + ':' + minutes;

            return {
                dateTime: dateTime,
                today: today,
            }
        }

        function onSubtaskComplete(subtask) {
            let data = {
                subTaskId: subtask.id,
                companyId: $stateParams.companyId,
                person: {id: $stateParams.personId},
                taskDate: $stateParams.date,
                na: false,
                completed: true,
                completedTime: getDateTime().dateTime,
                completedDateTime: getDateTime().today,
            }
            let obj = {
                data: data,
                subtask: subtask
            }
            return updateResult(obj);
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
            }
            let obj = {
                data: data,
                subtask: subtask
            }
            return updateResult(obj);
        }

        function onSubtaskClear(subtask) {
            let data = {
                subTaskId: subtask.id,
                companyId: $stateParams.companyId,
                person: {id: $stateParams.personId},
                taskDate: $stateParams.date,
                na: false,
                completed: false,
            }
            let obj = {
                data: data,
                subtask: subtask
            }
            return updateResult(obj);
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
            }
            let obj = {
                data: data,
                subtask: subtask
            }
            return updateResult(obj);
        }

        function updateResult(obj) {
            var deferred = $q.defer();
            if (obj.subtask.result) {
                obj.data.id = obj.subtask.result.id;
                $http.put('http://api-development.synergysuite.net/rest/checklists/subtasks/results/'+obj.subtask.result.id, obj.data).then((response) => {
                    deferred.resolve(response.data);
                }).catch((error) => {
                    deferred.reject(error);
                }).finally(() => {

                });
            } else {
                $http.post('http://api-development.synergysuite.net/rest/checklists/subtasks/results/', obj.data).then((response) => {
                    deferred.resolve(response.data);
                }).catch((error) => {
                    deferred.reject(error);
                }).finally(() => {

                });
            }
            return deferred.promise;
        }

        function onCheckboxClick(subtask) {
            console.log('check this sub',subtask)
            if (!subtask.result) {
                return onSubtaskComplete(subtask);
            } else if (subtask.result.completed || subtask.result.na) {
                console.log('clear')
                return onSubtaskClear(subtask);
            } else {
                console.log('complete')
                return onSubtaskComplete(subtask);
            }
        }

        function getSubtaskDetails(subtaskId){
            var deferred = $q.defer();
            $http.get('http://api-development.synergysuite.net/rest/checklists/subtasks/'+subtaskId).then((response) => {
                deferred.resolve(response.data);
            }).catch((error) => {
                deferred.reject(error);
            }).finally(() => {

            });
            return deferred.promise;
        }

        function onSubtaskUpdate(data){
            var deferred = $q.defer();
            $http.post('http://api-development.synergysuite.net/rest/checklists/subtasks/', data).then((response) => {
                deferred.resolve(response.data);
            }).catch((error) => {
                deferred.reject(error);
            }).finally(() => {

            });
            return deferred.promise;
        }

        function deleteTask(subtaskId){
            var deferred = $q.defer();
            $http.delete('http://api-development.synergysuite.net/rest/checklists/subtasks/'+subtaskId).then((response) => {
                deferred.resolve(response.data);
            }).catch((error) => {
                deferred.reject(error);
            }).finally(() => {

            });
            return deferred.promise;
        }

    }

})();
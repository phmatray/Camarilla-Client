;(function () {
  'use strict'

  angular
    .module('app.core')
    .factory('dataservice', dataservice)

  dataservice.$inject = ['$http', '$q', 'exception', 'logger']
  /* @ngInject */
  function dataservice ($http, $q, exception, logger) {
    var service = {
      getPeople: getPeople,
      getMessageCount: getMessageCount,
      getUsers: getUsers
    // getToken: getToken
    }

    return service

    function getMessageCount () {
      return $q.when(72)
    }

    function getPeople () {
      return $http.get('/api/people')
        .then(success)
        .catch(fail)

      function success (response) {
        return response.data
      }

      function fail (e) {
        return exception.catcher('XHR Failed for getPeople')(e)
      }
    }

    function getUsers () {
      return $http.get('http://camarilla-api.azurewebsites.net/api/accounts/users')
        .then(success)
        .catch(fail)

      function success (response) {
        return response.data
      }

      function fail (e) {
        return exception.catcher('XHR Failed for getUsers')(e)
      }
    }

  //         function getToken() {
  //             return $http.get('http://camarilla-api.azurewebsites.net/api/token')
  //                  .then(success)
  //                  .catch(fail)
  //
  //             function success(response) {
  //                 return response.data
  //             }
  //
  //             function fail(e) {
  //                 return exception.catcher('XHR Failed for getToken')(e)
  //             }
  //         }
  }
})()

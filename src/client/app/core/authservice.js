/* eslint no-unused-vars:0 */
;(function () {
  'use strict'

  angular
    .module('app.core')
    .factory('authservice', authservice)

  authservice.$inject = ['$http', '$q', 'localStorageService', 'exception', 'logger']
  /* @ngInject */
  function authservice ($http, $q, localStorageService, exception, logger) {
    var service = {
      // getToken: getToken,
      login: login,
      logout: logout,
      fillAuthData: fillAuthData,
      getUsername: getUsername
    }

    // var serviceBase = 'http://camarilla-api.azurewebsites.net/'
    var serviceBase = 'http://localhost:20890/'
    var authentication = {
      isAuth: false,
      username: ''
    }

    return service

    //         function getToken() {
    //             return $q.when(72)
    //             return $http.get(serviceBase + 'oauth/token')
    //                 .then(success)
    //                 .catch(fail)
    //
    //             function success(response) {
    //                 return response.data
    //             }
    //
    //             function fail(e) {
    //                 return exception.catcher('XHR Failed for getToken')(e)
    //             }
    //         }

    function login (loginData) {
      var data = 'grant_type=password&username=' + loginData.username + '&password=' + loginData.password
      var deferred = $q.defer()

      $http.post(serviceBase + 'oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
        .success(success)
        .error(error)

      return deferred.promise

      function success (response) {
        localStorageService.set('authorizationData', { token: response.access_token, username: loginData.username })
        authentication.isAuth = true
        authentication.username = loginData.username
        deferred.resolve(response)
      }

      function error (err, status) {
        logout()
        deferred.reject(err)
      }
    }

    function logout () {
      localStorageService.remove('authorizationData')
      authentication.isAuth = false
      authentication.authentication = ''
    }

    function fillAuthData () {
      var authData = localStorageService.get('authorizationData')
      if (authData) {
        authentication.isAuth = true
        authentication.username = authData.username
      }
    }

    function getUsername () {
      return $q.when(authentication.username)
    }
  }
})()

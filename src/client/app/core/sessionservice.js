;(function () {
  'use strict'

  angular
    .module('app.core')
    .factory('sessionservice', sessionservice)

  sessionservice.$inject = ['localStorageService', 'logger']
  /* @ngInject */
  function sessionservice (localStorageService, logger) {
    var service = {
      getUsername: getUsername,
      getToken: getToken,
      getPersona: getPersona,
      setPersona: setPersona
    }

    return service

    function getUsername () {
      var authorizationData = localStorageService.get('authorizationData')
      if (authorizationData) {
        return authorizationData.username
      }
      return ''
    }

    function getToken () {
      var authorizationData = localStorageService.get('authorizationData')
      if (authorizationData) {
        return authorizationData.token
      }
      return ''
    }

    function getPersona () {
      var data = localStorageService.get('userData')
      if (data) {
        return data.persona
      }
      return null
    }

    function setPersona (persona) {
      localStorageService.set('userData', { persona: persona })
    }
  }
})()

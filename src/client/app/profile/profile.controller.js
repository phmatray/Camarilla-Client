;(function () {
  'use strict'

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController)

  ProfileController.$inject = ['$rootScope', '$q', 'dataservice', 'localStorageService', 'logger']
  /* @ngInject */
  function ProfileController ($rootScope, $q, dataservice, localStorageService, logger) {
    var vm = this
    vm.title = 'Mes personnages'
    vm.personae = []
    vm.select = select

    activate()

    function activate () {
      var promises = [getPersonae()]
      return $q.all(promises).then(function () {
        // logger.info('Activated Profile View')
      })
    }

    function getPersonae () {
      var username = localStorageService.get('authorizationData').username
      return dataservice.getPersonae(username).then(function (data) {
        vm.personae = data
        return vm.personae
      })
    }

    function select (persona) {
      localStorageService.set('userData', { persona: persona.pseudo })
      $rootScope.$emit('personaUpdated', persona)
      logger.info('Vous avez sélectionné ' + localStorageService.get('userData').persona + '.')
    }
  }
})()

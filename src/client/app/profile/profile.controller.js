;(function () {
  'use strict'

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController)

  ProfileController.$inject = ['$rootScope', '$q', 'dataservice', 'sessionservice', 'logger']
  /* @ngInject */
  function ProfileController ($rootScope, $q, dataservice, sessionservice, logger) {
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
      var username = sessionservice.getUsername()
      if (username !== '') {
        return dataservice.getPersonae(username).then(function (data) {
          vm.personae = data
          return vm.personae
        })
      } else {
        logger.info("Vous n'avez pas encore de personnage.")
      }
    }

    function select (persona) {
      sessionservice.setPersona(persona)
      $rootScope.$emit('personaUpdated', persona)
      logger.info('Vous avez sélectionné ' + sessionservice.getPersona().pseudo + '.')
    }
  }
})()

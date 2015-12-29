;(function () {
  'use strict'

  angular
    .module('app.profile')
    .controller('CreateProfileController', CreateProfileController)

  CreateProfileController.$inject = ['$rootScope', 'dataservice', 'localStorageService', 'logger']
  /* @ngInject */
  function CreateProfileController ($rootScope, dataservice, localStorageService, logger) {
    var vm = this
    vm.title = 'Créer un personnage'
    vm.submit = submit
    vm.messages = []
    vm.newPersona = {
      name: '',
      background: ''
    }

    activate()

    function activate () {
    }

    function submit () {
      vm.messages = []

      var createPersonaBindingModel = {
        'name': vm.newPersona.name,
        'background': vm.newPersona.background,
        'clanId': 0,
        'raceId': 0,
        'username': localStorageService.get('authorizationData').username
      }

      dataservice.addPersona(createPersonaBindingModel)
        .then(success)
        .catch(fail)

      function success (response) {
        logger.success('Votre nouveau personnage a bien été ajouté.')
      }

      function fail (e) {
        if (e && e.data) {
          getErrorsMessage(e.data.modelState)
        }

        function getErrorsMessage (modelState) {
          if (modelState['']) {
            // une seule erreur
            modelState[''].map(error => vm.messages.push(error))
          } else {
            // plein d'erreurs
            Object
              .keys(vm.registration)
              .map(key => key.charAt(0).toUpperCase() + key.slice(1))
              .map(key => modelState['personaReturnModel.' + key])
              .map(prop => {
                if (prop) {
                  prop.map(error => vm.register.messages.push(error))
                }
              })
          }
        }
      }
    }
  }
})()

;(function () {
  'use strict'

  angular
    .module('app.account')
    .controller('AccountController', AccountController)

  AccountController.$inject = ['dataservice', 'logger']
  /* @ngInject */
  function AccountController (dataservice, logger) {
    var vm = this
    vm.title = 'Account'
    vm.register = {
      title: 'Inscription',
      description: 'Inscrivez-vous pour embrasser la Camarilla Ardente',
      messages: [],
      signUp: signUp,
      savedSuccessfully: false
    }
    vm.registration = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }

    activate()

    function activate () {
      logger.info('Activated Account View')
    }

    function signUp () {
      vm.register.messages = []

      dataservice.addUser(vm.registration)
        .then(success)
        .catch(fail)

      function success (response) {
        vm.register.message = response
        vm.register.savedSuccessfully = true
        logger.success('Merci de votre inscription, vous allez recevoir un mail dans quelques minutes.')
      }

      function fail (e) {
        if (e && e.data) {
          vm.register.savedSuccessfully = false
          getErrorsMessage(e.data.modelState)
        }

        function getErrorsMessage (modelState) {
          if (modelState['']) {
            // une seule erreur
            modelState[''].map(error => vm.register.messages.push(error))
          } else {
            // plein d'erreurs
            Object
              .keys(vm.registration)
              .map(key => key.charAt(0).toUpperCase() + key.slice(1))
              .map(key => modelState['createUserModel.' + key])
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

;(function () {
  'use strict'

  angular
    .module('app.layout')
    .controller('ShellController', ShellController)

  ShellController.$inject = ['$rootScope', '$timeout', 'authservice', 'dataservice', 'localStorageService', 'config', 'logger']
  /* @ngInject */
  function ShellController ($rootScope, $timeout, authservice, dataservice, localStorageService, config, logger) {
    var vm = this
    vm.busyMessage = 'Patientez SVP ...'
    vm.isBusy = true
    $rootScope.showSplash = true
    vm.navline = {
      title: config.appTitle,
      text: 'Créé par Philippe Matray',
      link: 'http://phmatray.net',
      login: login,
      logout: logout,
      username: '',
      persona: null,
      password: '',
      isLogged: false
    }

    activate()

    function activate () {
      $rootScope.$on('personaUpdated', personaUpdated)
      logger.success(config.appTitle + ' chargé !', null)
      hideSplash()

      function personaUpdated (event, persona) {
        vm.navline.persona = persona
      }
    }

    function hideSplash () {
      // Force a 1 second delay so we can see the splash.
      $timeout(function () {
        $rootScope.showSplash = false
      }, 1000)
    }

    function login () {
      var loginData = {
        username: vm.navline.username,
        password: vm.navline.password
      }

      authservice.login(loginData)
        .then(success)
        .catch(fail)

      function success (response) {
        vm.navline.isLogged = true
        vm.navline.username = localStorageService.get('authorizationData').username
        logger.success('Connexion réussie<br/>Bienvenue ' + vm.navline.username)
      }

      function fail (e) {
        vm.navline.isLogged = false
        logger.error('Impossible de vous connecter<br/>Peut-être êtes-vous déjà connecté.')
      }
    }

    function logout () {
      authservice.logout()
      vm.navline.isLogged = false
      vm.navline.username = ''
      vm.navline.password = ''
      logger.success('Déconnexion réussie<br/>Merci de votre visite.')
    }
  }
})()

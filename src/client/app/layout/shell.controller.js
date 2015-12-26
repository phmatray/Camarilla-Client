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
      username: '',
      password: ''
    }

    activate()

    function activate () {
      logger.success(config.appTitle + ' chargé !', null)
      hideSplash()
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
        var username = localStorageService.get('authorizationData').username
        logger.success('Connexion réussie<br/>Bienvenue ' + username)
      }

      function fail (e) {
        logger.error('Impossible de vous connecter<br/>Peut-être êtes-vous déjà connecté.')
      }
    }
  }
})()

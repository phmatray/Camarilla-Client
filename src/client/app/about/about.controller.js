;(function () {
  'use strict'

  angular
    .module('app.about')
    .controller('AboutController', AboutController)

  AboutController.$inject = ['logger']
  /* @ngInject */
  function AboutController (logger) {
    var vm = this
    vm.title = 'À propos'

    activate()

    function activate () {
      // logger.info('Activated About View')
    }
  }
})()

;(function () {
  'use strict'

  angular
    .module('app.mail')
    .controller('MailController', MailController)

  MailController.$inject = ['logger']
  /* @ngInject */
  function MailController (logger) {
    var vm = this
    vm.title = 'Mail'

    activate()

    function activate () {
      logger.info('Activated Mail View')
    }
  }
})()

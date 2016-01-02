;(function () {
  'use strict'

  angular
    .module('app.mail')
    .controller('MailController', MailController)

  MailController.$inject = ['sessionservice', 'logger']
  /* @ngInject */
  function MailController (sessionservice, logger) {
    var vm = this
    vm.title = 'Messagerie de ' + sessionservice.getPersona().pseudo

    activate()

    function activate () {
      // logger.info('Activated Mail View')
    }
  }
})()

;(function () {
  'use strict'

  angular
    .module('app.mail')
    .controller('MailController', MailController)

  MailController.$inject = ['$q', 'dataservice', 'sessionservice', 'logger']
  /* @ngInject */
  function MailController ($q, dataservice, sessionservice, logger) {
    var vm = this
    vm.pseudo = sessionservice.getPersona().pseudo
    vm.title = 'Messagerie de ' + vm.pseudo
    vm.sentMails = {
      title: 'Messages envoyés',
      data: []
    }
    vm.receivedMails = {
      title: 'Messages reçus',
      data: []
    }
    vm.newMail = {
      toPseudos: '',
      subject: '',
      message: ''
    }
    vm.sendMail = sendMail

    activate()

    function activate () {
      var promises = [getMailsForPersona()]
      return $q.all(promises).then(function () {
        // logger.info('Activated Mail View')
      })
    }

    function getMailsForPersona () {
      if (vm.pseudo !== '') {
        return dataservice.getMailsForPersona(vm.pseudo).then(function (data) {
          vm.sentMails.data = data.sentMails
          vm.receivedMails.data = data.receivedMails
        })
      }
    }

    function sendMail () {
      var createMailBindingModel = {
        'message': vm.newMail.message,
        'subject': vm.newMail.subject,
        'fromPseudo': vm.pseudo,
        'toPseudos': vm.newMail.toPseudos
      }

      dataservice.sendMail(createMailBindingModel)
        .then(success)
        .catch(fail)

      function success (response) {
        logger.success('Votre message a bien été envoyé.')
        vm.newMail.toPseudos = ''
        vm.newMail.subject = ''
        vm.newMail.message = ''
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
              .map(key => modelState['mailReturnModel.' + key])
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

;(function () {
  'use strict'

  angular
    .module('app.mail')
    .run(appRun)

  appRun.$inject = ['routerHelper']
  /* @ngInject */
  function appRun (routerHelper) {
    routerHelper.configureStates(getStates())
  }

  function getStates () {
    return [
      {
        state: 'mail',
        config: {
          url: '/mail',
          templateUrl: 'app/mail/mail.html',
          controller: 'MailController',
          controllerAs: 'vm',
          title: 'Mails',
          settings: {
            nav: 3,
            content: '<i class="fa fa-fw fa-hashtag"></i> Mails'
          }
        }
      }
    ]
  }
})()

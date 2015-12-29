;(function () {
  'use strict'

  angular
    .module('app.profile')
    .run(appRun)

  appRun.$inject = ['routerHelper']
  /* @ngInject */
  function appRun (routerHelper) {
    routerHelper.configureStates(getStates())
  }

  function getStates () {
    return [
      {
        state: 'profile',
        config: {
          url: '/profile',
          templateUrl: 'app/profile/profile.html',
          controller: 'ProfileController',
          controllerAs: 'vm',
          title: 'Mes personnages',
          settings: {
            nav: 3,
            content: '<i class="fa fa-fw fa-users"></i> Mes personnages'
          }
        }
      },
      {
        state: 'create-profile',
        config: {
          url: '/create-profile',
          templateUrl: 'app/profile/create-profile.html',
          controller: 'CreateProfileController',
          controllerAs: 'vm',
          title: 'Créer un personnage',
          settings: {
            nav: 3,
            content: '<i class="fa fa-fw fa-user"></i> Créer un personnage'
          }
        }
      }
    ]
  }
})()

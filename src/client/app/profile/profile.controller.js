;(function () {
  'use strict'

  angular
    .module('app.profile')
    .controller('ProfileController', ProfileController)

  ProfileController.$inject = ['$rootScope', 'localStorageService', 'logger']
  /* @ngInject */
  function ProfileController ($rootScope, localStorageService, logger) {
    var vm = this
    vm.title = 'Mes personnages'

    vm.select = select

    vm.personae = [
      {
        pseudo: 'Aragorn',
        name: 'Elessar Telcontar',
        picture: 'http://images6.fanpop.com/image/photos/34500000/Aragorn-in-the-Return-of-the-King-aragorn-34519398-479-379.jpg',
        description: "Membre de Fraternité de l'Anneau, Aragorn est un ami de longue date de Gandalf ainsi que des Elfes de la Terre du Milieu. Protecteur et ami des Hobbits, il joue un rôle de premier plan dans la destruction de l'Anneau unique.",
        gender: 'De grande taille',
        race: 'Homme',
        birthplace: 'Terre du milieu',
        birthdate: '1er mars 2931 T. Â.'
      },
      {
        pseudo: 'Legolas',
        name: 'Greenleaf',
        picture: 'http://vignette4.wikia.nocookie.net/lotr/images/9/95/Legolask.jpg/revision/latest?cb=20130604231140',
        description: "Fils de Thranduil, le roi des Elfes de la Forêt Noire, Legolas Vertefeuille (Greenleaf en anglais) se fait connaître lors du Conseil d'Elrond en 3018 du Troisième Âge. Il fait ensuite partie de la Communauté de l'Anneau, en tant que représentant des Elfes.",
        gender: 'Non',
        race: 'Elfe',
        birthplace: 'Terre du milieu',
        birthdate: '?'
      },
      {
        pseudo: 'Gimli',
        name: 'Lockbearer',
        picture: 'https://pbs.twimg.com/profile_images/432634190841278464/zWEvNctO.jpeg',
        description: "Le nom Gimli provient du vieux norrois, comme ceux des treize nains de Bilbo le Hobbit, mais contrairement à eux, il n'apparaît pas dans le Dvergatal, le « catalogue des nains » de la Völuspá et du Gylfaginning.",
        gender: 'Ne lui sers pas la main',
        race: 'Nain',
        birthplace: 'Terre du milieu',
        birthdate: '2879 T. Â.'
      }
    ]

    activate()

    function activate () {
      // logger.info('Activated Profile View')
    }

    function select (persona) {
      localStorageService.set('userData', { persona: persona.pseudo })
      $rootScope.$emit('personaUpdated', persona)
      logger.info('Vous avez sélectionné ' + localStorageService.get('userData').persona + '.')
    }
  }
})()

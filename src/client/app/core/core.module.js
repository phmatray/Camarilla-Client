;(function () {
  'use strict'

  angular
    .module('app.core', [
      'ngAnimate', 'ngSanitize',
      'blocks.exception', 'blocks.logger', 'blocks.router', 'blocks.filter',
      'ui.router', 'ngplus', 'LocalStorageModule'
    ])
})()

/// <reference path="../../.tmp/typings/tsd.d.ts" />
var index_config_1 = require('./index.config');
var index_route_1 = require('./index.route');
var index_run_1 = require('./index.run');
var main_controller_1 = require('./main/main.controller');
var githubContributor_service_1 = require('../app/components/githubContributor/githubContributor.service');
var webDevTec_service_1 = require('../app/components/webDevTec/webDevTec.service');
var navbar_directive_1 = require('../app/components/navbar/navbar.directive');
var malarkey_directive_1 = require('../app/components/malarkey/malarkey.directive');
var camarilla;
(function (camarilla) {
    'use strict';
    angular.module('camarilla', ['ngAnimate', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ui.router', 'ui.bootstrap', 'toastr'])
        .constant('malarkey', malarkey)
        .constant('moment', moment)
        .config(index_config_1.config)
        .config(index_route_1.routerConfig)
        .run(index_run_1.runBlock)
        .service('githubContributor', githubContributor_service_1.GithubContributor)
        .service('webDevTec', webDevTec_service_1.WebDevTecService)
        .controller('MainController', main_controller_1.MainController)
        .directive('acmeNavbar', navbar_directive_1.acmeNavbar)
        .directive('acmeMalarkey', malarkey_directive_1.acmeMalarkey);
})(camarilla || (camarilla = {}));
//# sourceMappingURL=index.module.js.map
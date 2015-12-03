/** @ngInject */
function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
    });
    $urlRouterProvider.otherwise('/');
}
exports.routerConfig = routerConfig;
//# sourceMappingURL=index.route.js.map
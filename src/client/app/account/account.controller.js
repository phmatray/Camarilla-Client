(function () {
    'use strict';

    angular
        .module('app.account')
        .controller('AccountController', AccountController);

    AccountController.$inject = ['logger'];
    /* @ngInject */
    function AccountController(logger) {
        var vm = this;
        vm.title = 'Account';

        activate();

        function activate() {
            logger.info('Activated Account View');
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['$q', 'authservice', 'dataservice', 'logger'];
    /* @ngInject */
    function DashboardController($q, authservice, dataservice, logger) {
        var vm = this;
        vm.news = {
            title: '10 derniers utilisateurs',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.messageCount = 0;
        vm.people = [];
        vm.title = 'Dashboard';
        vm.users = '';
        vm.confirmedUserCount = 0;
        vm.userCount = 0;
        vm.username = 'ma biiite';

        activate();

        //////////////////////////////////

        function activate() {
            var promises = [getMessageCount(), getPeople(), getUsers(), getUsername()];
            return $q.all(promises).then(function() {
                logger.info('Activated Dashboard View');
            });
        }

        function getMessageCount() {
            return dataservice.getMessageCount().then(function (data) {
                // vm.messageCount = data;
                vm.messageCount = 0;
                return vm.messageCount;
            });
        }

        function getPeople() {
            return dataservice.getPeople().then(function (data) {
                vm.people = data;
                return vm.people;
            });
        }

        function getUsers() {
            return dataservice.getUsers().then(function (data) {
                vm.users = data;
                vm.confirmedUserCount = CountConfirmedUser(data);
                vm.userCount = data.length;
                return vm.users;
            });
            
            function CountConfirmedUser(data) {
                return data
                    .filter(function(v) {return v.emailConfirmed === true})
                    .length;
            }
        }
        
        function getUsername() {
            return authservice.getUsername().then(function (data) {
                vm.username = data;
                return vm.username;
            });
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authservice', authservice);

    authservice.$inject = ['$http', '$q', 'localStorageService', 'exception', 'logger'];
    /* @ngInject */
    function authservice($http, $q, localStorageService, exception, logger) {
        var service = {
            // getToken: getToken,
            login: login,
            logout: logout,
            fillAuthData: fillAuthData,
            getUsername: getUsername
        };
        
        var serviceBase = 'http://camarilla-api.azurewebsites.net/';
        var authentication = {
            isAuth: false,
            username : ""
        };

        return service;

//         function getToken() {
//             return $q.when(72);
//             return $http.get(serviceBase + 'oauth/token')
//                 .then(success)
//                 .catch(fail);
// 
//             function success(response) {
//                 return response.data;
//             }
// 
//             function fail(e) {
//                 return exception.catcher('XHR Failed for getToken')(e);
//             }
//         }

        function saveRegistration(registration) {
            logout();
            
            return $http.post(serviceBase + 'api/account/register', registration).then(function (response) {
                return response;
            });
        }

        function login(loginData) {
            var data = "grant_type=password&username=" + loginData.username + "&password=" + loginData.password;
            var deferred = $q.defer();

            $http.post(serviceBase + 'oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {
                localStorageService.set('authorizationData', { token: response.access_token, username: loginData.username });
                authentication.isAuth = true;
                authentication.username = loginData.username;
                
                deferred.resolve(response);
            }).error(function (err, status) {
                logout();
                deferred.reject(err);
            });

            return deferred.promise;
        };

//         function login(loginData) {
//             var data = "grant_type=password&username=" + loginData.username + "&password=" + loginData.password;
// 
//             return $http.post(serviceBase + 'oauth/token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
//                 .then(success)
//                 .catch(fail);
//             
//             function success(response) {
//                 localStorageService.set('authorizationData', { token: response.access_token, username: loginData.username });
//                 authentication.isAuth = true;
//                 authentication.username = loginData.username;
//                 return response.data;         
//             }
//             
//             function fail(e) {
//                 logout();
//                 return exception.catcher('XHR Failed for login')(e);
//             }
//         };

        function logout() {
            localStorageService.remove('authorizationData');
            authentication.isAuth = false;
            authentication.authentication = "";
        };
        
        function fillAuthData() {
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                authentication.isAuth = true;
                authentication.username = authData.username;
            }
        }
        
        function getUsername() {
            return $q.when(authentication.username);
        }
    }
})();

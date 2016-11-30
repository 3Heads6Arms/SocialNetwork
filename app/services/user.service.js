angular.module('SocialNetwork.Services')
    .factory('userService', [
        '$http',
        '$q',
        '$cookies',
        'profilesService',
        'SERVER_URL',
        function ($http, $q, $cookies, profilesService, SERVER_URL) {
            var COOKIE_ACCESS_TOKEN_KEY = '!access_token';

            function register(user) {
                var deferred = $q.defer();

                $http.post(SERVER_URL + 'users/Register', user)
                    .then(function (response) {
                        saveToken(response.data);
                        profilesService
                            .requestUserProfile()
                            .then(function (userProfile) {
                                deferred.resolve(response.data);
                            });

                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function login(user) {
                var deferred = $q.defer();

                $http.post(SERVER_URL + 'users/Login', user)
                    .then(function (response) {
                        saveToken(response.data);
                        profilesService
                            .requestUserProfile()
                            .then(function (userProfile) {
                                deferred.resolve(response.data);
                            });
                    }, function (error) {
                        deferred.reject(error);
                    });

                return deferred.promise;
            }

            function logout() {
                $cookies.remove(COOKIE_ACCESS_TOKEN_KEY);
                profilesService.removeUserProfile();
                $http.defaults.headers.common.Authorization = undefined;
            }

            function isAuthenticated() {
                return !!$cookies.get(COOKIE_ACCESS_TOKEN_KEY);
            }

            function saveToken(data) {
                $cookies.put(COOKIE_ACCESS_TOKEN_KEY, data.access_token);
                $http.defaults.headers.common.Authorization = data.token_type + ' ' + data.access_token;
            }

            return {
                register: register,
                login: login,
                logout: logout,
                isAuthenticated: isAuthenticated
            };
        }
    ])
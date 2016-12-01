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
                        saveToken(response.data.access_token);
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

            function saveToken(accessToken) {
                $cookies.put(COOKIE_ACCESS_TOKEN_KEY, accessToken);
                $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
            }

            function refreshUserToken() {
                var deferred = $q.defer();
                var accessToken;
                if (isAuthenticated()) {
                    accessToken = $cookies.get(COOKIE_ACCESS_TOKEN_KEY);
                    $http.defaults.headers.common.Authorization = 'Bearer ' + accessToken;
                    profilesService.requestUserProfile()
                        .then(function (user) {
                            deferred.resolve(true);
                        })
                        .catch(function (error) {
                            deferred.reject(error);
                        });
                } else {
                    return $q.when(true);
                }

                return deferred.promise;
            }

            return {
                register: register,
                login: login,
                logout: logout,
                isAuthenticated: isAuthenticated,
                refreshUserToken: refreshUserToken
            };
        }
    ])
angular.module('SocialNetwork.Services')
    .factory('profilesService', [
        '$http',
        '$q',
        'SERVER_URL',
        function ($http, $q, SERVER_URL) {
            var currentUser;
            var deferred = $q.defer();

            function getUserProfile() {
                if (currentUser) {
                    return $q.when(currentUser);
                } else {
                    return deferred.promise;
                }
            }

            function requestUserProfile() {
                var userProfileDefer = $q.defer();
                $http.get(SERVER_URL + 'me')
                    .then(function (response) {
                        currentUser = response.data;
                        deferred.resolve(response.data);
                        userProfileDefer.resolve(response.data);
                    }, function (error) {
                        userProfileDefer.reject(error)
                    });

                return userProfileDefer.promise;
            }

            function removeUserProfile() {
                currentUser = undefined;
            }
            return {
                getUserProfile: getUserProfile,
                requestUserProfile: requestUserProfile,
                removeUserProfile: removeUserProfile
            }
        }
    ]);
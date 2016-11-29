angular.module('SocialNetwork.Services.Users')
    .factory('authentication', [
        '$http',
        '$q',
        'SERVER_URL',
        function ($http, $q, SERVER_URL) {

            function register(user) {
                var deferred = $q.defer();

                $http.post(SERVER_URL + 'users/Register', user)
                .then(function(response){
                    deferred.resolve(response.data);
                });

                return deferred.promise;
            }

            return {
                register: register
            };
        }
    ])
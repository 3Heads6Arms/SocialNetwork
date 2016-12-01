angular.module('SocialNetwork')
    .run([
        '$rootScope',
        '$location',
        'userService',
        function ($rootScope, $location, userService) {
            $rootScope.$on('$routeChangeError', function (e, current, previous, rejection) {
                if (rejection === 'Unauthorized Access') {
                    $location.path('/login');
                }
            });

            userService.refreshUserToken()
                .catch(function (error) {
                    // Session expired
                    $location.path('/login');
                });
        }
    ]);
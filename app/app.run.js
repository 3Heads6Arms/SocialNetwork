angular.module('SocialNetwork')
    .run([
        '$rootScope',
        '$location',
        function ($rootScope, $location) {
            $rootScope.$on('$routeChangeError', function (e, current, previous, rejection) {
                if (rejection === 'Unauthorized Access') {
                    $location.path('/login');
                }
            });
        }
    ]);
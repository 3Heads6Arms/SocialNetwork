angular
    .module('SocialNetwork')
    .config([
        '$routeProvider',
        '$locationProvider',
        function ($routeProvider, $locationProvider, $httpProvider) {
            var newFeedsResolver = {
                authenticated: [
                    '$q',
                    function ($q) {
                        return $q.reject('Unauthorized Access');
                    }
                ]
            };

            $routeProvider
                .when('/', {
                    template: 'Feeds Feeds!!!',
                    resolve: newFeedsResolver.authenticated
                })
                .when('/login', {
                    template: '<login flex layout="row"></login>'
                })
                .when('/register', {
                    template: '<register flex layout="row"></register>'
                })
                .otherwise('/');
        }
    ]);
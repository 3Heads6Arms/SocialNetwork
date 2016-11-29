angular
    .module('SocialNetwork')
    .config([
        '$routeProvider',
        '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $locationProvider

            $routeProvider.when('/login', {
                template: '<login flex layout="row"></login>'
            });
            $routeProvider.when('/register', {
                template: '<register flex layout="row"></register>'
            });
            $routeProvider.otherwise('/');
        }
    ]);
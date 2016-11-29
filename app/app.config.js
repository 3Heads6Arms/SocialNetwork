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
                template: '<div>Register!!</div>'
            });
            $routeProvider.otherwise('/');
        }
    ]);
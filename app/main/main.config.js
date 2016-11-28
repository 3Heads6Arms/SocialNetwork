angular
    .module('SocialNetwork')
    .config([
        '$routeProvider',
        '$locationProvider',
        function ($routeProvider, $locationProvider) {
            $routeProvider.when('/login', {
                controller: 'LoginController',
                templateUrl: 'login/login.template.html'
            });
            $routeProvider.otherwise('/login');
        }
    ]);
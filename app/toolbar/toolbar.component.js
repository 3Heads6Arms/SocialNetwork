angular
    .module('SocialNetwork.Toolbar')
    .component('toolbar', {
        templateUrl: 'toolbar/toolbar.template.html',
        controller: [
            '$location',
            '$route',
            'userService',
            'profilesService',
            function ($location, $route, userService, profilesService) {
                var self = this;

                profilesService
                    .getUserProfile()
                    .then(function (userProfile) {
                        self.userProfile = userProfile;
                        self.isAuthenticated = true;
                    });

                this.logout = function () {
                    debugger;
                    self.userProfile = undefined;
                    self.isAuthenticated = false;
                    userService.logout();
                    $location.path('/login');
                    $location.replace();
                    $route.reload();
                }
            }
        ]
    });
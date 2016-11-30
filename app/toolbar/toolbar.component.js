angular
    .module('SocialNetwork.Toolbar')
    .component('toolbar', {
        templateUrl: 'toolbar/toolbar.template.html',
        controller: [
            'userService',
            'profilesService',
            function (userService, profilesService) {
                var ctrl = this;
                if (userService.isAuthenticated()) {
                    profilesService
                        .getUserProfile()
                        .then(function (userProfile) {
                            ctrl.userProfile = userProfile;
                            ctrl.isAuthenticated = true;
                        });
                }
            }
        ]
    });
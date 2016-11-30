angular
    .module('SocialNetwork.Login')
    .component('login', {
        templateUrl: 'login/login.template.html',
        controller: [
            '$location',
            'userService',
            function ($location, userService) {
                var self = this;
                this.submitLogin = function (user) {
                    console.log(user);
                    userService.login(user)
                        .then(function (data) {
                            console.log(data)
                            $location.path('/');
                            $location.replace();
                        }).catch(function (error) {
                            console.log(error);
                        });
                };
                this.passwordKeyPressed = function (e, invalid, user) {
                    if (e.code === 'Enter' && !invalid) {
                        self.submitLogin(user);
                    }
                }
            }
        ]
    });
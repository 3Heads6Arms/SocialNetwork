angular.module('SocialNetwork.Register')
    .component('register', {
        templateUrl: 'register/register.template.html',
        controller: [
            '$location',
            'userService',
            function ($location, userService) {
                this.genders = [{
                    label: 'Male',
                    value: 1
                }, {
                    label: 'Female',
                    value: 2
                }, {
                    label: 'Other',
                    value: 0
                }];

                this.submitRegister = function (user) {
                    userService.register(user)
                        .then(function (data) {
                            console.log(data);
                            $location.path('/');
                            $location.replace();
                        });
                };

                this.cancelRegister = function () {
                    $location.path('/login');
                    $location.replace();
                };

            }
        ]
    });
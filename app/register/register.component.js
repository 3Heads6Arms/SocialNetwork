angular.module('SocialNetwork.Register')
    .component('register', {
        templateUrl: 'register/register.template.html',
        controller: [
            '$location',
            function ($location) {
                this.genders = [{
                    label: 'Male',
                    value: 1
                }, {
                    label: 'Female',
                    value: 2
                }, {
                    label: 'Other',
                    value: 0
                }]

                this.cancelRegister = function () {
                    $location.path('/login');
                    $location.replace();
                }
            }
        ]
    });
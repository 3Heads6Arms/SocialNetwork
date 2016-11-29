angular.module('SocialNetwork.Register')
    .component('register', {
        templateUrl: 'register/register.template.html',
        controller: [
            '$http',
            '$location',
            function ($http, $location) {
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
                    console.log(user);
                    $http
                        .post('http://softuni-social-network.azurewebsites.net/api/users/Register', user)
                        .then(function(response){
                            console.log(response);
                        })
                        .catch(function(error){
                            console.log(error);
                        });
                };

                this.cancelRegister = function () {
                    $location.path('/login');
                    $location.replace();
                };

            }
        ]
    });
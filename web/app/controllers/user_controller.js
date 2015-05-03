/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
ElokuvakirjastoApp.controller('UserController', function ($scope, $location, AuthenticationService) {

    $scope.logIn = function () {
        AuthenticationService.logUserIn($scope.email, $scope.password)
                .then(function () {
                    $location.path('/movies');
                })
                .catch(function () {
                    $scope.message = 'Wrong email or password!';
                });
    };

    $scope.register = function () {
        AuthenticationService.createUser($scope.newEmail, $scope.newPassword)
                .then(function () {
                    AuthenticationService.logUserIn($scope.newEmail, $scope.newPassword)
                            .then(function () {
                                $location.path('/movies');
                            });
                })
                .catch(function () {
                    $scope.message = 'Error! Try again.';
                });
    }
});


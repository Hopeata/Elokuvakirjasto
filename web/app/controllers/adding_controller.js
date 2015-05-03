ElokuvakirjastoApp.controller('AddingController', function ($scope, AuthenticationService, FirebaseService, $routeParams, $location) {
    
    if (AuthenticationService.getUserLoggedIn() === null) {
        $location.path('/login');
    }
    
    $scope.addMovie = function () {
        console.log("adding");
        FirebaseService.addMovie({
            name: $scope.name,
            director: $scope.director,
            release: $scope.release,
            description: $scope.description
        });
        $location.path('/');
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



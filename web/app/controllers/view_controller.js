/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

ElokuvakirjastoApp.controller('ViewController', function ($scope, FirebaseService, $routeParams, $location) {
    FirebaseService.getMovie($routeParams.KEY, function (movie) {
        $scope.movie = movie;
    });

    $scope.remove = function () {
        FirebaseService.removeMovie($scope.movie);
        $location.path('/');

    };
});

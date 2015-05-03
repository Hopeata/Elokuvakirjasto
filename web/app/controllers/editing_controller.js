ElokuvakirjastoApp.controller('EditingController', function ($scope, FirebaseService, $routeParams, $location) {
    if (!currentAuth) {
        $location.path('/login');
    }
    var thisMovie;

    console.log($routeParams.KEY);
    FirebaseService.getMovie($routeParams.KEY, function (movie) {
        thisMovie = movie;
        $scope.name = movie.name;
        $scope.director = movie.director;
        $scope.release = movie.release;
        $scope.description = movie.description;
    });

    $scope.edit = function () {
        thisMovie.name = $scope.name;
        thisMovie.director = $scope.director;
        thisMovie.release = $scope.release;
        thisMovie.description = $scope.description;
        FirebaseService.editMovie(thisMovie);
        $location.path('/');
    };
});






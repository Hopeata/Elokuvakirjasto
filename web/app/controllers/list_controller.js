ElokuvakirjastoApp.controller('ListController', function ($scope, FirebaseService, APIService) {
    $scope.movies = FirebaseService.getMovies();


    $scope.search = function () {
        APIService.findMovie($scope.searchName).success(function (movies) {
            var searchResults = [];
            if ($scope.searchYear !== '') {
                for (var movie in movies['Search']) {
                    if (movies['Search'][movie].Year === $scope.searchYear) {
                        searchResults.push(movies['Search'][movie]);
                    }
                }
            } else {
                searchResults = movies['Search'];
            }
            if (searchResults.length === 0) {
                $scope.searchResult = "No results";
            } else {
                $scope.searchResult = searchResults.length + " search results found";
            }
            $scope.searchResults = searchResults;
        });
    };

    $scope.remove = function (movie) {
        FirebaseService.removeMovie(movie);
        $location.path('/');
    };
});
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



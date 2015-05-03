var ElokuvakirjastoApp = angular.module('ElokuvakirjastoApp', ['firebase', 'ngRoute']);

ElokuvakirjastoApp.service('FirebaseService', function ($firebase) {
    var firebaseRef = new Firebase('https://scorching-fire-9057.firebaseio.com/movies');
    var sync = $firebase(firebaseRef);
    var movies = sync.$asArray();

    this.getMovies = function () {
        return movies;
    };

    this.getMovie = function (key, done) {
        movies.$loaded(function () {
            done(movies.$getRecord(key));
        });
    };

    this.addMovie = function (movie) {
        movies.$add(movie);
    };

    this.editMovie = function (movie) {
        movies.$save(movie);
    };

    this.removeMovie = function (movie) {
        movies.$remove(movie);
    };

});

ElokuvakirjastoApp.service('APIService', function ($http) {
    this.findMovie = function (name) {
        return $http.get('http://www.omdbapi.com', {params: {s: name}});
    };
});

ElokuvakirjastoApp.service('AuthenticationService', function ($firebase, $firebaseAuth) {
    var firebaseRef = new Firebase('https://scorching-fire-9057.firebaseio.com/movies');
    var firebaseAuth = $firebaseAuth(firebaseRef);

    this.logUserIn = function (email, password) {
        return firebaseAuth.$authWithPassword({
            email: email,
            password: password
        });
    };

    this.createUser = function (email, password) {
        return firebaseAuth.$createUser({
            email: email,
            password: password
        });
    };

    this.checkLoggedIn = function () {
        return firebaseAuth.$waitForAuth();
    };

    this.logUserOut = function () {
        firebaseAuth.$unauth();
    };

    this.getUserLoggedIn = function () {
        return firebaseAuth.$getAuth();
    };
});

ElokuvakirjastoApp.run(function (AuthenticationService, $rootScope) {
    $rootScope.logOut = function () {
        AuthenticationService.logUserOut();
    };

    $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
});

ElokuvakirjastoApp.config(['$httpProvider', function ($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"];
    }]);

ElokuvakirjastoApp.config(function ($routeProvider) {
    $routeProvider.when('/', {
        controller: 'ListController',
        templateUrl: 'app/views/list.html'
    })
            .when('/movies', {
                controller: 'ListController',
                templateUrl: 'app/views/list.html'
            })

            .when('/movies/new', {
                controller: 'AddingController',
                templateUrl: 'app/views/new.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })

            .when('/movies/:KEY', {
                controller: 'ViewController',
                templateUrl: 'app/views/movie.html'
            })

            .when('/movies/:KEY/edit', {
                controller: 'EditingController',
                templateUrl: 'app/views/edit.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })

            .when('/login', {
                controller: 'UserController',
                templateUrl: 'app/views/login.html'
            })

            .otherwise({
                redirectTo: '/'
            });
    // Lisää reitit tänne
}); // Toteuta moduulisi tänne


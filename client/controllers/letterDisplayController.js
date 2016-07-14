AnimalApp.controller('letterDisplayController', function ($scope, $location, $routeParams, $http, UserFactory, CauseFactory) {

    UserFactory.isLoggedIn(function(user){
        if(user.id){
            // If logged in, populate form with user info
            $scope.loggedUser = user;
            $scope.loggedIn = true;
        }
        else{
            // Do something to mark guest account
        }
    });

    CauseFactory.getAllCauses(function(causes){
        $scope.causes = causes;
    })



});

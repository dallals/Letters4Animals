AnimalApp.controller('letterDisplayController', function ($scope, $location, $routeParams, $http, UserFactory, CauseFactory) {

    $scope.gotCause = false;

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


    $scope.getReps = function(level){
        var payload             = {};
            payload.rep_level   = level;

        // Format address to send to civics API
        if($scope.loggedIn){
            payload.userAddr = $scope.loggedUser.street_address + ', ' + $scope.loggedUser.city + ' ' + $scope.loggedUser.state + ', ' + $scope.loggedUser.zipcode;
        }
        else{
            payload.userAddr = $scope.addr + ', ' + $scope.city + ' ' + $scope.state + ', ' + $scope.zip;
        }
        console.log('=========userAddr=========');
        console.log(payload.userAddr);
        console.log('=========userAddr=========');

        // Grab proper representatives
        $http.post('/representatives', payload).success(function(reps){
            console.log('=========returned reps=========');
            console.log(reps);
            console.log('=========returned reps=========');
            $scope.reps = reps;
            $scope.gotCause = true;
        })
    }


});

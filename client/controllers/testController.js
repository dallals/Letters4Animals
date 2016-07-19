AnimalApp.controller('testController', function ($scope, $location, $routeParams, $http, UserFactory, CauseFactory) {

    $scope.gotCause = false;
    $scope.printing = false;
    $scope.selDiv = '';
    $scope.chosenRep = [];

    UserFactory.isLoggedIn(function(user){
        if(user.id){
            // If logged in, populate form with user info
            $scope.loggedUser = user;
            $scope.loggedIn = true;
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

        // Grab proper representatives
        $http.post('/representatives', payload).success(function(reps){
            $scope.reps = reps;
            $scope.gotCause = true;
        })
    }

    $scope.printLetter = function(elem) {
        var mywindow = window.open('', 'Letter', 'height=480,width=640');
        mywindow.document.write('<html><head><title>Letter To Representative</title>');
        // mywindow.document.write('<link rel="stylesheet" href="lettertest.css" type="text/css" />');
        mywindow.document.write('<style>@page{ margin: 0;} body{padding: 25px 45px;} #letterlogo{margin-left: 50%;}</style>');
        mywindow.document.write('</head><body >');
        mywindow.document.write($(elem).html());
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10

        setTimeout(function(){
            mywindow.print();
            mywindow.close();
        }, 100);

    }

});

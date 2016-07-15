AnimalApp.controller('TestController', function($scope, $http, $location, UserFactory) {
    $scope.confirmedAddr = 'noe';
    $scope.address = {
        choice: 'STH'
    }
    $scope.repData = {};

    $scope.subinfo = function() {

        $scope.choices = [];
        $scope.finalData = {};

        $http.post('/test', $scope.newAdd).success(function(data){
            // console.log('=========/test post data=========');
            // console.log(data);
            // console.log('==================');
            if(data == 'Not Found'){
                // alert($scope.newAdd.precheck + ' not found. Please make sure you entered your address correctly.');
            }
            else{
                if(typeof(data) == 'object'){
                    // Present all the choices and wait for them to pick
                    $scope.choices = data;
                }
                else{
                    // Present a confirmation
                    // var r = confirm('Is '+data+' correct?');
                    $scope.confirmedAddr = data;
                    if (r) {
                        $http.post('/representatives', {data}).success(function(data2){
                            console.log('=========/rep post data=========');
                            console.log(data2)
                            console.log('==================');
                            $scope.finalData = data2;
                        })
                    }
                }
            }
        })

    }

    $scope.showReps = function() {
        var position = $scope.position;
        var confAddr = $scope.confirmedAddr;

        if ($scope.confirmedAddr != 'noe') {
            $http.post('/representatives/placeholder', {data: confAddr}).success(function(repData) {
                $scope.repData = repData;
            })
        }
    }

    $scope.finalAddr = function(choice) {
        console.log('CC',$scope.address.choice);
        $scope.confirmedAddr = $scope.address.choice;
        // send to database, register, etc.
    }


    // DB connection test
    $scope.getUser = function() {
        UserFactory.getUser($scope.testUserID, function(users){
            $scope.showUser = users;
        });
    }

    $scope.login = function() {
        UserFactory.login($scope.loginUser, function(data) {
            console.log('=========login data=========');
            console.log(data);
            console.log('=========login data=========');
            if (data) {
                console.log('login successful');
                $scope.loggedUser = data;
                // $location.url('/issues');
                // $('#Login').modal('toggle');
            }
            else{
                console.log('login failed');
                // Put in error message here
                //
                //
                ////////////////////////////
            }
        })
    }


})

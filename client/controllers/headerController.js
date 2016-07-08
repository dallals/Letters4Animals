AnimalApp.controller('headerController', function ($scope, $routeParams, $location,$route, $http, UserFactory) {
    $scope.user = {};
    $scope.confirmedAddress;
    $scope.address = {choice: undefined}

    $scope.toggle = function() {
        $scope.mobile_drop = !$scope.mobile_drop;
    };

    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };


    $scope.registerAddress = function() {
        $scope.addr
        $scope.state
        $scope.zip
        if ($scope.addr && $scope.city && $scope.state && $scope.zip) {
            var address = {
                address: $scope.addr,
                city   : $scope.city,
                state  : $scope.state,
                zip    : $scope.zip };

            $http.post('/addressConfirmation', address).success(function(data) {
                // console.log(data);
                // $scope.confirmedAddr = data;
                if (data == 'Not Found') {
                    // alert(address.address + ' ' + address.state + ' ' + address.zip + ' not found. Please make sure you entered your address correctly.');
                }
                else {
                    if (typeof(data) == 'object') {
                        // Present all the choices and wait for them to pick
                        $scope.choices = data; }
                }
            })
        }
    }

    $scope.registerUser = function() {
        //address, city state zip
        if ( $scope.address.choice && $scope.user ){

            var addrArr = $scope.address.choice.split(','),
                last    = addrArr.length,
                address = addrArr[last-4],
                city    = addrArr[last-3].substr(1),
                state   = addrArr[last-2].split(' ')[1],
                zip     = addrArr[last-2].split(' ')[2];

            var user = $scope.user;
                user.address = address;
                user.city = city;
                user.state = state;
                user.zip = zip;

            UserFactory.registerUser(user, function() {
                console.log('done');
            });


            $scope.user = {};
            $scope.addr  = '';
            $scope.city  = '';
            $scope.state = '';
            $scope.zip   = '';
            $scope.confirmPassword = '';
            $('#register').modal('toggle');
        }
    }
});

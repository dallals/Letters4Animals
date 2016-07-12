AnimalApp.controller('headerController', function ($scope, $routeParams, $location,$route, $http, UserFactory) {
    $scope.user = {};
    $scope.confirmedAddress;
    $scope.address = {choice: undefined}
    $scope.regErrors = {
        firstName       : '',
        lastName        : '',
        password        : '',
        confirmPassword : '',
        addrNotFound    : '',
          address       : '',
          city          : '',
          state         : '',
          zip           : ''
    };

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

        $scope.regErrors.addrNotFound = '';

        if ($scope.addr && $scope.city && $scope.state && $scope.zip) {
            var address = {
                address: $scope.addr,
                city   : $scope.city,
                state  : $scope.state,
                zip    : $scope.zip };

            $http.post('/addressConfirmation', address).success(function(data) {
                if (data == 'Not Found') {
                    $scope.regErrors.addrNotFound = 'Address is not found, Please double check your address fields';
                } else {
                    if (typeof(data) == 'object') {
                        // Present all the choices and wait for them to pick
                        $scope.choices = data; }
                }
            })
        }
    }

    $scope.registerUser = function() {
        $scope.regErrors = {
            firstName       : '',
            lastName        : '',
            password        : '',
            confirmPassword : '',
            addrNotFound    : '',
            confirmAddr     : '',
              address         : '',
              city            : '',
              state           : '',
              zip             : ''
        };

        //address, city state zip
        if ( $scope.address.choice && $scope.user ){
<<<<<<< HEAD
            if ( !$scope.user.firstName || $scope.user.firstName.trim().length < 1 ) {
                $scope.regErrors.firstName = 'First name field must not be empty'; }
            if ( !$scope.user.lastName || $scope.user.lastName.trim().length < 1 ) {
                $scope.regErrors.lastName = 'Last name field must not be empty'; }
            if ( !$scope.user.password || $scope.user.password.trim().length < 1 ) {
                $scope.regErrors.password = 'Password must not be empty'; }
            if ( !$scope.user.confirmPassword || $scope.user.password != $scope.user.confirmPassword ) {
                $scope.regErrors.confirmPassword = 'Passwords must match'; }

            if ( !$scope.addr || $scope.addr.trim().length < 1 ) {
                $scope.regErrors.address = 'Address field must not be empty'; }

=======
            // console.log($scope.address.choice)
>>>>>>> 6170986b9b6e5c17ae62a4d9279568637be01296
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

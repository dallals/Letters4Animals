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
    var errorMessages = {
        firstName           : 'First name field is required',
        lastName            : 'Last name field is required',
        email               : 'Last name field is required',
        password            : 'Password is required',
        confirmPassword     : 'Passwords must match',
        address             : 'Address field is required',
        city                : 'City field is required',
        state               : 'State field is required',
        zip                 : 'Zip field is required'
    }

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

    $scope.login = function() {
        console.log($scope.loginUser);
        UserFactory.login($scope.loginUser, function(data) {
            console.log('ok');
            if (data.errors) {
                console.log(data.errors)
            } else {
                if(!data.success){
                    console.log('in $scope.login error handling');
                    console.log('=========data in client-side login=========');
                    console.log(data);
                    console.log('=========data in client-side login=========');
                }
                else{
                    $('#Login').modal('toggle');
                }
            }
        })
    }

    $scope.registerUser = function() {
        $scope.regErrors = {
            firstName       : '',
            lastName        : '',
            email           : '',
            password        : '',
            confirmPassword : '',
            addrNotFound    : '',
            confirmAddr     : '',
              address         : '',
              city            : '',
              state           : '',
              zip             : ''
        };

        var valid   = true,
            bevalid = true;
        //Front-end Validations TEMPORARY
            //USER
        if ( !$scope.user.firstName || $scope.user.firstName.trim().length < 1 ) {
            valid = false;
            $scope.regErrors.firstName = errorMessages.firstName; }
        if ( !$scope.user.lastName || $scope.user.lastName.trim().length < 1 ) {
            valid = false;
            $scope.regErrors.lastName = errorMessages.lastName; }
        if ( !$scope.user.email || $scope.user.email.trim().length < 1 ) {
            valid = false;
            $scope.regErrors.email = errorMessages.email; }
        if ( !$scope.user.password || $scope.user.password.trim().length < 1 ) {
            valid = false;
            $scope.regErrors.password = errorMessages.password; }
        if ( !$scope.confirmPassword || !$scope.user.password || $scope.user.password != $scope.confirmPassword ) {
            valid = false;
            $scope.regErrors.confirmPassword = errorMessages.confirmPassword; }
            //ADDRESS
        if ( !$scope.addr || $scope.addr.trim().length < 1 ) {
            valid = false;
            $scope.regErrors.address = errorMessages.address; }
        if ( !$scope.city || $scope.city.trim().length < 1 ) {
            valid = false;
            $scope.regErrors.city = errorMessages.city; }
        if ( !$scope.state || $scope.state.trim().length < 1 ) {
            valid = false;
            $scope.regErrors.state = errorMessages.state; }
        if ( !$scope.zip || $scope.zip.trim().length < 1 ) {
            valid = false;
            $scope.regErrors.zip = errorMessages.zip; }

        //address, city state zip
        if ( $scope.address.choice && $scope.user && valid ){

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

            UserFactory.registerUser(user, function(data) {
                if (data.errors && data.errors.errors) {
                    for (err of data.errors.errors) {
                        if (err.path == 'first_name') {
                            bevalid = false;
                            $scope.regErrors.firstName += err.message; }
                        if (err.path == 'last_name') {
                            bevalid = false;
                            $scope.regErrors.lastName += err.message; }
                        if (err.path == 'email') {
                            bevalid = false;
                            $scope.regErrors.email += err.message; }
                        if (err.path == 'password') {
                            bevalid = false;
                            $scope.regErrors.password += err.message; }
                        if (err.path == 'street_address') {
                            bevalid = false;
                            $scope.regErrors.address += err.message; }
                        if (err.path == 'city') {
                            bevalid = false;
                            $scope.regErrors.city += err.message; }
                        if (err.path == 'state') {
                            bevalid = false;
                            $scope.regErrors.state += err.message; }
                        if (err.path == 'zipcode') {
                            bevalid = false;
                            $scope.regErrors.zip += err.message; }

                    }
                }

                if (bevalid) {
                    $scope.user = {
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: ''
                    };
                    $scope.addr  = '';
                    $scope.city  = '';
                    $scope.state = '';
                    $scope.zip   = '';
                    $scope.confirmPassword = '';
                    $scope.choices = [];
                    $('#Register').modal('toggle')
                }
            });


        }

    }
});

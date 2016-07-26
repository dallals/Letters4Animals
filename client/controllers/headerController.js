AnimalApp.controller('headerController', function ($scope, $routeParams, $location,$route, $http, UserFactory) {
    $scope.user = {};
    $scope.loggedUser = {};
    $scope.loggedIn = false;
    $scope.confirmedAddress;
    $scope.address = {choice: undefined};
    $scope.loginErrors = '';
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


    // Checking login status
    UserFactory.isLoggedIn(function(user){
        if(user.id){
            $scope.loggedUser = user;
            $scope.loggedIn = true;
        }
    });


    $scope.toggle = function() {
        $scope.mobile_drop = !$scope.mobile_drop;
    };

    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };


    $scope.registerAddress = function() {
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
    $scope.close = function() {
        $('#Login').modal('hide');
    }

    $scope.login = function() {
        $scope.loginErrors = '';
        UserFactory.login($scope.loginUser, function(data) {
            if (data) {
            //Yes User.
                if (!data.error) {
                    $scope.loggedUser = data;
                    $scope.loggedIn = true;

                    $('#Login').modal('toggle');
                    $scope.loginUser = {};
                } else {
                    //Bad Password.
                    $scope.loginErrors = 'Failed login, please check your email and password.';
                }
            //No User.
            } else{
                $scope.loginErrors = 'Failed login, please check your email and password.';
            }
        })
    }

    $scope.logout = function() {
        // Log out through Passport, then clear local user data and redirect
        $http.get('/logout').success(function(){
            $scope.loggedUser = {};
            $scope.loggedIn = false;
            $location.url('/');
        });
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
        //Front-end Validations
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

            var addrArr = $scope.address.choice.formatted_address.split(','),
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
                    for (var errIndex in data.errors.errors) {
                        var err = data.errors.errors[errIndex];
                        
                        if (err.path == 'first_name') { bevalid = false;
                            $scope.regErrors.firstName += err.message; }
                        if (err.path == 'last_name') { bevalid = false;
                            $scope.regErrors.lastName += err.message; }
                        if (err.path == 'email') { bevalid = false;
                            $scope.regErrors.email += err.message; }
                        if (err.path == 'password') { bevalid = false;
                            $scope.regErrors.password += err.message; }
                        if (err.path == 'street_address') { bevalid = false;
                            $scope.regErrors.address += err.message; }
                        if (err.path == 'city') { bevalid = false;
                            $scope.regErrors.city += err.message; }
                        if (err.path == 'state') { bevalid = false;
                            $scope.regErrors.state += err.message; }
                        if (err.path == 'zipcode') { bevalid = false;
                            $scope.regErrors.zip += err.message; }
                    }
                }
                if (data.errors) {
                    $scope.regErrors.email += 'User with that email already exists';
                    bevalid = false;
                }

                if (bevalid) {

                    // Send confirmation email
                    var confEmail = {
                        first_name  : $scope.user.firstName,
                        last_name   : $scope.user.lastName,
                        rand_url    : data.string,
                        email       : $scope.user.email
                    }
                    $http.post('/confEmail', confEmail).success(function(result){
                        console.log('=========confirm email sent successfully=========');
                    });

                    $('#Register').modal('toggle');
                    swal("Thanks for registering!", "Please check your email for a link to activate your account", "success");

                    // Reset regitration form
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

                }
            }); // End of UserFactory.registerUser
        }
    }   // End of $scope.registerUser

});

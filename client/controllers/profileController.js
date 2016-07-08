AnimalApp.controller('profileController', function ($scope, $routeParams, $http) {
    // Get current user from db
    /*

    */

    // using dummy static data for now
    $scope.user = {
        first_name : 'John',
        last_name : 'Smith',
        street_address: '123 Street Way',
        city: 'City',
        state: 'CA',
        zipcode : '35522',
        phone_number: '4083453455',
        email: 'test@user.com',
        password: 'testpassword',
        volunteer: true
    }

    // The following is if the user wants to update their password, they can show/hide their password
    $scope.showpass = 'show';
    $scope.showPassword = function(){
        if($scope.showpass == 'hide'){
            $scope.showpass = 'show';
            $('#password').attr('type', 'password');
        }else{
            $scope.showpass = 'hide';
            $('#password').attr('type', 'text');
        }
    }

    // Update user profile info
    $scope.updateProfile = function(){
        // console.log('user info is: ', $scope.user);
        // SEND UPDATED INFO TO THE DB AND UPDATE IT THERE!
        /*

        */
        
        // after success show alert
        swal("Profile Updated!", "Your profile has been successfully updated!", "success");
    }
});

AnimalApp.controller('profileController', function ($scope, $routeParams, $http, UserFactory) {

    // Get current user from db
    $scope.tempUserID = 1;  // Temp user ID of 1. Will be replaced by actual session user ID once we implement Passport

    UserFactory.getUser($scope.tempUserID, function(user){
        // Fetch user by ID, populate form data
        $scope.user = user;
    });

    //////////////////// dummy static data. uncomment and use this if your user DB isn't set up
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
            $('#user_password').attr('type', 'password');
        }else{
            $scope.showpass = 'hide';
            $('#user_password').attr('type', 'text');
        }
    }

    // Keep track of which fields are updating
    $scope.updateInfo = function(field){
        if(!$scope.updatedUser){ $scope.updatedUser = {}; }
        // Update property of temp user based on what changes
        $scope.updatedUser[field] = $scope.user[field];
    }
    // Checks if an object is empty so user can't submit updates without actually updating something
    $scope.isUpdated = function(user) {
        for(var key in user) {
            if (user.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    // Update user profile info
    $scope.updateProfile = function(){
        // SEND UPDATED INFO TO THE DB AND UPDATE IT THERE!
        $scope.updatedUser.userid = $scope.tempUserID;
        for(var field in $scope.updatedUser){ // Empty field check
            if($scope.updatedUser[field] == ''){
                return false;
            }
        }
        UserFactory.updateUser($scope.updatedUser);
        // after success show alert
        swal("Profile Updated!", "Your profile has been successfully updated!", "success");
        $scope.updatedUser = {};
    }
});

AnimalApp.controller('profileController', function ($scope, $location, $routeParams, $http, UserFactory) {

    UserFactory.isLoggedIn(function(user){
        if(user.id){
            // If logged in, populate form with user info
            $scope.loggedUser = user;
            $scope.loggedIn = true;
        }
        else{ $location.url('/'); }
    });

    // Make sure controller doesn't do anything until someone's actually logged in
    if($scope.loggedIn){

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
            $scope.updatedUser[field] = $scope.loggedUser[field];
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
            $scope.updatedUser.userid = $scope.loggedUser.id;
            for(var field in $scope.updatedUser){ // Empty field check
                if($scope.updatedUser[field] == ''){
                    return false;
                }
            }
            // Send updated fields to factory/DB to update
            UserFactory.updateUser($scope.updatedUser);
            // after success show alert
            swal("Profile Updated!", "Your profile has been successfully updated!", "success");
            $scope.updatedUser = {};
        }

    } // End of logged in check
});

AnimalApp.controller('profileController', function ($scope, $location, $routeParams, $http, UserFactory) {

    UserFactory.isLoggedIn(function(user){
        if(user.id){
            // If logged in, populate form with user info
            $scope.loggedUser = user;
            $scope.loggedUser.password = '';
            $scope.loggedIn = true;
        }
        else{ $location.url('/'); }
    });

    // Make sure controller doesn't do anything until someone's actually logged in
    if($scope.loggedIn){
        //$2a$08$GO7plzX1IHDSUvc3dv81t.MKlOKxmpvfA4xKarajFH31DHufSKw3u
        //$2a$08$VwuV4Cj2blxk7twyEw5qdORknlCGGMTJVeFy568LgqJ6Byv29An1C
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
            // if (field == 'volunteer') {
            //     $scope.updatedUser['volunteer'] = $scope.loggedUser[field];
            //     console.log($scope.updatedUser.volunteer);
            // }
            // else if (field == 'emailNotif') {
            //     $scope.updatedUser['email_notification'] = $scope.loggedUser['email_notification'];
            //     console.log($scope.updatedUser);
            // }
            // else if (field == 'phoneNotif') {
            //     $scope.updatedUser['phone_notification'] = $scope.loggedUser['phone_notification'];
            //     console.log($scope.updatedUser);
            // }
            // else {
                $scope.updatedUser[field] = $scope.loggedUser[field];
                console.log('in the else, upUser: ', $scope.updatedUser);
            // }
            // console.log($scope.updatedUser);
        }
        // Checks if an object is empty so user can't submit updates without actually updating something
        $scope.isUpdated = function(user) {
            // console.log('in isUpdated, user: ', user);
            for(var key in user) {
                if (user.hasOwnProperty(key)) {
                    return false;
                    console.log('updating');
                }
            }
            return true;
        }

// ng-disabled='isUpdated(updatedUser)'

        // Update user profile info
        $scope.updateProfile = function(){
            if($scope.updatedUser){
                $scope.updatedUser.userid = $scope.loggedUser.id;
                for(var field in $scope.updatedUser){ // Empty field check
                    if($scope.updatedUser[field] == '' && field != 'volunteer' && field != 'email_notification' && field != 'phone_notification'){
                        return false;
                    }
                }
                // Send updated fields to factory/DB to update
                UserFactory.updateUser($scope.updatedUser);
                // after success show alert
                swal("Profile Updated!", "Your profile has been successfully updated!", "success");
                $scope.updatedUser = null;
            }
        }

        $scope.updatePassword = function() {
            //If they equal, if they exist, if not empty
            if ($scope.newPassword === $scope.updatePassword && $scope.newPassword && $scope.updatePassword && $scope.newPassword.trim() != '') {
                var newPass = {
                    userid: $scope.loggedUser.id,
                    password: $scope.newPassword
                };
                UserFactory.updateUser(newPass);
                swal("Password Updated!", "Your password has been successfully updated!", "success");
                $scope.newPass = {
                    userid: $scope.loggedUser.id
                };
            } else {
                $scope.errors.password = 'Bad password(s). Please check the two password fields.';
            }
        }

    } // End of logged in check
});

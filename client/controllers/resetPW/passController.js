AnimalApp.controller('PassController', function($scope, UserFactory, $location) {
    $('#Login').modal('hide');
    $scope.email = '';
    $scope.errors = '';

    $scope.checkEmail = function() {
        $scope.errors = '';
        if ($scope.email == '') {
            $scope.errors = 'Email not found';
        } else {
            UserFactory.getUserByEmail($scope.email, function(data) {
                if (data.errors) {
                    $scope.errors = data.errors;
                } else {
                    //Move on to next step
                    //Success page
                    //Email it
                    $location.url('/emailSent');
                }
            })

            $scope.email = '';
        }
    }
})

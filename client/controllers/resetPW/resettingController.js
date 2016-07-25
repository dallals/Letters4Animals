AnimalApp.controller('ResettingController', function($scope, $location, UserFactory, $routeParams) {

    UserFactory.getUserByResetUrl($routeParams.url, function(data) {
        if (data.errors) {
            $location.url('/resetPassword/failure');
        }
    })

    $scope.resetPassword = function() {
        if ($scope.password == $scope.confirmPassword) {
            UserFactory.resetPassword($scope.password, $routeParams.url, function(data) {
                if (data.success) {
                    $location.url('/resetPassword/success');
                } else {
                    $location.url('/resetPassword/failure');
                }
            });
        } else {
            $location.url('/resetPassword/failure');
        }
    }
})

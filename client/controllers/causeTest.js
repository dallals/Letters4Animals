AnimalApp.controller('CauseTestController', function($scope, CauseFactory) {
    $scope.cause = {
        name: '',
        description: '',
        letter_body: 'letter_body',
        rep_level: '',
        enabled: false,
    }
    console.log('In CauseTestController');
    // $scope.causes = [];
    CauseFactory.getAllCauses(function(causes) {
        $scope.causes = causes;
    })

    $scope.toggleCause = function(cause) {
        if (!cause) {
            return;
        }
        console.log('Retiring:', cause);
        if (cause.enabled) {
            var toggleOff = confirm('Are you sure you want to disable '+cause.name+'?');
            if (toggleOff) {
                console.log('Disabling',cause.name);
                CauseFactory.disableCause(cause, function() {
                    CauseFactory.getAllCauses(function(causes) {
                        $scope.causes = causes;
                    })
                })
            } else {
                console.log('Cancelled disabling',cause.name)
            }
        } else {
            var toggleOn = confirm('Are you sure you want to enable '+cause.name+'?');
            if (toggleOn) {
                console.log('Enabling', cause.name);
                CauseFactory.enableCause(cause, function() {
                    CauseFactory.getAllCauses(function(causes) {
                        $scope.causes = causes;
                    })
                })
            } else {
                console.log('Cancelled enabling',cause.name)
            }
        }
        // var confirmCause = confirm()
    }

    $scope.addCause = function() {
        console.log($scope.cause);
        //Front end validations
        var validCause = true;
        if (false) {
            validCause = false;
        }

        if (validCause) {
            CauseFactory.createCause($scope.cause, function() {
                    CauseFactory.getAllCauses(function(causes) {
                        $scope.causes = causes;
                    })
            });
        }
    }
})

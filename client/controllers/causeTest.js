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
        if (cause.enabled) {
            var toggleOff = confirm('Are you sure you want to disable '+cause.name+'?');
            if (toggleOff) {
                CauseFactory.disableCause(cause, function() {
                    CauseFactory.getAllCauses(function(causes) {
                        $scope.causes = causes;
                    })
                })
            }
        } else {
            var toggleOn = confirm('Are you sure you want to enable '+cause.name+'?');
            if (toggleOn) {
                CauseFactory.enableCause(cause, function() {
                    CauseFactory.getAllCauses(function(causes) {
                        $scope.causes = causes;
                    })
                })
            }
        }
        // var confirmCause = confirm()
    }

    $scope.addCause = function() {
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

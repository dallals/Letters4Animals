AnimalApp.controller('adminController', function($scope, $location, UserFactory, CauseFactory) {

	$scope.checkboxModel = {
		value1 : true,
		value2 : 'YES'
	};

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
		UserFactory.getAllUsers(function(users){
			$scope.users = users;
		});
		CauseFactory.getAllCauses(function(causes){
			$scope.causes = causes;
		})

		$scope.delUser = function(user){
			// Prompt the admin to confirm user deletion to avoid accidents
			var confPrompt = confirm("About to delete "+user.first_name+". Proceed?");
	        if (confPrompt) {
				UserFactory.delUser(user, function(users){
					$scope.users = users;
				})
	        }
		};

		$scope.delCause = function(cause){
			// Prompt the admin to confirm user deletion to avoid accidents
			var confPrompt = confirm("About to delete "+cause.name+". Proceed?");
	        if (confPrompt) {
				CauseFactory.delCause(cause, function(causes){
					$scope.causes = causes;
				})
	        }
		}

	    $scope.toggleCause = function(cause) {
	        if (!cause) {
	            return;
	        }
	        if (cause.enabled) {
                CauseFactory.disableCause(cause, function() {
                    CauseFactory.getAllCauses(function(causes) {
                        $scope.causes = causes;
                    })
                })
	        } else {
                CauseFactory.enableCause(cause, function() {
                    CauseFactory.getAllCauses(function(causes) {
                        $scope.causes = causes;
                    })
                })
	        }
	        // var confirmCause = confirm()
	    }
		$scope.enableAllCauses = function() {
			for (cause of $scope.causes) {
				CauseFactory.enableCause(cause, function() {
					CauseFactory.getAllCauses(function(causes) {
						$scope.causes = causes;
					})
				})
			}
		}
		$scope.disableAllCauses = function() {
			for (cause of $scope.causes) {
				CauseFactory.disableCause(cause, function() {
					CauseFactory.getAllCauses(function(causes) {
						$scope.causes = causes;
					})
				})
			}
		}

		$scope.deleteCause = function(cause) {
			console.log('Angular Controller Delete');
			CauseFactory.deleteCause(cause, function() {
				CauseFactory.getAllCauses(function(causes) {
					$scope.causes = causes;
				})
			})
		}

	} // End of logged in check
});

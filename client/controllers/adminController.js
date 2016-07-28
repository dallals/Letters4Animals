// Main Controller for the Admin Panel Home Page
AnimalApp.controller('adminController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {

	$scope.checkboxModel = {
		value1 : true,
		value2 : 'YES'
	};

	UserFactory.isLoggedIn(function(user){
		if(user.admin == true){
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
		CauseFactory.getAllPendingcauses(function(pendingcauses){
			$scope.pendingcauses = pendingcauses;
		})
		UserFactory.getAllGuests(function(guests){
			console.log(guests)
			$scope.guests = guests;
		});

		//delete user from the admin panel
		$scope.delUser = function(user){
			// Prompt the admin to confirm user deletion to avoid accidents
			var confPrompt = confirm("About to delete "+user.first_name+". Proceed?");
	        if (confPrompt) {
				UserFactory.delUser(user, function(users){
					$scope.users = users;
				})
	        }
		};

		//delete guest from the admin panel
		$scope.delGuest = function(guest){
			// Prompt the admin to confirm user deletion to avoid accidents
			var confPrompt = confirm("About to delete "+guest.first_name+". Proceed?");
	        if (confPrompt) {
				UserFactory.delGuest(guest, function(guests){
					$scope.guests = guests;
				})
	        }
		};

		//delete cause from the admin panel
		$scope.deleteCause = function(cause){
			// Prompt the admin to confirm user deletion to avoid accidents
			var confPrompt = confirm("About to delete "+cause.name+". Proceed?");
	        if (confPrompt) {
				CauseFactory.delCause(cause, function(causes){
					$scope.causes = causes;
				})
	        }
		};

		//delete pending causes from the admin panel
		$scope.deletePendCause = function(pendingcause){
			var confPrompt = confirm("About to delete pending cause: "+pendingcause.name+". Proceed?");
			if (confPrompt) {
				CauseFactory.delPendCause(pendingcause, function(pendingcauses){
					$scope.pendingcauses = pendingcauses;
				})
			}
		};

		//add a new cause from the admin panel
		$scope.addCause = function(){
				CauseFactory.createCause($scope.cause, function(causes){
					$scope.causes = causes;
					//redirect back to the admin page after submitting a new cause
					$location.url('/administrator');
				})
		}

		//enable/disable causes from the admin panel
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

		//enable all causes from the admin panel enable all button
		$scope.enableAllCauses = function() {
			for (cause in $scope.causes) {
				CauseFactory.enableCause($scope.causes[cause], function() {
					CauseFactory.getAllCauses(function(causes) {
						$scope.causes = causes;
					})
				})
			}
		}

		//disable all causes from the admin panel enable all button
		$scope.disableAllCauses = function() {
			for (cause in $scope.causes) {
				CauseFactory.disableCause($scope.causes[cause], function() {
					CauseFactory.getAllCauses(function(causes) {
						$scope.causes = causes;
					})
				})
			}
		}

		//controls Edit button from Causes tab of Admin panel
		$scope.editCause = function(cause){
			CauseFactory.update(cause, function(cause){
				$scope.cause = cause
			})
		}

	} // End of logged in check

	//send twilio msg
   $scope.sendText = function(cause){
	   CauseFactory.sendText(cause);
   }

});

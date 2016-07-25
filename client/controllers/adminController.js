AnimalApp.controller('adminController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {

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
		CauseFactory.getAllPendingcauses(function(pendingcauses){
			console.log(pendingcauses, "Getting to pendingcauses")
			$scope.pendingcauses = pendingcauses;
		})
		UserFactory.getAllGuests(function(guests){
			console.log(guests)
			$scope.guests = guests;
		});

		$scope.delUser = function(user){
			// Prompt the admin to confirm user deletion to avoid accidents
			var confPrompt = confirm("About to delete "+user.first_name+". Proceed?");
	        if (confPrompt) {
				UserFactory.delUser(user, function(users){
					$scope.users = users;
				})
	        }
		};
		$scope.delGuest = function(guest){
			// Prompt the admin to confirm user deletion to avoid accidents
			var confPrompt = confirm("About to delete "+guest.first_name+". Proceed?");
	        if (confPrompt) {
				UserFactory.delGuest(guest, function(guests){
					// $scope.guests = guests;
				// UserFactory.getAllGuests(function(guests){
				// console.log(guests)
				console.log("Deleting Guests")
				$scope.guests = guests;
				// });	
				})
	        }
		};

		$scope.deleteCause = function(cause){
			// Prompt the admin to confirm user deletion to avoid accidents
			// var confPrompt = confirm("About to delete "+cause.name+". Proceed?");
	        // if (confPrompt) {
	        	console.log("getting to if")
				CauseFactory.delCause(cause, function(causes){
					$scope.causes = causes;
				})
	        // }
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

	//send twilio msg
   $scope.sendText = function(cause){
	   CauseFactory.sendText(cause, function(data){
		   console.log(data);
	   })
   }

	 //Set a fixed/non-fixed recipient on the normal Add Cause Page
	 $scope.toggleFixed = function(recipient) {
			//  if (!recipient) {
			// 		 return;
			//  }
			//  if (recipient.fixed) {
			// logic to set a fixed recipient for letter/cause goes here
			//  } else {

			//  }
	 }



});

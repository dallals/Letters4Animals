// Controller to update causes on the Admin Panel
AnimalApp.controller('singleCauseController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {
		var id = $routeParams.id;


		UserFactory.isLoggedIn(function(user){
		if(user.admin == true){
			// If logged in, populate form with user info
			$scope.loggedUser = user;
            $scope.loggedIn = true;
		}
		else{ $location.url('/'); }
		});

		//get cause for edit/update functionality
		CauseFactory.getCause(id, function(data) {
			$scope.cause = data;
		});

		//get logged in users who have supported/printed letters for this cause in the past- returns ID
		CauseFactory.getSupporters(id, function(data) {
			$scope.supporters = data;
		});

		//get guests who have supported/printed letters for this cause in the past
		CauseFactory.getGuests(id, function(data) {
			console.log("Get Guests Callback factory",data);
			$scope.guests = data;
		});

		//Commented out because seems duplicate. connects to cause Factory ln 50
		//get users who have supported/printed letters for this cause in the past integrates with Users table
		// CauseFactory.getCauseUsers(id, function(data) {
		// 	$scope.causeusers = data;
		// });

		//get single cause information for single view page
		CauseFactory.getSingleViewCause(id, function(data) {
			$scope.causeview = data[0];
		});

		//update cause information from the Causes Admin panel
		$scope.updateCause = function(cause){
			CauseFactory.updateCause(cause, function(data){
				$scope.cause = data
			})
		};

		//add new causes from the admin panel
		$scope.addCause = function(cause){
			CauseFactory.createCause(cause, function(data){
				$scope.cause = data
			})
		};

		//Configuration for rich text editor
		$scope.tinymceOptions = {
			plugins: 'link advlist code spellchecker paste textcolor colorpicker visualchars wordcount contextmenu visualblocks insertdatetime hr searchreplace',
			advlist_bullet_styles: "default circle disc square",
			menubar: "edit view insert",
			toolbar: 'undo redo |  bold italic | bullist numlist | styleselect | alignleft aligncenter alignright | code | spellchecker | paste | forecolor backcolor | visualchars | link | visualblocks | insertdatetime | searchreplace | fontselect |  fontsizeselect',
			fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
		};

});

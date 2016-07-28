// Controller view a single cause on the Admin Panel (separated out to avoid innerHTML errors)
AnimalApp.controller('singleCauseViewController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {
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

		//get single cause for single view functionality
		CauseFactory.getSingleViewCause(id, function(data) {
			$scope.causeview = data[0];
			$scope.causehtml = data[0].letter_body;
			document.getElementById('letter').innerHTML = $scope.causehtml;
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

		//get users who have supported/printed letters for this cause in the past integrates with Users table
		CauseFactory.getCauseUsers(id, function(data) {
			$scope.causeusers = data;
		});

		//get single cause information for single view page
		CauseFactory.getSingleViewCause(id, function(data) {
			$scope.causeview = data[0];
		});

		//Configuration for rich text editor
		$scope.tinymceOptions = {
			plugins: 'link advlist code spellchecker paste textcolor colorpicker visualchars wordcount contextmenu visualblocks insertdatetime hr searchreplace',
			advlist_bullet_styles: "default circle disc square",
			menubar: "edit view insert",
			toolbar: 'undo redo |  bold italic | bullist numlist | styleselect | alignleft aligncenter alignright | code | spellchecker | paste | forecolor backcolor | visualchars | link | visualblocks | insertdatetime | searchreplace | fontselect |  fontsizeselect',
			fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
		};

});

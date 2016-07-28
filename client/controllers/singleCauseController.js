AnimalApp.controller('singleCauseController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {

		console.log("made it to client/single cause controller",$routeParams.id);
		var id = $routeParams.id;

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

		CauseFactory.getSupporters(id, function(data) {
			console.log("Get Supporters Callback factory",data);
			$scope.supporters = data;
		});

		CauseFactory.getGuests(id, function(data) {
			console.log("Get Guests Callback factory",data);
			$scope.guests = data;
		});

		CauseFactory.getCauseUsers(id, function(data) {
			$scope.causeusers = data;
		});

		CauseFactory.getSingleViewCause(id, function(data) {
			$scope.causeview = data[0];
		});

		$scope.updateCause = function(cause){
			CauseFactory.updateCause(cause, function(data){
				$scope.cause = data
			})
		};

		$scope.addCause = function(cause){
			console.log('getting controller frontend')
			CauseFactory.createCause(cause, function(data){
				$scope.cause = data
			})
		};

		$scope.tinymceOptions = {
			plugins: 'link advlist code spellchecker paste textcolor colorpicker visualchars wordcount contextmenu visualblocks insertdatetime hr searchreplace',
			advlist_bullet_styles: "default,circle, disc, square",
			menubar: "edit view insert",
			toolbar: 'undo redo |  bold italic | bullist numlist | styleselect | alignleft aligncenter alignright | code | spellchecker | paste | forecolor backcolor | visualchars | link | visualblocks | insertdatetime | searchreplace | fontselect |  fontsizeselect',
			fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt"
		};

});

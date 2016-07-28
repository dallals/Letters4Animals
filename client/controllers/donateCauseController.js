// Controller for volunteering a letter
AnimalApp.controller('donateCauseController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {
		// console.log("made it to pending cause controller",$routeParams.id);
		// var id = $routeParams.id;
		$scope.sweet = {};

		//Create button for the pending cause
		$scope.volunteer = function(user){
				$scope.pendingcause.user_id = user;
				CauseFactory.createPendCause($scope.pendingcause, function(causes){
					//sweet alert for letter submission
					swal("Letter Submitted!", "Your letter has been submitted for consideration. Thank you for donating your time to the cause!", "success");
					$scope.causes = causes;
					$location.url('/writealetter');
				})
		}

		//Configuration for rich text editor
		$scope.tinymceOptions = {
			plugins: 'link advlist code spellchecker paste textcolor colorpicker visualchars wordcount contextmenu visualblocks insertdatetime hr searchreplace',
			advlist_bullet_styles: "default circle disc square",
			menubar: "edit view insert",
			toolbar: 'undo redo |  bold italic | bullist numlist | styleselect | alignleft aligncenter alignright | code | spellchecker | paste | forecolor backcolor | visualchars | link | visualblocks | insertdatetime | searchreplace | fontselect |  fontsizeselect',
			fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
		};

});

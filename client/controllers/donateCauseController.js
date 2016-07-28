AnimalApp.controller('donateCauseController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {
		// console.log("made it to pending cause controller",$routeParams.id);
		// var id = $routeParams.id;
		$scope.sweet = {};


		$scope.volunteer = function(user){
				$scope.pendingcause.user_id = user;
				CauseFactory.createPendCause($scope.pendingcause, function(causes){
					//sweet alert for letter submission
					swal("Letter Submitted!", "Your letter has been submitted for consideration. Thank you for donating your time to the cause!", "success");
					$scope.causes = causes;
					$location.url('/writealetter');
				})
		}

		$scope.tinymceOptions = {
			plugins: 'link advlist code spellchecker paste textcolor colorpicker visualchars wordcount contextmenu visualblocks insertdatetime charmap hr searchreplace',
			advlist_bullet_styles: "square",
			menubar: "edit view insert",
			toolbar: 'undo redo |  bold italic | styleselect | alignleft aligncenter alignright | code | spellchecker | paste | forecolor backcolor | visualchars | link | visualblocks | insertdatetime | charmap | searchreplace',
		};

});

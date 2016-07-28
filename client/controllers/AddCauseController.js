// Controller for add cause links
AnimalApp.controller('AddCauseController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {
		//add new causes from the admin panel
		
		UserFactory.isLoggedIn(function(user){
			if(user.admin == true){
				// If logged in, populate form with user info
				$scope.loggedUser = user;
	            $scope.loggedIn = true;
			}
			else{ $location.url('/'); }
		});
		
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

// Controller for the Pending Cause Edit/Add HTML on the admin panel- pendingcauseadmin.html
AnimalApp.controller('pendingCauseController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {
		var id = $routeParams.id;

		//get single pending cause info
		CauseFactory.getPendingCause(id, function(data) {
			console.log("made it back from pending cause factory",data);
			$scope.pendingcause = data[0];
		});

		// convert a pending cause to a real cause and delete the pending cause
		$scope.addCause = function(){
				CauseFactory.createCause($scope.pendingcause, function(causes){
					$scope.causes = causes;
					CauseFactory.delPendCause($scope.pendingcause, function(pendingcauses){
						$scope.pendingcauses = pendingcauses;
					})
					$location.url('/administrator');
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

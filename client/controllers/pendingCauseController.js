AnimalApp.controller('pendingCauseController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {
		console.log("made it to pending cause controller",$routeParams.id);
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

		$scope.tinymceOptions = {
			plugins: 'link advlist code spellchecker paste textcolor colorpicker visualchars wordcount contextmenu visualblocks insertdatetime charmap hr searchreplace',
			advlist_bullet_styles: "square",
			menubar: "edit view insert",
			toolbar: 'undo redo |  bold italic | styleselect | alignleft aligncenter alignright | code | spellchecker | paste | forecolor backcolor | visualchars | link | visualblocks | insertdatetime | charmap | searchreplace',
		};

});

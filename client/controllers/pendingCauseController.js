AnimalApp.controller('pendingCauseController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {
		console.log("made it to pending cause controller",$routeParams.id);
		var id = $routeParams.id;

		CauseFactory.getPendingCause(id, function(data) {
			console.log("made it back from pending cause factory",data);
			$scope.pendingcause = data[0];
		});

		$scope.addCause = function(){
				CauseFactory.createCause($scope.pendingcause, function(causes){
					$scope.causes = causes;
					$location.url('/administrator');
				})
		}

});

AnimalApp.controller('singleCauseController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {

		console.log("made it to single cause controller",$routeParams.id);
		var id = $routeParams.id;

		CauseFactory.getCause(id, function(data) {
			console.log("made it back from cause factory",data);
			$scope.cause = data[0];
		});
	// }

});

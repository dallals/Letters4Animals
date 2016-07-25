AnimalApp.controller('singleCauseController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {

		console.log("made it to client/single cause controller",$routeParams.id);
		var id = $routeParams.id;

		CauseFactory.getCause(id, function(data) {
			console.log("made it back from cause factory",data);
			$scope.cause = data;
			console.log($scope.cause);
		});
		CauseFactory.getSupporters(id, function(data) {
			console.log("Get Supporters Callback factory",data);
			$scope.supporters = data;
		});
		CauseFactory.getGuests(id, function(data) {
			console.log("Get Guests Callback factory",data);
			$scope.guests = data;
		});
	// }

});

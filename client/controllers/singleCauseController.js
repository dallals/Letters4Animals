AnimalApp.controller('singleCauseController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {

		console.log("made it to client/single cause controller",$routeParams.id);
		var id = $routeParams.id;

		CauseFactory.getCause(id, function(data) {
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

		CauseFactory.getCauseUsers(id, function(data) {
			$scope.causeusers = data;
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




});
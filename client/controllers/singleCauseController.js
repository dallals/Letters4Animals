AnimalApp.controller('singleCauseController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {
		var id = $routeParams.id;

		CauseFactory.getCause(id, function(data) {
			$scope.cause = data[0];
		});

		CauseFactory.getCauseUsers(id, function(data) {
			$scope.causeusers = data;
		});


});

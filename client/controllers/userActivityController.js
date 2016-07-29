// Controller to see user activity on the Admin Panel
AnimalApp.controller('userActivityController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {
		var id = $routeParams.id;

		UserFactory.isLoggedIn(function(user){
		if(user.admin == true){
			// If logged in, populate form with user info
			$scope.loggedUser = user;
            $scope.loggedIn = true;
		}
		else{ $location.url('/'); }
		});
		//
		UserFactory.getUser(id, function(data) {
			$scope.user = data;
		});

		CauseFactory.getUserCauses(id, function(data) {
			$scope.causes = data;
		});
});

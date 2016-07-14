AnimalApp.controller('adminController', function($scope, $location, $http, UserFactory, CauseFactory) {

	$scope.checkboxModel = {
		value1 : true,
		value2 : 'YES'
	};

	UserFactory.isLoggedIn(function(user){
		if(user.id){
			// If logged in, populate form with user info
			$scope.loggedUser = user;
            $scope.loggedIn = true;
		}
		// Comment this else out if you don't have a working database
		else{ $location.url('/'); }
	});

	UserFactory.getAllUsers(function(users){
		$scope.users = users;
	});

    // $scope.createCause = function(){
    // 	causeFactory.cause($scope.cause, function(data){
    // 		$scope.cause = data
    // 	})
    // }
});

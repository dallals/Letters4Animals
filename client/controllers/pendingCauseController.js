AnimalApp.controller('pendingCauseController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {
	// $scope.checkboxModel = {
	// 	value1 : true,
	// 	value2 : 'YES'
	// };
	//
	// UserFactory.isLoggedIn(function(user){
	// 	if(user.id){
	// 		// If logged in, populate form with user info
	// 		$scope.loggedUser = user;
  //           $scope.loggedIn = true;
	// 	}
	// 	else{ $location.url('/'); }
	// });
	//
	// // Make sure controller doesn't do anything until someone's actually logged in
	// if($scope.loggedIn){

		console.log("made it to pending cause controller",$routeParams.id);
		var id = $routeParams.id;

		CauseFactory.getPendingCause(id, function(data) {
			console.log("made it back from pending cause factory",data);
			$scope.pendingcause = data[0];
		});
	// }

});

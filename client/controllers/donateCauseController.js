AnimalApp.controller('donateCauseController', function($scope, $location, $routeParams, UserFactory, CauseFactory) {
		console.log("made it to pending cause controller",$routeParams.id);
		var id = $routeParams.id;

		$scope.volunteer = function(){
				CauseFactory.createPendCause($scope.pendingcause, function(causes){
					$scope.causes = causes;
					$location.url('/writealetter');
				})
		}

});

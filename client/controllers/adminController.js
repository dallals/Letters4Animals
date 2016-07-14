AnimalApp.controller('adminController', ['$scope', '$http', 'UserFactory', 'CauseFactory', function($scope, $http, UserFactory, CauseFactory) {
	$scope.checkboxModel = {
		value1 : true,
		value2 : 'YES'
	};
	$scope.getUser = function() {
        UserFactory.getUser($scope.testUserID, function(users){
            $scope.showUser = users;
        });
    }

    // $scope.createCause = function(){
    // 	causeFactory.cause($scope.cause, function(data){
    // 		$scope.cause = data
    // 	})
    // }
}]);

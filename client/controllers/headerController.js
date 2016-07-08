AnimalApp.controller('headerController', function ($scope, $routeParams, $location,$route, $http) {

  $scope.toggle = function() {
        $scope.mobile_drop = !$scope.mobile_drop;
  };

  $scope.isActive = function (viewLocation) {
     var active = (viewLocation === $location.path());
     return active;
  };


});

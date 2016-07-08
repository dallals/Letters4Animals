AnimalApp.controller('headerController', function ($scope, $routeParams, $location,$route, $http) {

    $scope.toggle = function() {
        $scope.mobile_drop = !$scope.mobile_drop;
    };

    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };


    $scope.registerAddress = function() {
        $scope.addr
        $scope.state
        $scope.zip
        if ($scope.addr && $scope.city && $scope.state && $scope.zip) {
            var address = {
                address: $scope.addr,
                city   : $scope.city,
                state  : $scope.state,
                zip    : $scope.zip };

            $http.post('/addressConfirmation', address).success(function(data) {
                // console.log(data);
                // $scope.confirmedAddr = data;
                if (data == 'Not Found') {
                  // alert(address.address + ' ' + address.state + ' ' + address.zip + ' not found. Please make sure you entered your address correctly.');
                }
                else {
                    if (typeof(data) == 'object') {
                        // Present all the choices and wait for them to pick
                        $scope.choices = data; }
                }
            })
        }
    }
});

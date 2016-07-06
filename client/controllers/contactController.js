AnimalApp.controller('contactController', function ($scope, $routeParams) {
    // Set captcha numbers to two random numbers between 1 and 20, inclusively as well as the captcha answer
    $scope.getCaptcha = function(){
        $scope.first_number =  Math.floor(Math.random() * (20 - 1 + 1)) + 1;
        $scope.second_number =  Math.floor(Math.random() * (20 - 1 + 1)) + 1;
        $scope.captcha_answer = $scope.first_number + $scope.second_number;
    }

    // call function to actually set the captcha numbers
    $scope.getCaptcha();

    $scope.submitContact = function(){
        // Check if captcha errors
        if($scope.contact.captcha != $scope.captcha_answer){
            $scope.captcha_error = "You entered the wrong number in captcha";
        }else{
            $scope.captcha_error = "";
            
        }
    }

});

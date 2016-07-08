AnimalApp.controller('contactController', function ($scope, $routeParams, $http) {
    // Set captcha numbers to two random numbers between 1 and 20, inclusively as well as the captcha answer
    $scope.sweet = {};

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

            $http.post('/contact', $scope.contact).success(function(result){

                swal("Email Sent!", "Your email has been sent to 'info@letters4animals.com' and you will be hearing from us shortly!", "success");

                // reset form after email is sent
                $scope.contact = {};
                $scope.contactForm.$setPristine();
                $scope.contactForm.$setValidity();
            });
        }
    }
});

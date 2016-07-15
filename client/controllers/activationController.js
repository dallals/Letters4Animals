AnimalApp.controller('activationController', function ($scope, $location, $routeParams, $http, UserFactory) {
    var randString = $routeParams.randString;

    console.log('random string is: ', randString);

    UserFactory.confirmUser(randString, function(randString){
        console.log('done');
    });
    // Activate account
    // $http.post('/confirmUser', randString).success(function(data) {
    //
    //     // console.log(data);
    //     // if (callback && typeof callback == 'function') {
    //     //     callback(data);
    //     // }
    //
    //
    // });

});

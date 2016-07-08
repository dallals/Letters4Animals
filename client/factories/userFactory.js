AnimalApp.factory('UserFactory', function($http) {
    var factory = {};

    factory.registerUser = function(user, callback) {
        //Throw to User
        $http.post('/users', user).success(function(data) {
            console.log(data);
        })
        console.log(user);
        if (callback && typeof callback == 'function') {
            callback();
        }
    }

    return factory;
})

AnimalApp.factory('UserFactory', function($http) {
    var factory = {};

    factory.registerUser = function(user, callback) {
        //Throw to User
        $http.post('/users', user).success(function(data) {
            // console.log(data);
            if (callback && typeof callback == 'function') {
                callback(data);
            }
        })
        // console.log(user);
    };
    factory.login = function(user, callback) {
        $http.post('/login', user).success(function(data) {
            callback(data);
        })
    }

    // Grab user by ID, send back user data
    factory.getUser = function(userid, callback) {
        $http.post('/getUserInfo', {userid}).success(function(data) {
            callback(data);
        })
    };

    factory.updateUser = function(userinfo) {
        $http.post('/updateUser', userinfo).success(function(){
            console.log('updated user succesfully');
        })
    };

    return factory;
})

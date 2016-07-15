AnimalApp.factory('UserFactory', function($http) {
    var factory = {};
    var thisUser = null;


    factory.registerUser = function(user, callback) {
        //Throw to User
        $http.post('/users', user).success(function(data) {
            // Returns random string in data.string
            if (callback && typeof callback == 'function') {
                callback(data);
            }
        })
    };

    factory.login = function(user, callback) {
        $http.post('/login', user).success(function(data) {
            callback(data);
        })
    };

    // Manual login status check, to be used on controller loads
    factory.isLoggedIn = function(callback){
        $http.get('/checkLogin').success(function(user){
            if(user.id){
                callback(user);
            }
            else{
                callback('NO');
            }
        });
    };

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

    // Get all users for admin panel
    factory.getAllUsers = function(callback) {
        $http.get('/getAllUsers').success(function(users){
            callback(users);
        })
    };

    // Delete user
    factory.delUser = function(user, callback) {
        $http.post('/delUser', user).success(function(users){
            callback(users);
        })
    };
    return factory;
})

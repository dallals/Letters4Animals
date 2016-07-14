AnimalApp.factory('CauseFactory', function($http) {
    var factory = {};
    var thisCause = null;


    factory.createCause = function(cause, callback) {
        //Throw to cause
        $http.post('/causes', cause).success(function(data) {
            // console.log(data);
            if (callback && typeof callback == 'function') {
                callback(data);
            }
        })
        // console.log(Cause);
    };

    // Grab Cause by ID, send back Cause data
    factory.getCause = function(causeid, callback) {
        $http.post('/getCauseInfo', {causeid}).success(function(data) {
            callback(data);
        })
    };

    factory.updateCause = function(causeinfo) {
        $http.post('/updateCause', causeinfo).success(function(){
            console.log('updated Cause succesfully');
        })
    };
    return factory;
})

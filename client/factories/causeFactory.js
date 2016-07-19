AnimalApp.factory('CauseFactory', function($http) {
    var factory = {};
    var thisCause = null;


    factory.createCause = function(cause, callback) {
        //Throw to cause
        $http.post('/addCause', {cause}).success(function(data) {
            if (callback && typeof callback == 'function') {
                callback(data);
            }
        })
    };

    // Grab Cause by ID, send back Cause data
    factory.getCause = function(causeid, callback) {
        $http.post('/getCauseInfo', {causeid}).success(function(data) {
            callback(data);
        })
    };

    factory.getAllCauses = function(callback) {
        console.log('getting all causes');
        $http.get('/getAllCauses').success(function(causes){
            callback(causes);
        })
    };

    factory.getEnabledCauses = function(callback) {
        $http.get('/getEnabledCauses').success(function(causes) {
            callback(causes);
        })
    }

    factory.disableCause = function(cause, callback) {
        console.log('FACTORY:', cause)
        $http.post('/disableCause', cause).success(function(causes){
            if (callback && typeof callback == 'function') {
                callback(causes);
            }
        })
    }
    factory.enableCause = function(cause, callback) {
    $http.post('/enableCause', cause).success(function(causes){
        if (callback && typeof callback == 'function') {
            callback(causes);
        }
    })
    }

    factory.updateCause = function(causeinfo) {
        $http.post('/updateCause', causeinfo).success(function(){
            console.log('updated Cause succesfully');
        })
    };
    return factory;
})

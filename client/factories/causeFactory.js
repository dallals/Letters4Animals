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

    factory.addSupport = function(supportinfo) {
        $http.post('/addSupport', supportinfo).success(function(){
            console.log('added support succesfully');
        })
    };


    factory.getAllPendingcauses = function(callback) {
        $http.get('/getAllPendingcauses').success(function(pendingcauses){
            callback(pendingcauses);
        })
    };

    factory.getPendingCause = function(id, callback) {
  		$http.get('/pendingCause/'+id).success(function(data) {
        console.log("coming back from factory",data);
  			callback(data);
  		})
  	};

    factory.sendText = function(causeInfo){
       $http.post('/sendText', causeInfo).success(function(twilio){
           console.log(twilio);
       })
    }
    return factory;
})

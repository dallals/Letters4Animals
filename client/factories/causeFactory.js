AnimalApp.factory('CauseFactory', function($http, $location) {
    var factory = {};
    var thisCause = null;

    // Creates a Regular Cause from the Admin Panel
    factory.createCause = function(cause, callback) {
        $http.post('/addCause', cause).success(function(data) {
            callback(data);
            $location.path('/administrator')
        })
    }

    //Creates a pending cause from the VolunteerCause Page
    factory.createPendCause = function(cause, callback) {
        $http.post('/volunteerCause', cause).success(function(data) {
            callback(data);
        })
    };

    // Grab Cause by ID, send back Cause data- for edit/update functionality
    factory.getCause = function(id, callback) {
        $http.get('/getSingleCause/'+id).success(function(data) {
            callback(data);
        })
    };

    // Grabs a single cause for the single cause view page
    factory.getSingleViewCause = function(id, callback) {
        $http.get('/getSingleViewCause/'+id).success(function(data) {
            callback(data);
        })
    };


    // Looks to the supports table to pull user IDs who support a cause id
    factory.getSupporters = function(id, callback) {
        $http.get('/getSupporters/'+id).success(function(data) {
            callback(data);
        })
    };

    // Get guests who support a cause id
    factory.getGuests = function(id, callback) {
        $http.get('/getGuests/'+id).success(function(data) {
            callback(data);
        })
    };

    //Commented out . connects to singleCauseViewController ln 31.Goes to users.js 237
    //Joins with the user table to get user info for those who support a cause
    factory.getCauseUsers = function(id, callback) {
        $http.get('/getCauseUsers/'+id).success(function(data) {
            callback(data);
        })
    };

    // Gets all Causes for the admin panel
    factory.getAllCauses = function(callback) {
        $http.get('/getAllCauses').success(function(causes){
            callback(causes);
        })
    };

    // Gets all Enabled Causes for the admin panel
    factory.getEnabledCauses = function(callback) {
        $http.get('/getEnabledCauses').success(function(causes) {
            callback(causes);
        })
    }

    // Disables cause from the admin panel
    factory.disableCause = function(cause, callback) {
        $http.post('/disableCause', cause).success(function(causes){
            if (callback && typeof callback == 'function') {
                callback(causes);
            }
        })
    }

    //Enables cause from the admin panel
    factory.enableCause = function(cause, callback) {
        $http.post('/enableCause', cause).success(function(causes){
            if (callback && typeof callback == 'function') {
                callback(causes);
            }
        })
    }

    // Updates cause from the admin Panel Edit button
    factory.updateCause = function(causeinfo) {
        $http.post('/updateCause', causeinfo).success(function(){
            console.log('updated Cause succesfully');
        })
    };

    //Deletes Cause from the Admin Panel
    factory.deleteCause = function(cause, callback) {
        $http.post('/deleteCause', cause).success(function(causes) {
            if (callback && typeof callback == 'function') {
                callback(causes);
            }
        })
    }

    //Deletes PendingCause from the Admin Panel
    factory.delPendCause = function(pendingcause, callback) {
        $http.post('/deletePendCause', pendingcause).success(function(pendingcauses) {
            if (callback && typeof callback == 'function') {
                callback(pendingcauses);
            }
        })
    }

    factory.addSupport = function(support) {
        $http.post('/addSupport', support).success(function(){
            console.log('added support succesfully');
        })
    };

    factory.addGuest = function(guest) {
        $http.post('/addGuest', guest).success(function(){
            console.log('added Guest succesfully');
        })
    };

    //Select all Pending Causes to populate the Pending Causes tab of the admin panel
    factory.getAllPendingcauses = function(callback) {
        $http.get('/getAllPendingcauses').success(function(pendingcauses){
            callback(pendingcauses);
        })
    };

    //Select a single Pending Cause to populate the Add/Edit Pending Cause page for the admin panel
    factory.getPendingCause = function(id, callback) {
  		$http.get('/pendingCause/'+id).success(function(data) {
  			callback(data);
  		})
  	};

    factory.sendText = function(causeInfo){
       $http.post('/sendText', causeInfo).success(function(twilio){
           console.log(twilio);
       })
    }

    factory.delCause = function(cause, callback){
        $http.post('/delCause', cause).success(function(causes){
            callback(causes);
        })
    }

    factory.updateCause = function(info, callback){
        $http.post('/updateCause', info).success(function(output){
            callback(output);
            $location.path('/administrator')
        })
    }
    return factory;
})

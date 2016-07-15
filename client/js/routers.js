AnimalApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/home.html'
    })
    .when('/home',{
        templateUrl: 'partials/home.html'
    })
    .when('/aboutus',{
        templateUrl: 'partials/aboutus.html'
    })
    .when('/writealetter',{
        templateUrl: 'partials/writealetter.html'
    })
    .when('/letter-writing-matters',{
        templateUrl: 'partials/lettersmatter.html'
    })
    .when('/links',{
        templateUrl: 'partials/links.html'
    })
    .when('/issues',{
        templateUrl: 'partials/issues.html'
    })
    .when('/issuessec',{
        templateUrl: 'partials/issues.html'
    })
    .when('/contact',{
        templateUrl: 'partials/contact.html'
    })
    .when('/profile',{
        templateUrl: 'partials/profile.html'
    })
    .when('/administrator',{
        templateUrl: 'partials/administrator.html'
    })
    .when('/causeadmin',{
        templateUrl: 'partials/causeadmin.html',
    })
    .when('/letteradmin',{
        templateUrl: 'partials/letteradmin.html',
    })
    .when('/templatesubmission',{
        templateUrl: 'partials/templatesubmission.html',
    })
    .when('/accountactivation/:randString',{
        templateUrl: 'partials/accountactivation.html',
    })
    .when('/test', {        //TESTING USE
        templateUrl: 'partials/test.html'
    })                      //TESTING USE
    .otherwise({
      redirectTo: '/'
    });
});

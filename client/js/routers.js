AnimalApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/home.html',
        access: {restricted: false}
    })
    .when('/home',{
        templateUrl: 'partials/home.html',
        access: {restricted: false}
    })
    .when('/aboutus',{
        templateUrl: 'partials/aboutus.html',
        access: {restricted: false}
    })
    .when('/writealetter',{
        templateUrl: 'partials/writealetter.html',
        access: {restricted: false}
    })
    .when('/letter-writing-matters',{
        templateUrl: 'partials/lettersmatter.html',
        access: {restricted: false}
    })
    .when('/links',{
        templateUrl: 'partials/links.html',
        access: {restricted: false}
    })
    .when('/issues',{
        templateUrl: 'partials/issues.html',
        access: {restricted: false}
    })
    .when('/issuessec',{
        templateUrl: 'partials/issues.html',
        access: {restricted: false}
    })
    .when('/contact',{
        templateUrl: 'partials/contact.html',
        access: {restricted: false}
    })
    .when('/profile',{
        templateUrl: 'partials/profile.html',
        access: {restricted: false}
    })
    .when('/administrator',{
        templateUrl: 'partials/administrator.html',
        access: {restricted: true}
    })
    .when('/test', {        //TESTING USE
        templateUrl: 'partials/test.html'
    })                      //TESTING USE
    .otherwise({
      redirectTo: '/'
    });
});

AnimalApp.config(function ($routeProvider) {
  $routeProvider
    .when('/',{
        templateUrl: 'partials/home.html',
    })
    .when('/aboutus',{
        templateUrl: 'partials/aboutus.html',
    })
    .when('/writealetter',{
        templateUrl: 'partials/writealetter.html',
    })
    .when('/links',{
        templateUrl: 'partials/links.html',
    })
    .when('/issues',{
        templateUrl: 'partials/issues.html',
    })
    .when('/contact',{
        templateUrl: 'partials/contact.html',
    })
    .when('/profile',{
        templateUrl: 'partials/profile.html',
    })
    .otherwise({
      redirectTo: '/'
    });
});

var AnimalApp = angular.module('AnimalApp', ['ngRoute', 'ngMessages', 'ng-sweet-alert']);

// Scrolling animation for header
AnimalApp.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 3) {
                 scope.boolChangeClass = true;
                 $("#main-header").addClass('fixed');
                 $('.left-header').addClass('reduce');
                 $("#menu").addClass('reducemenu');
                 $("#container").addClass('border');
                 $("#logo").animate({
                      width: '50%'},
                      {duration: 400, queue: false
                 });
                 $("#main-header").animate({
                     height:'100px'},
                     {duration: 400, queue: false
                 });
                //  $("#page > div.ng-scope > div").css("padding-top",
            //  "8%");
             } else {
                 scope.boolChangeClass = false;
                 $("#container").removeClass('border');
                 $("#main-header").removeClass('fixed');
                 $('.left-header').removeClass('reduce');
                 $("#menu").removeClass('reducemenu');
                 $("#logo").animate({
                      width: '100%'},
                      {duration: 400, queue: false
                 });
                 $("#main-header").animate({
                     width:'100%',
                     height: '150px'},
                     {duration: 400, queue: false
                 });
             }
            scope.$apply();
        });
    };
});

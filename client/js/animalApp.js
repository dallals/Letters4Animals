var AnimalApp = angular.module('AnimalApp', ['ngRoute', 'ngMessages', 'ng-sweet-alert', 'ui.bootstrap', 'angularUtils.directives.dirPagination','ui.tinymce']);

// Scrolling animation for header
AnimalApp.directive("scroll", function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 3) {
                 scope.boolChangeClass = true;
                 $("#main-header").addClass('fixed');
                 $('.left-header').addClass('reduce');
                 $('#adminheader.ng-scope').removeClass('ng-scope');
                 $('#adminheader').addClass('reduceheader');
                 $("#menu").addClass('reducemenu');
                 $("#container").addClass('border');
                 $("#logo").animate({
                      width: '50%'},
                      {duration: 40, queue: false
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
                 $('#adminheader').addClass('ng-scope');
                 $('#adminheader.ng-scope').removeClass('reduceheader');
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


AnimalApp.directive('showtab',
function () {
        return {
            link: function (scope, element, attrs) {
                $('.nav li a').click(function(e) {
                    e.preventDefault();
                    $(this).tab('show');
                });
            }
        };
    });

var app = angular.module('twitter', ['ngRoute', 'ngSanitize', 'vs-repeat']);
app.run(function ($rootScope, userSession, $location, $interval) {
    "use strict";

    $rootScope.bahar = true;
    $rootScope.feed = 'global';
    $rootScope.exit = function () {
      userSession.exit();
      $location.path('/global');
    };
    $rootScope.gotoProfile = function (userId) {
      $location.path('/profile/' + userId);
    };
    $rootScope.goHome = function (feed) {
      $location.path('/home/' + feed);
    };
    $rootScope.hideNav = function () {
      $rootScope.bahar = true;
    };
    $rootScope.showNav = function () {
      $rootScope.bahar = false;
    };
    $rootScope.load = function () {
      $location.path('/loading');
    };
  })
  
  // Code for route management.
  .config(function ($routeProvider) {
    "use strict";
    $routeProvider.when('/', {
      controller: 'login',
      templateUrl: 'views/login.html'
    })
    .when('/profile/:userId', {
      controller: 'profile',
      templateUrl: 'views/profile.html'
    })
   .when('/home/:feed', {
      controller: 'home',
      templateUrl: 'views/home.html'
    })
    .otherwise({
      redirectTo: '/'
    });
  });
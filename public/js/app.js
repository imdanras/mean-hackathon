var app = angular.module('NewsOfToday', ['ui.router', 'infinite-scroll', 'MissionCtrl']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/404');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'ApiCtrl'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'views/userSignup.html',
      controller: 'SignupCtrl'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'views/userLogin.html',
      controller: 'LoginCtrl'
    })
    .state('profile', {
      url: '/users/:id',
      templateUrl: 'views/userProfile.html',
      controller: 'UsersCtrl'
    })
    .state('404', {
      url: '/404',
      templateUrl: 'views/404.html'
  });

  $locationProvider.html5Mode(true);
}]);

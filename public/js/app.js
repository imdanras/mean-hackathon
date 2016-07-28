var app = angular.module('NewsOfToday', ['ui.router', 'MissionCtrl']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider',
  'authProvider',
  function($stateProvider, $urlRouterProvider, $locationProvider, authProvider) {
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

app.controller('ApiCtrl', ['$scope', '$http', function($scope, $http) {
  console.log('in the controller');

  $scope.userSearch = 'economy';
  // $scope.loadMoreGifs = 10;

  $scope.$watch('userSearch', function(newVal, oldVal) {
    console.log('123 ', $scope.userSearch);
    // Guardian Api
    $http.get('http://content.guardianapis.com/search?', {
      params: {
        'q': $scope.userSearch,
        'api-key': '4cdd2f97-c605-4a74-943d-658610eba365'
      }
    })
    .then(function success(res) {
      console.log('success ', res.data.response.results);
      $scope.results = res.data.response.results;
    }, function error(res) {
      console.log(res.data);
    });
    // New York Times Api
    $http.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
        'q': $scope.userSearch,
        'api-key': 'ce7f37805b464dbfb55e245a5c396f8d'
      }
    })
    .then(function success(res) {
      console.log('success ', res.data.response.docs);
      $scope.resultsNY = res.data.response.docs;
    }, function error(res) {
      console.log(res);
    });
  });

  $scope.searchMoreGuardian = function() {
    console.log('searching news');
    $http.get('http://content.guardianapis.com/search?', {
      params: {
        'q': $scope.userSearch,
        'api-key': '4cdd2f97-c605-4a74-943d-658610eba365'
      }
    })
    .then(function success(res) {
      console.log('success ',res.data.response.results);
      $scope.results = res.data.response.results;
    }, function error(res) {
      console.log(res.data);
    });
  };

  $scope.searchMoreNewYorkTimes = function() {
    console.log('searching news');
    $http.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
        'q': $scope.userSearch,
        'api-key': 'ce7f37805b464dbfb55e245a5c396f8d'
      }
    })
    .then(function success(res) {
      console.log('success ',res.data.response.docs);
      $scope.resultsNY = res.data.response.docs;
    }, function error(res) {
      console.log(res.data);
    });
  };



}]);


//var app = angular.module('MissionCtrl', ['AuthServices']);

app.controller('ApiCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.userSearch = 'Economy';
  $scope.loadMoreGuardian = 10;
  $scope.loadMoreNewYorkTimes = 10;
  $scope.resultsNY = [];
  $scope.results = [];
  $scope.resultsBuzz = [];

  $scope.$watch('userSearch', function(newVal, oldVal) {
    console.log('123 ', $scope.userSearch);
    // Guardian Api
    $http.get('https://content.guardianapis.com/search?', {
      params: {
        'q': $scope.userSearch,
        'api-key': '4cdd2f97-c605-4a74-943d-658610eba365',
        limit: 10
      }
    })
    .then(function success(res) {
      console.log('guardian ', res.data.response.results);
      $scope.results = res.data.response.results;
    }, function error(res) {
      console.log(res.data);
    });
    // New York Times Api
    $http.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
        'q': $scope.userSearch,
        'api-key': 'ce7f37805b464dbfb55e245a5c396f8d',
        'page': 0
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
    console.log('searching news, guardian', $scope.loadMoreGuardian);
    $http.get('https://content.guardianapis.com/search?', {
      params: {
        'q': $scope.userSearch,
        'api-key': '4cdd2f97-c605-4a74-943d-658610eba365',
        limit: $scope.loadMoreGuardian
      }
    })
    .then(function success(res) {
      console.log('success ',res.data.response.results);
      $scope.results = $scope.results.concat(res.data.response.results);
    }, function error(res) {
      console.log(res.data);
    });
  };

  $scope.searchMoreNewYorkTimes = function() {
    console.log('searching news, NYT', $scope.loadMoreNewYorkTimes);
    $http.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params: {
        'q': $scope.userSearch,
        'api-key': 'ce7f37805b464dbfb55e245a5c396f8d',
        'page': $scope.loadMoreNewYorkTimes
      }
    })
    .then(function success(res) {
      console.log('success ',res.data.response.docs);
      $scope.resultsNY = $scope.resultsNY.concat(res.data.response.docs);
    }, function error(res) {
      console.log(res.data);
    });
  };

  $scope.loadMoreNews = function() {
    $scope.loadMoreNewYorkTimes += 1;
    $scope.loadMoreGuardian += 5;
    $scope.searchMoreGuardian();
    $scope.searchMoreNewYorkTimes();
  };

}])
.controller('ShowCtrl', ['$scope', '$stateParams', 'Post', function($scope, $stateParams, Post) {
  $scope.post = {};

  Post.get({ id: $stateParams.id }, function success(data) {
    $scope.post = data;
  }, function error(data) {
    console.log(data);
  });
}])
.controller('NewCtrl', ['$scope', '$location', 'Post', function($scope, $location, Post) {
  $scope.post = {
    title: '',
    snippet: '',
    image: ''
  };

  $scope.createPost = function() {
    Post.save($scope.post, function success(data) {
      $location.path('/');
    }, function error(data){
      console.log(data);
    });
  };
}])
.controller('NavCtrl', ['$scope', 'Auth', function($scope, Auth) {
  $scope.Auth = Auth;

  $scope.logout = function() {
    Auth.removeToken();
    console.log('My token: ', Auth.getToken());
  };
}])
.controller('SignupCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.userSignup = function() {
    $http.post('/api/users', $scope.user).then(function success(res) {
      $location.path('/');
    }, function error(res) {
      // console.log(res);
    });
  };
}])
.controller('LoginCtrl', ['$scope', '$http', '$location', 'Auth', function($scope, $http, $location, Auth) {
  $scope.user = {
    email: '',
    password: ''
  };

  $scope.userLogin = function() {
    $http.post('/api/auth', $scope.user).then(function success(res) {
      Auth.saveToken(res.data.token);
      console.log('Token: ', res.data.token);
      $location.path('/');
    }, function error(res) {
      console.log(data);
    });
  };
}]);

'use strict';

angular.module('mean.memos').config(['$stateProvider',
  function($stateProvider) {
    // Check if the user is connected
    var checkLoggedin = function($q, $timeout, $http, $location) {
      // Initialize a new promise
      var deferred = $q.defer();

      // Make an AJAX call to check if the user is logged in
      $http.get('/loggedin').success(function(user) {
        // Authenticated
        if (user !== '0') $timeout(deferred.resolve);

        // Not Authenticated
        else {
          $timeout(deferred.reject);
          $location.url('/login');
        }
      });

      return deferred.promise;
    };

    $stateProvider
    .state('list', {
      url: '/memos',
      templateUrl: 'memos/views/list.html',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .state('create', {
      url: '/memos/create',
      templateUrl: 'memos/views/create.html',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .state('edit', {
      url: '/memos/:memoId/edit',
      templateUrl: 'memos/views/edit.html',
      resolve: {
        loggedin: checkLoggedin
      }
    })
    .state('view', {
      url: '/memos/:memoId',
      templateUrl: 'memos/views/view.html',
      resolve: {
        loggedin: checkLoggedin
      }
    });
  }
]);

'use strict';

angular.module('mean.bookmarks').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('all bookmarks', {
      url: '/bookmarks',
      templateUrl: 'bookmarks/views/index.html'
    });
  }
]);

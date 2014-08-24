'use strict';

angular.module('mean.bookmarks').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('bookmarks example page', {
      url: '/bookmarks/example',
      templateUrl: 'bookmarks/views/index.html'
    });
  }
]);

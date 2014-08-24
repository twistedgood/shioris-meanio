'use strict';

angular.module('mean.bookmarks').controller('BookmarksController', ['$scope', 'Global', 'Bookmarks',
  function($scope, Global, Bookmarks) {
    $scope.global = Global;
    $scope.package = {
      name: 'bookmarks'
    };
  }
]);

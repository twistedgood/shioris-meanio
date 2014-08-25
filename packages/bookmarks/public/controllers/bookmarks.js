'use strict';

angular.module('mean.bookmarks').controller('BookmarksController', ['$scope', 'Global', 'Bookmarks',
  function($scope, Global, Bookmarks) {
    $scope.global = Global;
    $scope.package = {
      name: 'bookmarks'
    };

    $scope.find = function() {
      Bookmarks.query(function(bookmarks) {
        $scope.bookmarks = bookmarks;
        $scope.url = '';
      });
    };

    $scope.search = function() {
      Bookmarks.query({q: this.searchTerm}, function(bookmarks) {
        $scope.bookmarks = bookmarks;
      });
    };

    $scope.create = function() {
      if (!this.url) {
        return;
      }
      var bookmark = new Bookmarks({
        url: this.url,
      });
      bookmark.$save(function(response) {
        $scope.bookmarks.unshift(response);
      });
      this.url = '';
    };

    $scope.remove = function(bookmark) {
      if (bookmark) {
        bookmark.$remove();

        for (var i in $scope.bookmarks) {
          if ($scope.bookmarks[i] === bookmark) {
            $scope.bookmarks.splice(i, 1);
          }
        }
      }
    };
  }
]);

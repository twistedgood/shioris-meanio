'use strict';

angular.module('mean.memos').controller('MemosController', ['$scope', '$stateParams', '$location', 'Global', 'Memos',
  function($scope, $stateParams, $location, Global, Memos) {
    $scope.global = Global;

    $scope.hasAuthorization = function(memo) {
      if (!memo || !memo.user) return false;
      return $scope.global.isAdmin || memo.user._id === $scope.global.user._id;
    };

    $scope.create = function(isValid) {
      if (isValid) {
        var memo = new Memos({
          title: this.title,
          content: this.content
        });
        memo.$save(function(response) {
          $location.path('memos/' + response._id);
        });

        this.title = '';
        this.content = '';
      } else {
        $scope.submitted = true;
      }
    };

    $scope.remove = function(memo) {
      if (memo) {
        memo.$remove();

        for (var i in $scope.memos) {
          if ($scope.memos[i] === memo) {
            $scope.memos.splice(i, 1);
          }
        }
      } else {
        $scope.memo.$remove(function(response) {
          $location.path('memos');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var memo = $scope.memo;
        if (!memo.updated) {
          memo.updated = [];
        }
        memo.updated.push(new Date().getTime());

        memo.$update(function() {
          $location.path('memos/' + memo._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Memos.query(function(memos) {
        $scope.memos = memos;
      });
    };

    $scope.findOne = function() {
      Memos.get({
        memoId: $stateParams.memoId
      }, function(memo) {
        $scope.memo = memo;
      });
    };
  }
]);

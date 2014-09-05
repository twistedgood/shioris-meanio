'use strict';

angular.module('mean.memos').factory('Memos', ['$resource',
  function($resource) {
    return $resource('memos/:memoId', {
      memoId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);

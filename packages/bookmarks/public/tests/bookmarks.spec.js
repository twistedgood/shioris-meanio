'use strict';

(function() {
  describe('MEAN controllers', function() {
    describe('BookmarksController', function() {
      beforeEach(function() {
        this.addMatchers({
          toEqualData: function(expected) {
            return angular.equals(this.actual, expected);
          }
        });
      });

      beforeEach(function() {
        module('mean');
        module('mean.system');
        module('mean.bookmarks');
      });

      // Initialize the controller and a mock scope
      var BookmarksController,
        scope,
        $httpBackend,
        $stateParams,
        $location,
        Bookmarks;

      beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_, _Bookmarks_) {
        scope = $rootScope.$new();
        BookmarksController = $controller('BookmarksController', {
          $scope: scope
        });
        $stateParams = _$stateParams_;
        $httpBackend = _$httpBackend_;
        $location = _$location_;
        Bookmarks = _Bookmarks_;
      }));

      it('should fetch bookmarks', function() {
        $httpBackend.expectGET('bookmarks').respond([{
          url: 'http://example.com',
          title: 'Example Domain'
        }]);
        scope.find();
        $httpBackend.flush();
        expect(scope.bookmarks).toEqualData([{
          url: 'http://example.com',
          title: 'Example Domain'
        }]);
      });

      it('should search bookmarks', function() {
        $httpBackend.expectGET('bookmarks?q=foo+bar').respond([{
          url: 'http://example.com',
          title: 'Example Domain'
        }]);
        scope.searchTerm = 'foo bar';
        scope.search();
        $httpBackend.flush();
        expect(scope.bookmarks).toEqualData([{
          url: 'http://example.com',
          title: 'Example Domain'
        }]);
      });

      it('should add a bookmark', function() {
        $httpBackend.expectPOST('bookmarks', {
          url: 'http://example.com'
        }).respond(201, {
          url: 'http://example.com',
          title: 'Example Domain'
        });
        scope.bookmarks = [
          new Bookmarks({
            url: 'http://test.test',
            title: 'Test'
          })
        ];
        scope.url = 'http://example.com';
        scope.create();
        $httpBackend.flush();
        expect(scope.bookmarks.length).toEqual(2);
        expect(scope.bookmarks[0].title).toEqual('Example Domain');
        expect(scope.bookmarks[1].title).toEqual('Test');
      });

      it('should not add a bookmark when url is empty', function() {
        scope.bookmarks = [];
        scope.url = '';
        scope.create();
        expect(scope.bookmarks.length).toEqual(0);
      });

      it('should delete a bookmark', function() {
        $httpBackend.expectDELETE('bookmarks/2').respond(204);
        scope.bookmarks = [
          new Bookmarks({
            _id: 1,
            url: 'http://test1.test',
            title: 'Test 1'
          }),
          new Bookmarks({
            _id: 2,
            url: 'http://test2.test',
            title: 'Test 2'
          }),
          new Bookmarks({
            _id: 3,
            url: 'http://example.com',
            title: 'Example Domain'
          })
        ];
        scope.remove(scope.bookmarks[1]);
        $httpBackend.flush();
        expect(scope.bookmarks.length).toEqual(2);
        expect(scope.bookmarks[1].title).toEqual('Example Domain');
      });

      it('should not delete a bookmark when bookmark is empty', function() {
        scope.bookmarks = [
          new Bookmarks({
            _id: 1,
            url: 'http://example.com',
            title: 'Example Domain'
          })
        ];
        scope.remove(null);
        expect(scope.bookmarks.length).toEqual(1);
      });

    });
  });
}());

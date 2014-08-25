'use strict';

var bookmarks = require('../controllers/bookmarks');

// Bookmark authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.bookmark.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Bookmarks, app, auth) {

  app.route('/bookmarks')
    .get(bookmarks.all)
    .post(auth.requiresLogin, bookmarks.create);
  app.route('/bookmarks/:bookmarkId')
    .get(bookmarks.show)
    .put(auth.requiresLogin, hasAuthorization, bookmarks.update)
    .delete(auth.requiresLogin, hasAuthorization, bookmarks.destroy);

  // Finish with setting up the bookmarkId param
  app.param('bookmarkId', bookmarks.bookmark);
};

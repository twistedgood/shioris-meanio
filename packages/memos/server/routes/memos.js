'use strict';

var memos = require('../controllers/memos');

// memo authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && req.memo.user.id !== req.user.id) {
    return res.send(401, 'User is not authorized');
  }
  next();
};

module.exports = function(Memos, app, auth) {

  app.route('/memos')
    .get(memos.all)
    .post(auth.requiresLogin, memos.create);
  app.route('/memos/:memoId')
    .get(memos.show)
    .put(auth.requiresLogin, hasAuthorization, memos.update)
    .delete(auth.requiresLogin, hasAuthorization, memos.destroy);

  // Finish with setting up the memoId param
  app.param('memoId', memos.memo);
};

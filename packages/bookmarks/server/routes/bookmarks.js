'use strict';

// The Package is past automatically as first parameter
module.exports = function(Bookmarks, app, auth, database) {

  app.get('/bookmarks/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/bookmarks/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/bookmarks/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/bookmarks/example/render', function(req, res, next) {
    Bookmarks.render('index', {
      package: 'bookmarks'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};

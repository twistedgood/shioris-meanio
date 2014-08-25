'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Bookmark = mongoose.model('Bookmark'),
  _ = require('lodash');

var Q = require('q');
var request = require('request');
var cheerio = require('cheerio');
var jschardet = require('jschardet');
var Iconv = require('iconv').Iconv;

/**
 * Find bookmark by id
 */
exports.bookmark = function(req, res, next, id) {
  Bookmark.load(id, function(err, bookmark) {
    if (err) return next(err);
    if (!bookmark) return next(new Error('Failed to load bookmark ' + id));
    req.bookmark = bookmark;
    next();
  });
};

/**
 * Create an bookmark
 */
exports.create = function(req, res) {
  var convert = function(text) {
    var detected = jschardet.detect(text);
    var iconv = new Iconv(detected.encoding, 'UTF-8//TRANSLIT//IGNORE');
    return iconv.convert(text).toString();
  };

  var bookmark = new Bookmark(req.body);

  Q.nfcall(request.get, {
    url: req.param('url'),
    encoding: 'binary',
    timeout: 3000
  })
  .spread(function(response, body) {
    var $ = cheerio.load(convert(new Buffer(body, 'binary')));
    bookmark.title = $('title').text();
    bookmark.content = $.root().text().replace(/<|>/g, '');
    bookmark.description = $('meta[name=description]').attr('content');
    bookmark.user = req.user;
    bookmark.save();
  })
  .then(function() {
    return res.json(201, bookmark);
  })
  .catch(function(err) {
    return res.json(500, {
      error: 'Cannot save the bookmark'
    });
  })
  .done();
};

/**
 * Update an bookmark
 */
exports.update = function(req, res) {
  var bookmark = req.bookmark;

  bookmark = _.extend(bookmark, req.body);

  bookmark.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the bookmark'
      });
    }
    res.json(bookmark);

  });
};

/**
 * Delete an bookmark
 */
exports.destroy = function(req, res) {
  var bookmark = req.bookmark;

  bookmark.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the bookmark'
      });
    }
    res.json(bookmark);

  });
};

/**
 * Show an bookmark
 */
exports.show = function(req, res) {
  res.json(req.bookmark);
};

/**
 * List of Bookmarks
 */
exports.all = function(req, res) {
  var query = Bookmark.find();
  if (req.param('q')) {
    _.each(req.param('q').split(/\s+/), function(q) {
      var regExp = new RegExp(q, 'i');
      query.or([{url: regExp}, {content: regExp}]);
    });
  }
  query.sort('-created').populate('user', 'name username').exec(function(err, bookmarks) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the bookmarks'
      });
    }
    res.json(bookmarks);

  });
};

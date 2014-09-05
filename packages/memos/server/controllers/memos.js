'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Memo = mongoose.model('Memo'),
  _ = require('lodash');


/**
 * Find memo by id
 */
exports.memo = function(req, res, next, id) {
  Memo.load(id, function(err, memo) {
    if (err) return next(err);
    if (!memo) return next(new Error('Failed to load memo ' + id));
    req.memo = memo;
    next();
  });
};

/**
 * Create an memo
 */
exports.create = function(req, res) {
  var memo = new Memo(req.body);
  memo.user = req.user;

  memo.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot save the memo'
      });
    }
    res.json(memo);

  });
};

/**
 * Update an memo
 */
exports.update = function(req, res) {
  var memo = req.memo;

  memo = _.extend(memo, req.body);

  memo.save(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot update the memo'
      });
    }
    res.json(memo);

  });
};

/**
 * Delete an memo
 */
exports.destroy = function(req, res) {
  var memo = req.memo;

  memo.remove(function(err) {
    if (err) {
      return res.json(500, {
        error: 'Cannot delete the memo'
      });
    }
    res.json(memo);

  });
};

/**
 * Show an memo
 */
exports.show = function(req, res) {
  res.json(req.memo);
};

/**
 * List of Memos
 */
exports.all = function(req, res) {
  Memo.find().sort('-created').populate('user', 'name username').exec(function(err, memos) {
    if (err) {
      return res.json(500, {
        error: 'Cannot list the memos'
      });
    }
    res.json(memos);

  });
};

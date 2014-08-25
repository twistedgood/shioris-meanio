'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


/**
 * Bookmark Schema
 */
var BookmarkSchema = new Schema({
  created: {
    type: Date,
    default: Date.now
  },
  url: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: false,
    trim: true
  },
  content: {
    type: String,
    required: false,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

/**
 * Validations
 */
BookmarkSchema.path('url').validate(function(url) {
  return !!url;
}, 'URL cannot be blank');

/**
 * Statics
 */
BookmarkSchema.statics.load = function(id, cb) {
  this.findOne({
    _id: id
  }).populate('user', 'name username').exec(cb);
};

mongoose.model('Bookmark', BookmarkSchema);

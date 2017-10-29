'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema = new Schema({
  url:{ type:String, default:'' },
  category: {
    type: [{
      type: String,
      enum: ['venue', 'food', 'drink']
    }],
    default: []
  }
});

module.exports = mongoose.model('Image', imageSchema);

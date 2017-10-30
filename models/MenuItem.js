'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var menuItemSchema = new Schema({
  storeId:{ type:String, required:true },
  itemName:{ type:String, required:true},
  price:{type: Number, required:true},
  imageUrl:{type:String, default: ''},
  description:{type:String, default:''},
  category: {
    type: [{
      type: String,
      enum: ['coffee', 'tea', 'drink', 'other']
    }],
    default: ['other']
  }
});



module.exports = mongoose.model('Menu', menuItemSchema);

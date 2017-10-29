'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Image = require('./Image');
var Address = require('./Address');

var storeSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the Store'
  },
  address:{
    addr1:{ type: String, default: "" },
    addr2:{ type: String, default: "" },
    city:String,
    state:{ type: String, maxlength: 2, default: 'CA' },
    postalCode: { type: String, maxlength: 9, default: "" },
    country: { type: String, default: "" }
  },
  coordinates:{
    lng:Number,
    lat:Number
  },
  website:{ type: String, default:"" },
  tel:{ type: String, maxlength: 10, default: "" },
  /*hours:[{
    day:Number,
    start:Date,
    end:Date
  }],*/
  /*hours: {
    type: [{
      day:{type:Number},
      start:{type:Date},
      end:{type:Date}
    }]
  },*/
  category: {
    type: [{
      type: String,
      enum: ['n/a', 'coffee', 'tea', 'boba']
    }],
    default: ['n/a']
  },
  images: {
    type: [{
      type: Schema.Types.Mixed,
      default: new Image
    }]
  },
  Updated_date: {
    type: Date,
    default: Date.now
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  claimed:{
    type:Boolean,
    default:false
  },
  published:{
    type:Boolean,
    deafult:false
  },
  status: {
    type: [{
      type: String,
      enum: ['unclaimed', 'claimed', 'ongoing', 'published']
    }],
    default: ['unclaimed']
  }
});

module.exports = mongoose.model('Store', storeSchema);

'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the Store'
  },
  address:{
    addr1:String,
    addr2:String,
    city:String,
    state:{ type: String, maxlength: 2, default:'CA' },
    postalCode: { type: String, maxlength: 9 },
    country: String
  },
  coordinates:{
    lng:Number,
    lat:Number
  },
  website:{
    type:String
  },
  tel:{ type: String, maxlength: 10 },
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
  }
  published:{
    type:Boolean,
    deafult:false
  }
  status: {
    type: [{
      type: String,
      enum: ['unclaimed', 'claimed', 'ongoing', 'published']
    }],
    default: ['unclaimed']
  }
});

module.exports = mongoose.model('Store', storeSchema);

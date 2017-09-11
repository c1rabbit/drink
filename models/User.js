'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storeSchema = new Schema({
  f_name:{
    type:String
  },
  l_name:{
    type:String
  },
  email:{
    type:String
  },
  dob:{
    type:Date
  },
  login:{
    pw:{
      type:String
    },
    pwTemp:{
      type:String
    },
    pwForgot:{
      type:Boolean,
      default:false
    },
    loginAttempt:{
      type:Number,
      default:0
    },
    active:{
      type:Boolean,
      default:true
    }
  }

});

module.exports = mongoose.model('User', storeSchema);

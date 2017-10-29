'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var addressSchema = new Schema({
  addr1:{ type: String, default: "" },
  addr2:{ type: String, default: "" },
  city:String,
  state:{ type: String, maxlength: 2, default: 'CA' },
  postalCode: { type: String, maxlength: 9, default: "" },
  country: { type: String, default: "" }

});

module.exports = mongoose.model('Address', addressSchema);

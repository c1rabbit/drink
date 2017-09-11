var User = require('../models/User');
var config = require('config');
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);

exports.getAll = function(req, res){
  User.find(function(err, users){
    if(err)
      res.send(err);
    res.json(users);
  });
};

exports.get = function(req, res){
  User.findOne(req.params, function(err, user){
    if(err)
      res.send(err);
    res.json(user);
  })
};

exports.create = function(req, res){
  let myUser = new User();
  myUser.f_name = req.body.fName;
  myUser.l_name = req.body.lName;
  myUser.email = req.body.email;
  myUser.dob = req.body.dob;
  myUser.login.pwTemp = bcrypt.hashSync("B4c0/\/", salt);

  res.json();
}

exports.updateOne = function(req, res) {
  User.findOneAndUpdate(req.params, req.body,  function(err, result) {
      if (err)
        res.send(err);
      res.json(result);
  });
};

exports.delete = function(req, res){
  User.remove(req.params, function(req, response){
    if (err)
      res.send(err);
    res.json(result);
  });
};

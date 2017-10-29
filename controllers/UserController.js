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
  if(req.body.pw1 != req.body.pw2){
    return res.render('result', {
      title:'Error',
      message:"Password doesn't match"
    });
  }

  let myUser = new User();
  myUser.f_name = req.body.fName;
  myUser.l_name = req.body.lName;
  myUser.email = req.body.email;
  myUser.login.pw = bcrypt.hashSync(req.body.pw1, salt);
//find unique
  User.create(
    myUser
  , function(err, result){
    if(err)
      return res.send(err);
    if(req.query.json == true){
      return res.json(result);
    }else{
      return res.render('result', {
        title:'Confirmation',
        message:'Login Created',
        redirect:{
          url:'/',
          text:'Login'
        }
      });
    }
  });

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

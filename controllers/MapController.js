var Store = require('../models/Store');

exports.list = function(req, res) {
  if( !req.lng || !req.lng){
    res.json('invalid request');
  }
  
  Store.find(function(err, stores) {
      if (err)
          res.send(err);
      res.json(stores);
  });
};

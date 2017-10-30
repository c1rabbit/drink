var express = require('express');
var router = express.Router();
var StoreController = require('../controllers/StoreController');
var UserController = require('../controllers/UserController');
var config = require('config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/store',StoreController.getAll);
router.get('/store/:_id',StoreController.get);

router.get('/find-store',function(req, res, next){
  res.render('stores/find-store', {
    title: 'Find Store',
    publicApiKey: config.get('Maps.publicApiKey'),
    lat:config.get('Maps.defaultCenterCoords.lat'),
    lng:config.get('Maps.defaultCenterCoords.lng')
  });
} );
router.get('/find-stores',StoreController.find);




/*
* User Controller
*/
router.get('/register', function(req, res, next){
  res.render('users/register', {title: 'Register'});
})
router.post('/register', UserController.create);
router.get('/users', UserController.getAll);
router.get('/users/:id', UserController.get);

module.exports = router;

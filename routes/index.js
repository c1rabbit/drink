var express = require('express');
var router = express.Router();
var StoreController = require('../controllers/StoreController');
var UserController = require('../controllers/UserController');
var config = require('config');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stores',StoreController.getAll);
router.get('/stores/:_id',StoreController.get);
router.post('/stores',StoreController.create);
router.put('/stores/:_id',StoreController.updateOne);
router.delete('/stores/:_id',StoreController.delete);

router.get('/find-store',function(req, res, next){
  res.render('stores/find-store', {
    title: 'Find Store',
    publicApiKey: config.get('Maps.publicApiKey'),
    lat:config.get('Maps.defaultCenterCoords.lat'),
    lng:config.get('Maps.defaultCenterCoords.lng')
  });
} );
router.get('/find-stores',StoreController.find);


router.get('/search-address', function(req, res, next) {
  res.render('stores/search-address', { title: 'Search Address' });
});
router.get('/validate-address', StoreController.validateAddress);
router.get('/add-store', function(req, res, next) {
  res.render('stores/add-store', { title: 'Add Store' });
});


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

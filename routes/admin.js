var express = require('express');
var router = express.Router();
var config = require('config');
var StoreController = require('../controllers/StoreController');

/* http://hostname/admin/ */
/*router.get('/', function(req, res, next) {
  res.render('index-admin', { title: 'Admin' });
});*/

router.get('/',StoreController.recentlyAdded);
router.get('/all-stores',StoreController.getAll);

router.get('/store',StoreController.getAll);
router.get('/store/:_id',StoreController.get);
router.post('/store',StoreController.create);
router.get('/store/:_id/edit',StoreController.edit);
router.put('/store/:_id',StoreController.updateOne);
router.delete('/store/:_id',StoreController.delete);

router.get('/search-address', function(req, res, next) {
  res.render('stores/search-address', { title: 'Search Address' });
});
router.get('/validate-address', StoreController.validateAddress);
router.get('/add-store', function(req, res, next) {
  res.render('stores/add-store', { title: 'Add Store' });
});


router.get('/find-store',function(req, res, next){
  res.render('stores/find-store', {
    title: 'Find Store',
    publicApiKey: config.get('Maps.publicApiKey'),
    lat:config.get('Maps.defaultCenterCoords.lat'),
    lng:config.get('Maps.defaultCenterCoords.lng')
  });
} );
router.get('/find-stores',StoreController.find);

module.exports = router;

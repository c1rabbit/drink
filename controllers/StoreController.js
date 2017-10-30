var Store = require('../models/Store');
var MenuItem = require('../models/MenuItem');
var config = require('config');
var numeral = require('numeral');

exports.getAll = function(req, res) {
  Store.find(function(err, stores) {
      if (err)
        return res.send(err);
      return res.json(stores);
  });
};

exports.get = function(req, res) {
  Store.findOne(req.params, function(err, store) {
      if (err)
        return res.send(err);
      if(req.query.json == true){
        return res.json(store);
      }else{
        return res.render('stores/view-store', {store:store});
      }
  });
};

exports.recentlyAdded = function(req, res){
  Store.find()
    .sort({'Created_date':-1})
    .limit(10)
    .exec(function(err, stores){
      if(err)
        return res.send(err);
      return res.render('index-admin', {stores});
  });
};

exports.find = function(req, res){
  // one degree lattitude is approx 69miles
  // one mile ~ .01 deg
  console.log(req.query.distance);
  const latRange = .01 * req.query.distance;//~5mi
  const lngRange = .01 * req.query.distance;

  let latLower = parseFloat(req.query.lat) - latRange;
  let latUpper = parseFloat(req.query.lat) + latRange;
  let lngLower = parseFloat(req.query.lng) - lngRange;
  let lngUpper = parseFloat(req.query.lng) + lngRange;

  //console.log(lngUpper);
  Store.find()
   .where('coordinates.lat').gt(latLower).lt(latUpper)
   .where('coordinates.lng').gt(lngLower).lt(lngUpper)
   .exec(function(err, stores) {
      if (err)
          res.send(err);
      if(req.query.json == true){
        res.json(stores);
      }else {
        return res.render('stores/find-store', {
          title:"stores found",
          stores, stores,
          lat: req.query.lat,
          lng: req.query.lng,
          publicApiKey: config.get('Maps.publicApiKey')
        });
      }
  });

}

exports.create = function(req, res) {
  let myStore = new Store();
  myStore.name = req.body.storeName;
  myStore.address = {
    addr1: req.body.addr1,
    addr2: req.body.addr2,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
    country: req.body.country,
  }
  myStore.coordinates = {
    lat: req.body.lat,
    lng: req.body.lng
  }
  myStore.website = req.body.website;
  myStore.tel = req.body.tel;

  console.log(myStore);

  Store.create(
    myStore
  , function(err, result) {
      if (err)
        res.send(err);
      res.json(result);
  });
};

exports.edit = function(req, res) {
  Store.findOne(req.params, req.body,  function(err, store) {
      if (err)
        res.send(err);
      res.render('stores/edit-store-home', {store:store});
  });
};

// TODO filter only business info to edit
exports.editInfo = function(req, res) {
  Store.findOne(req.params, req.body,  function(err, store) {
      if (err)
        res.send(err);
      res.render('stores/edit-store-info', {store:store});
  });
};

// TODO filter only business menu to edit
exports.editMenu = function(req, res) {
  Store.findOne(req.params, req.body,  function(err, store) {
      if (err)
        res.send(err);
      res.render('stores/edit-store-menu', {numeral, store:store});
  });
};

exports.updateOne = function(req, res) {
  Store.findOneAndUpdate(req.params, req.body, {new:true},  function(err, result) {
      if (err)
        res.send(err);
      res.render('success', {
        message: 'Store info has been updated!',
        detail: "Store Name: " + result.name,
        redirect: "/admin/"
      });
  });
};

exports.addMenuItem = function(req, res) {

  Store.findOne(req.params).then(function(store){

      console.log(req.body);
      console.log("before:" + store);
      let menuItem = new MenuItem;
      console.log(req.body.name);
      menuItem.itemName = req.body['menu.MenuItem.itemName'];
      menuItem.price = req.body['menu.MenuItem.price'];
      menuItem.description = req.body['menu.MenuItem.description'];
      store.menu.push({MenuItem:menuItem});
      store.save();
console.log("after:" + store);
      return store;

      //

      //console.log("menu:" + store.menu);
      //let menuItem = new MenuItem();
      //menuItem.name = req.body.name;
      //console.log(req.body.name);
      //store.menu.push( new MenuItem());

      //console.log(store);
      //store.save();
    /*  return res.render('success', {
        message: 'Menu has been updated!',
        detail: "Store Name: " + store.name,
        redirect: "/admin/store/menu/" + store.id
      });*/

    }).then(function(store){
      console.log('saving:' + store._id);
      //console.log('store:' + store);
      Store.findOneAndUpdate({_id:store._id}, store, {new:true}, function(err, result){
        if(err)
          return res.send(err);
        return res.render('success', {
          message: 'Menu has been updated!',
          detail: "Store Name: " + store.name,
          redirect: "/admin/store/menu/edit/" + store._id
        });
      });
    }).catch(function(err){
      console.log(err);
      return res.send(err);
    });

  /*Store.findOneAndUpdate(req.params, req.body, {new:true},  function(err, result) {
      if (err)
        res.send(err);
      res.render('success', {
        message: 'Store info has been updated!',
        detail: "Store Name: " + result.name,
        redirect: "/admin/"
      });
  });*/
};


exports.delete = function(req, res) {
  if(req.method === 'GET'){
    Store.findOne(req.params, req.body, function(err, store){
      if (err)
        return res.send(err);
      return res.render('stores/delete-store', {store:store});
    })
  }else{
    Store.remove(req.params, function(err, result) {
        if (err)
          return res.send(err);
        return res.render('success', {
          message: 'Store has been deleted!',
          detail: '',
          redirect: '/admin/'

        });
    });
  }
};

exports.validateAddress = function(req, response){
  const config = require('config');
  const https = require('https');

  const apiKey = config.get('Maps.apiKey');
  const baseUrl = config.get('Maps.baseUrl');
  const publicApiKey = config.get('Maps.publicApiKey');

  let address = req.query.address;
  let city = req.query.city;
  let state = req.query.state;
  let postalCode = req.query.postalCode;

  let query = '?address=' + address + ',' + city + ","+ state +","+ postalCode;

  console.log('google maps address query:' + query);

  https.get(baseUrl + query + '&key=' + apiKey, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error('Request Failed.\n' +
                        `Status Code: ${statusCode}`);
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error('Invalid content-type.\n' +
                        `Expected application/json but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // consume response data to free up memory
      res.resume();
      return;
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        console.log(JSON.stringify(parsedData));
        let myAddress = parseGoogleAddress(parsedData);
        return response.render('stores/add-store', {title:"Add Store", address: myAddress, apiKey: publicApiKey});
        //response.json(parsedData);
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
};

function parseGoogleAddress(json){
  console.log('parsing google address...');
  let address = {
    streetNum:findGoogleAddressComponent(json.results[0].address_components,'street_number','long_name'),
    streetRoute:findGoogleAddressComponent(json.results[0].address_components,'route','long_name'),
    city:findGoogleAddressComponent(json.results[0].address_components,'locality','long_name'),
    county: findGoogleAddressComponent(json.results[0].address_components,'administrative_area_level_2','long_name'),
    state:findGoogleAddressComponent(json.results[0].address_components,'administrative_area_level_1','short_name'),
    postalCode:findGoogleAddressComponent(json.results[0].address_components,'postal_code','long_name'),
    country:findGoogleAddressComponent(json.results[0].address_components,'country','short_name'),
    formattedAddress:json.results[0].formatted_address,
    location:{
      lat:json.results[0].geometry.location.lat,
      lng:json.results[0].geometry.location.lng
    }
  }
  console.log("address to save:" + address);
  return address;
}

function findGoogleAddressComponent(components, component_type, attribute){
  for (let i = 0; i< components.length; i++){
    if( components[i].types.includes(component_type) ){
      return components[i][attribute];
    }
  }
  return null;
}

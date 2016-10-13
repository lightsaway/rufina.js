var express = require('express');
var router = express.Router();
const storage = require('../storage');

/* GET instances array. */
router.get('/instances', function(req, res, next) {
  res.json(storage.getInstances(req.query));
});

/* GET single instance */
router.get('/instances/:id', function(req, res, next) {
  const instance = storage.getInstance(req.params.id);
  if(instance){
    res.json(storage.getInstance( {id: req.params.id }));
  }
  else{
    res.status(404).json( {message: "Not Found"} );
  }
});

/* UNREGISTER single instance */
router.delete('/instances/:id', function(req, res, next) {
  const isDeleted = storage.deleteInstance(req.params.id);
  if(isDeleted){
    res.status(204).json( {id: req.params.id, message:"Deleted"});
  }
  else{
    res.status(404).json( {message: "Not Found"} );
  }
});


/* POST single instance */
router.post('/instances', function(req, res, next) {
  storage.storeInstance(req.body);
  res.status(201).json( {message:"registered"});
});


module.exports = router;

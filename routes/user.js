var router = require('express').Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/report');
var event = require('../models/event_schema');
var pills = require('../models/pill_schema');

router.get('/login', function(req, res) {
  res.render('pages/login');
});
router.get('/AmbulanceGo', function(req, res) {
  res.render('AmbulanceGo')
})
//ambulancego routing
router.get('/hospital', function(req, res) {
  res.render('hospital')
})
//hospital routing
router.get('/pill', function(req, res) {
  var query = pills.find()
  console.log("Hello")
  query.select('medicine days dosage');
  query.exec((err,data) => {
    console.log(data);
    res.render('pill_rem',{"datas":data});
  })
});
//pill page routing
router.post('/pillForm', function(req, res) {
  console.log(req.body);
  res.render('pill');
});
//pill form routing
router.get('/pillForm', (req, res)=> {
  res.render('pill_form')
});
//pill form routing
router.get('/enter', (req, res)=> {
  res.render('add')
});
//event form routing
router.get('/events', function(req, res) {

  var query = event.find()
  console.log("Hello")
  query.select('title body din');
  query.exec((err,data) => {
     console.log(data);
    res.render('events',{"datas":data});
})
})
// events get routing
router.post('/events', function(req, res) {
  console.log(req.body);
  let newEvent = new event(req.body);
  console.log(newEvent);
  newEvent.save()
  .then(function() {
    var query = event.find()
    console.log("Hello")
    query.select('title body din');
    query.exec((err,data) => {
      console.log(data);
      res.render('events',{"datas":data});
    })
  });
});
//events post routing
router.post('/pill', function(req, res) {
  console.log(req.body);
  let newPill = new pills(req.body);
  console.log(newPill);
  newPill.save()
  .then(function() {
    console.log("Hello");
    var query = pills.find();
    query.select('medicine days dosage');
    query.exec((err,data) => {
      console.log(data);
      res.render('pill_rem',{"datas":data});
    })
  })
  .catch(
    (err) => {
      res.send(err);
    }
  )
});
module.exports = router;

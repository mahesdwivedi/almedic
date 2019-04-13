var router = require('express').Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/report');
var event = require('../models/event_schema');
var pills = require('../models/pill_schema');

router.get('/consult', function(req, res) {
  res.render('form');
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
  query.select('medicine days dosage');
  query.exec((err,data) => {
    res.render('pill_rem',{"datas":data});
  })
});
//pill page routing
router.post('/pillForm', function(req, res) {
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
  query.select('title body din');
  query.exec((err,data) => {
    res.render('events',{"datas":data});
})
})
// events get routing
router.post('/events', function(req, res) {
  let newEvent = new event(req.body);
  newEvent.save()
  .then(function() {
    var query = event.find()
    query.select('title body din');
    query.exec((err,data) => {
      res.render('events',{"datas":data});
    })
  });
});
//events post routing
router.post('/pill', function(req, res) {
  let newPill = new pills(req.body);
  newPill.save()
  .then(function() {
    var query = pills.find();
    query.select('medicine days dosage');
    query.exec((err,data) => {
      res.render('pill_rem',{"datas":data});
    })
  })
  .catch(
    (err) => {
      res.send(err);
    }
  )
});
router.get('/adminlogin',function(req,res){
  res.render('adminlogin')
})
router.post('/adminlogin', function(req,res){
  console.log(req.body);
  if(req.body.userid=="mahes" && req.body.password=="mahes")
  res.render('pillForm')
})
module.exports = router;

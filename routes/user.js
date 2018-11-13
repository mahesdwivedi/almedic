var router = require('express').Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/report');
var Report = require('../models/report');
// var upload = require('../multer/storage');
var Feedback = require('../models/feedback');
var Article = require('../models/article');
var Review = require('../models/review');
const event = require('../models/event_schema')

router.get('/login', function(req, res) {
  res.render('pages/login');
});
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

router.get('/reportupload', function(req, res) {
  res.render('pages/reportupload');
});


router.get('/AmbulanceGo', function(req, res) {
  res.render('AmbulanceGo')
})
router.get('/hospital', function(req, res) {
  res.render('hospital')
})
router.get('/enter', (req, res)=> {
  res.render('add')
});
router.get('/events', function(req, res) {
  // console.log(req.body);
  // let newEvent = new event(req.body);
  // console.log(newEvent);
  // newEvent.save()
  // .then(function() {
  var query = event.find()
  console.log("Hello")
  query.select('title body din');
  query.exec((err,data) => {
     console.log(data);
    res.render('events',{"datas":data});
})
})
// router.post('/enter', function(req, res) {
//   console.log(req.body);
//   let newEvent = new event(req.body);
//   console.log(newEvent);
//   newEvent.save()
//     .then(res.render('events'))
//     .catch((err) => console.log(err))
// });

router.get('/staff', function(req, res) {
  res.render('staff')
})

router.get('/exchange', function(req, res) {
  res.render('exchange')
})


router.get('/record', function(req, res) {
  res.render('record')
})




router.get('/medadmin', function(req, res) {
  Article.find({}, function(err, articles) {
    if (err) {
      console.log(err);
    } else {
      res.render('medadmin', {
        articles: articles
      });
    }
  });
});



module.exports = router;

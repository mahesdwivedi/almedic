var express = require('express');
var router = express.Router();
var User = require('../models/user');
const Availables = require('../models/avail');
const Requires = require('../models/req');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/almedic');
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  // we're connected!
  console.log("Database connected");
});
router.get('/enter', (req, res)=> {
  res.render('add')
})
router.post('/enter', function(req, res) {
  console.log(req.body);
  let newNotice = new Notice(req.body);
  console.log(newNotice);
  newNotice.save()
    .then(res.render('index'))
    .catch((err) => console.log(err))
});

router.get('/requirement', function(req, res, next) {
    db.collection('Requires').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('require.ejs', {Requires: result})
      })
})
router.get('/availability', function(req, res, next) {
    db.collection('Availables').find().toArray((err, result) => {
        if (err) return console.log(err)
        res.render('available.ejs', {Availables: result})
      })
})

  router.post('/avail', (req, res) => {
    db.collection('Availables').save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/availability')
    })
  })

  router.post('/req', (req, res) => {
    db.collection('Requires').save(req.body, (err, result) => {
      if (err) return console.log(err)
      console.log('saved to database')
      res.redirect('/requirement')
    })
  })
  router.get('/admin',(req,res)=>{
      res.render('admin')
  }
  )
  router.post('/admin',(req,res) =>{
    res.render('admin')
  }
)
// GET route for reading data
router.get('/loginstaff', function (req, res, next) {
  res.render('login')
});


//POST route for updating data
router.post('/loginstaff', function (req, res, next) {
  // confirm that user typed same password twice
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("passwords dont match");
    return next(err);
  }

  if (req.body.staffId &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf) {

    var userData = {
      staffId: req.body.staffId,
      username: req.body.username,
      password: req.body.password,
      passwordConf: req.body.passwordConf,
    }

    User.create(userData, function (error, user) {
      if (error) {
        return next(error);
      } else {
        // req.session.userId = user._id;
        return res.redirect('/loginstaff');
      }
    });

  } else if (req.body.logstaffId && req.body.logpassword) {
    User.authenticate(req.body.logstaffId, req.body.logpassword, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        return next(err);
      } else {
        // req.session.userId = user._id;
        return res.redirect('/admin');
      }
    });
  } else {
    var err = new Error('All fields required.');
    err.status = 400;
    return next(err);
  }
})



// GET for logout logout
router.get('/logout', function (req, res, next) {
  // if (req.session) {
  //   // delete session object
  //   req.session.destroy(function (err) {
  //     if (err) {
  //       return next(err);
  //     } else {
        return res.redirect('/requirement');
      });

module.exports = router;

var router = require('express').Router();
var formidable = require('formidable');
var fs = require('fs');
var path = require('path');
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
// mongoose.connect('mongodb://localhost/report');
var Report = require('../models/report');
var upload = require('../multer/storage');
var Feedback = require('../models/feedback');
var Article = require('../models/article');
var Review = require('../models/review');

router.get('/login', function (req, res) {
  res.render('pages/login');
});
router.get('/reportupload', function (req, res) {
  res.render('pages/reportupload');
});
router.post('/reportupload', upload.single('report'), function (req, res, err) {
  if (!req.body.patientid || !req.body.billno || req.file == null || req.file == undefined || req.file == "") {
    console.log(req.file);
    res.send("Sorry, you provided wrong info");
  } else {
    console.log("a");
    var patientInfo = req.body;
    var newReport = new Report({
      patientid: req.body.patientid,
      billno: req.body.billno,
      report: req.file.filename
    });
    newReport.save(function (err, Person) {
      if (err)
        res.send("Database error");
      else
        res.send("New report added");
    });
  }
})

router.get('/AmbulanceGo', function (req, res) {
  res.render('AmbulanceGo')
})

router.get('/staff', function (req, res) {
  res.render('staff')
})

router.get('/exchange', function (req, res) {
  res.render('exchange')
})


router.get('/record', function (req, res) {
  res.render('record')
})

router.post('/recorddownload', upload.single('report'), function (req, res) {
  var reportInfo = req.body;
  console.log(req.body);
  if (!reportInfo.patientid || !reportInfo.billno) {
    res.render('recordview', {
      message: "Sorry, you provided worng info", type: "error"
    });
  } else {
    Report.findOne({ patientid: reportInfo.patientid, billno: reportInfo.billno },
      function (err, response) {
        console.log(response);
        if (err)
          res.render('recordview', { message: "Database error", type: "error" });
        else
          res.render('recordview', {
            message: "report retrieved", type: "success", report: response
          });
      });
  }
})

router.get('/recordview', function (req, res) {
  res.render('recordview')
})
router.get('/feedback', function (req, res) {
  res.render('feedback')
})

router.post('/feedback', function (req, res) {
  if (!req.body.bedno || !req.body.feedback)
    res.send("sorry you provided wrong info");
  else {
    var newFeedback = new Feedback({
      bedno: req.body.bedno,
      feedback: req.body.feedback
    });
    console.log(newFeedback);
    newFeedback.save(function (err, Feedback) {
      if (err)
        res.send(err);
      else
        console.log(Feedback);
      res.send("Thank you for your feedback");
    });
  }
})

router.get('/review', function (req, res) {
  res.render('review')
})

router.post('/review', function (req, res) {
  var newReview = new Review({
    phc: req.body.phc,
    doctor: req.body.doctor,
    sanitation: parseInt(req.body.sanitation),
    treatment: parseInt(req.body.treatment),
    overall: parseInt(req.body.overall)
  });
  console.log(newReview);
  newReview.save(function (err, Review) {
    if (err)
      res.send(err);
    else {
      console.log(Review);
      res.send("Thank you for your Review");
    }
  });
})

//home route
router.get('/medicine', function (req, res) {
  Article.find({}, function (err, articles) {
    if (err) {
      console.log(err);
    } else {
      res.render('medicine', {
        articles: articles
      });
    }
  });
});

//add route
router.get('/add', function (req, res) {
  res.render('add_article');
});

//ADD SUBMIT POST
router.post('/articles/add', function (req, res) {
  let article = new Article();
  article.title = req.body.title;
  article.stock = req.body.stock;
  article.expiry = req.body.expiry;
  article.precno = req.body.precno;

  article.save(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/medadmin');
    }
  });
});

//add route
router.get('/add', function (req, res) {
  res.render('add_article');
});

//ADD SUBMIT POST
router.post('/articles/add', function (req, res) {
  let article = new Article();
  article.title = req.body.title;
  article.stock = req.body.stock;
  article.expiry = req.body.expiry;
  article.precno = req.body.precno;

  article.save(function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/');
    }
  });
});

//LOAD EDIT FORM
router.get('/article/edit/:id', function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    res.render('edit_article', {
      article: article
    });
  });
});

//update SUBMIT POST
router.post('/articles/edit/:id', function (req, res) {
  let article = {};
  article.title = req.body.title;
  article.stock = req.body.stock;
  article.expiry = req.body.expiry;
  article.precno = req.body.precno;

  let query = { _id: req.params.id }
  Article.updateOne(query, article, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/medadmin');
    }
  });

});


//LOAD EDIT FORM
router.get('/article/edit/:id', function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    res.render('edit_article', {
      article: article
    });
  });
});

//update SUBMIT POST
router.post('/articles/edit/:id', function (req, res) {
  let article = {};
  article.title = req.body.title;
  article.stock = req.body.stock;
  article.expiry = req.body.expiry;
  article.precno = req.body.precno;

  let query = { _id: req.params.id }
  Article.updateOne(query, article, function (err) {
    if (err) {
      console.log(err);
      return;
    } else {
      res.redirect('/medicine');
    }
  });

});

router.get('/medadmin', function (req, res) {
  Article.find({}, function (err, articles) {
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

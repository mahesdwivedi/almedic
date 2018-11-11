var mongoose = require('mongoose');

var ReqSchema = new mongoose.Schema({
  phcName: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  staffNo: {
    type: String,
    required: true,
  },
  dept: {
    type: String,
    required: true,
  },
  contact:{
    type:String,
    require:true,
  }
});


var Require = mongoose.model('Require', ReqSchema);
module.exports = Require;
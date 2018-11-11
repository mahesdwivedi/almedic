var mongoose = require('mongoose');

var AvailSchema = new mongoose.Schema({
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
  contact: {
    type:String,
    require:true
  }
});


var Available = mongoose.model('Available', AvailSchema);
module.exports = Available;
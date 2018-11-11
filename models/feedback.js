var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    bedno: String,
    feedback: String
});

var Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;

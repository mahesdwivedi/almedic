var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reviewSchema = new Schema({
    phc: String,
    doctor: String,
    sanitation: Number,
    treatment: Number,
    overall: Number
});

var Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

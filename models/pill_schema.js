var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pillSchema = new Schema({
medicine : { type: String, default: 'medicine' },
days : { type: String, default: 'days' },
dosage: { type: String, default:'dosage'}
// date: { type: Date, default: Date.now }
});

module.exports= mongoose.model('pills', pillSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var eventSchema = new Schema({
title : { type: String, default: 'title' },
body : { type: String, default: 'event here' },
din: { type: String, default:'date'}
// date: { type: Date, default: Date.now }
});
var events = mongoose.model('almedic', eventSchema);
module.exports= events;

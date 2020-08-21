const mongoose = require('mongoose');

const sampleSchema = new mongoose.Schema({
    name: mongoose.Schema.Types.String,
    age: mongoose.Schema.Types.String,
    aadhar: mongoose.Schema.Types.String,
    address1: mongoose.Schema.Types.String,
    address2: mongoose.Schema.Types.String,
    city: mongoose.Schema.Types.String,
    state: mongoose.Schema.Types.String,
    country: mongoose.Schema.Types.String,
    mobile: mongoose.Schema.Types.String,
    emailid: mongoose.Schema.Types.String
});

module.exports = mongoose.model('sample', sampleSchema);
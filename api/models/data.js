const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    DATE: mongoose.Schema.Types.String,
    MSISDN: mongoose.Schema.Types.String,
    IMSI: mongoose.Schema.Types.String,
    UPLOAD_DEDICATED_NETWORK: mongoose.Schema.Types.String,
    DOWNLOAD_DEDICATED_NETWORK: mongoose.Schema.Types.String,
    UPLOAD_COMMERCIAL_NETWORK: mongoose.Schema.Types.String,
    DOWNLOAD_COMMERCIAL_NETWORK: mongoose.Schema.Types.String,
    APN: mongoose.Schema.Types.String
});

module.exports = mongoose.model('CDR_BLACKHAWK_DATA_20200617_084351.dat', dataSchema);
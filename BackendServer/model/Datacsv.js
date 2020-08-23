const mongoose = require('mongoose');
const Base = require('./Base');

/*Inherit schema from base schema*/
const data = new mongoose.Schema(
    {
    UPLOAD_DEDICATED_NETWORK: mongoose.Schema.Types.String,
    DOWNLOAD_DEDICATED_NETWORK: mongoose.Schema.Types.String,
    UPLOAD_COMMERCIAL_NETWORK: mongoose.Schema.Types.String,
    DOWNLOAD_COMMERCIAL_NETWORK: mongoose.Schema.Types.String,
    APN: mongoose.Schema.Types.String,
    }
)

module.exports = Base.discriminator('CDR_BLACKHAWK_DATA_20200617_084351.dat',data)
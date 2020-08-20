const mongoose = require('mongoose');
const Base = require('./Base');

/*Inherit schema from base schema*/
const sio = new mongoose.Schema(
    {
        IMEI: mongoose.Schema.Types.String,
        LAST_CONNECTION_TIMESTAMP: mongoose.Schema.Types.String,
        DEVICE_TYPE: mongoose.Schema.Types.String,
        DEVICE_NAME: mongoose.Schema.Types.String,
    }
)

module.exports = Base.discriminator('CDR_BLACKHAWK_SIO_20200618_060000.dat',sio);

const mongoose = require('mongoose');

const sioSchema = new mongoose.Schema({
    MSISDN: mongoose.Schema.Types.String,
    IMSI: mongoose.Schema.Types.String,
    IMEI: mongoose.Schema.Types.String,
    LAST_CONNECTION_TIMESTAMP: mongoose.Schema.Types.String,
    DEVICE_TYPE: mongoose.Schema.Types.String,
    DEVICE_NAME: mongoose.Schema.Types.String,
    SIM_SERIAL_NUMBER: mongoose.Schema.Types.String
});

module.exports = mongoose.model('CDR_BLACKHAWK_SIO_20200618_060000.dat', sioSchema);
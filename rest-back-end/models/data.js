const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  DATE: {
    type: String
  },
  MSISDN: {
    type: String,
  },
  IMSI: {
    type: String,
  },
  UPLOAD_DEDICATED_NETWORK: {
    type: String,
  },
  DOWNLOAD_DEDICATED_NETWORK: {
    type: String,
  },
  UPLOAD_COMMERCIAL_NETWORK: {
    type: String,
  },
  DOWNLOAD_COMMERCIAL_NETWORK: {
    type: String,
  },
  APN: {
    type: String,
  },
  MOU_DEDICATED_NETWORK: {
    type: String,
  },
  MOU_COMMERCIAL_NETWORK: {
    type: String,
  },
  MOU_VOLTE_DEDICATED_NETWORK: {
    type: String,
  },
  MOU_VOLTE_COMMERCIAL_NETWORK: {
    type: String,
  },
  IMEI: {
    type: String,
  },
  LAST_CONNECTION_TIMESTAMP: {
    type: String,
  },
  DEVICE_TYPE: {
    type: String,
  },
  DEVICE_NAME: {
    type: String,
  },
  SIM_SERIAL_NUMBER: {
    type: String,
  }

});

module.exports = mongoose.model('data', dataSchema, 'data');


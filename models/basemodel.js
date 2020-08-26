
const mongoose = require('mongoose');

const commonSchema = new mongoose.Schema({
	DATE: {type:String},
    MSISDN: {type:String},
    IMSI: {type:String},
    ACCT_NBR: {type:String},
    SUB_ACCT_NBR: {type:String},
    ACCT_SRVC_NBR: {type:String},
    MOBILE_NUMBER: {type:String},
    PROD_TYP_CDE: {type:String},
    DTE_EFF_FROM: {type:String},
    DTE_EFF_TO: {type:String},
    SIM_SERIAL_NUMBER: {type:String}
});

module.exports = mongoose.model('base',commonSchema);
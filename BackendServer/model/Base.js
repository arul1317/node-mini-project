const mongoose = require('mongoose');


/*Base Schema for all the schema */
const col = new mongoose.Schema(
    {
    DATE: mongoose.Schema.Types.String,
    MSISDN: mongoose.Schema.Types.String,
    IMSI: mongoose.Schema.Types.String,
    ACCT_NBR: mongoose.Schema.Types.String,
    SUB_ACCT_NBR: mongoose.Schema.Types.String,
    ACCT_SRVC_NBR: mongoose.Schema.Types.String,
    MOBILE_NUMBER: mongoose.Schema.Types.String,
    PROD_TYP_CDE:mongoose.Schema.Types.String,
    DTE_EFF_FROM: mongoose.Schema.Types.String,
    DTE_EFF_TO: mongoose.Schema.Types.String,
    SIM_SERIAL_NUMBER:mongoose.Schema.Types.String,  
    }
)

module.exports = mongoose.model('base',col)
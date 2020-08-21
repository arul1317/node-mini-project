const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    // ACCT_NBR: mongoose.Schema.Types.String,
    // SUB_ACCT_NBR: mongoose.Schema.Types.String,
    // ACCT_SRVC_NBR: mongoose.Schema.Types.String,
    // MOBILE_NUMBER: mongoose.Schema.Types.String,
    // PROD_CDE: mongoose.Schema.Types.String,
    // PROD_DESCR: mongoose.Schema.Types.String,
    // PROD_TYP_CDE: mongoose.Schema.Types.String,
    // DTE_EFF_FROM:mongoose.Schema.Types.String,
    // DTE_EFF_TO: mongoose.Schema.Types.String,
    // ORGN_PROV_DTE: mongoose.Schema.Types.String,
    // DELR_PREM_CDE: mongoose.Schema.Types.String

    ACCT_NBR: { type: String},
    SUB_ACCT_NBR: { type: String},
    ACCT_SRVC_NBR: { type: String},
    MOBILE_NUMBER: { type: String},
    PROD_CDE: { type: String},
    PROD_DESCR: { type: String},
    PROD_TYP_CDE: { type: String},
    DTE_EFF_FROM: { type: String},
    DTE_EFF_TO: { type: String},
    ORGN_PROV_DTE: { type: String},
    DELR_PREM_CDE: { type: String},
});

module.exports = mongoose.model('CDR_BLACKHAWK_PRODUCT_20200617_073703.dat', ProductSchema);
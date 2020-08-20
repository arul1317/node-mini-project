const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  ACCT_NBR: {
    type: String,
  },
  SUB_ACCT_NBR: {
    type: String,
  },
  ACCT_SRVC_NBR: {
    type: String,
  },
  MOBILE_NUMBER: {
    type: String,
  },
  SRVC_TYP_CDE: {
    type: String,
  },
  DTE_EFF_FROM: {
    type: String,
  },
  DTE_EFF_TO: {
    type: String,
  },
  INIT_ACT_DTE: {
    type: String,
  },
  SRVC_PROV_CDE: {
    type: String,
  },
  BILLING_NAME: {
    type: String,

  },
  ACCT_STAT: {
    type: String,

  },
  ACCT_STAT_EFF_DTE: {
    type: String,

  },
  LAST_BILL_DTE: {
    type: String,

  },
  NEXT_BILL_DTE: {
    type: String,

  },
  DFLT_BILL_CYCL_DAY: {
    type: String,

  },
  BILL_PDCY_NBR_MNTH: {
    type: String,

  },
  CUST_NBR: {
    type: String,

  },
  CUSTOMER_NAME: {
    type: String,

  },
  CONTACT_NAME: {
    type: String,

  },
  CONT_TYP_CDE: {
    type: String,

  },
  FLEXIPLAN: {
    type: String,

  },
  FLEXIPLAN_DESCRIPTION: {
    type: String,

  },
  FLEXIPLAN_DTE_EFF_FROM: {
    type: String,

  },
  FLEXIPLAN_DTE_EFF_TO: {
    type: String,

  },
  FLEXIPLAN_ORGN_PROV_DTE: {
    type: String,

  },
  FLEXIPLAN_DEALER_CODE: {
    type: String,

  },
  IMSI: {
    type: String,

  },
  SIM_SERIAL_String: {
    type: String,

  },
  SIM_DTE_EFF_FROM: {
    type: String,

  },
  SIM_DTE_EFF_TO: {
    type: String,

  },
  ACCT_SRVC_STAT: {
    type: String,

  },
  SRVC_STATUS_FROM: {
    type: String,

  },
  SRVC_STATUS_TO: {
    type: String,

  },
  REASON_CODE: {
    type: String,
  },
  PROD_CDE: {
    type: String,
  },
  PROD_DESCR: {
    type: String,
  },
  PROD_TYP_CDE: {
    type: String,
  },
  ORGN_PROV_DTE: {
    type: String,
  },
  DELR_PREM_CDE: {
    type: String,
  }
});


module.exports = mongoose.model('service', serviceSchema, 'service');


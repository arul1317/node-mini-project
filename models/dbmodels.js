const mongoose = require('mongoose');

const userSchema = new mongoose.Schema ({
  name: {type: String}, 
  age: {type: String},
  aadhar: {type: String},
  address1: {type: String},
  address2: {type: String},
  city: {type: String},
  state: {type: String},
  country: {type: String},
  mobile: {type: String},
  emailid: {type: String}
}); 

const dataSchema = new mongoose.Schema ({
  DATE: {type: String}, 
  MSISDN: {type: String},
  IMSI: {type: String},
  UPLOAD_DEDICATED_NETWORK: {type: String},
  DOWNLOAD_DEDICATED_NETWORK: {type: String},
  UPLOAD_COMMERCIAL_NETWORK: {type: String},
  DOWNLOAD_COMMERCIAL_NETWORK: {type: String},
  APN: {type: String}
}); 

const voiceSchema = new mongoose.Schema ({
  DATE: {type: String}, 
  MSISDN: {type: String},
  IMSI: {type: String},  
  MOU_DEDICATED_NETWORK: {type: String},
  MOU_COMMERCIAL_NETWORK: {type: String},
  MOU_VOLTE_DEDICATED_NETWORK: {type: String},
  MOU_VOLTE_COMMERCIAL_NETWORK: {type: String}
});   

const sioSchema = new mongoose.Schema ({
  MSISDN: {type: String},
  IMSI: {type: String},
  IMEI: {type: String},
  LAST_CONNECTION_TIMESTAMP: {type: String}, 
  DEVICE_TYPE: {type: String},
  DEVICE_NAME: {type: String},
  SIM_SERIAL_NUMBER: {type: String}
});
  
const serviceSchema = new mongoose.Schema ({  
  ACCT_NBR: {type: String},
  SUB_ACCT_NBR: {type: String},
  ACCT_SRVC_NBR: {type: String},
  MOBILE_NUMBER: {type: String},  
  SRVC_TYP_CDE: {type: String},
  DTE_EFF_FROM: {type: String},
  DTE_EFF_TO: {type: String},
  INIT_ACT_DTE: {type: String},
  SRVC_PROV_CDE: {type: String},
  BILLING_NAME: {type: String},
  ACCT_STAT: {type: String},
  ACCT_STAT_EFF_DTE: {type: String},
  LAST_BILL_DTE: {type: String},
  NEXT_BILL_DTE: {type: String},
  DFLT_BILL_CYCL_DAY: {type: String},
  BILL_PDCY_NBR_MNTH: {type: String},
  CUST_NBR: {type: String},
  CIDN: {type: String},
  CUSTOMER_NAME: {type: String},
  CONTACT_NAME: {type: String},
  CONT_TYP_CDE: {type: String},
  FLEXIPLAN: {type: String},
  FLEXIPLAN_DESCRIPTION: {type: String},
  FLEXIPLAN_DTE_EFF_FROM: {type: String},
  FLEXIPLAN_DTE_EFF_TO: {type: String},
  FLEXIPLAN_ORGN_PROV_DTE: {type: String},
  FLEXIPLAN_DEALER_CODE: {type: String},
  IMSI: {type: String},
  SIM_SERIAL_NUMBER: {type: String},
  SIM_DTE_EFF_FROM: {type: String},
  SIM_DTE_EFF_TO: {type: String},
  ACCT_SRVC_STAT: {type: String},
  SRVC_STATUS_FROM: {type: String},
  SRVC_STATUS_TO: {type: String},
  SRVC_STAT_RESN_CDE: {type: String},
  REASON_CODE: {type: String}
});  

const productSchema = new mongoose.Schema ({  
  ACCT_NBR: {type: String},
  SUB_ACCT_NBR: {type: String},
  ACCT_SRVC_NBR: {type: String},
  MOBILE_NUMBER: {type: String},
  PROD_CDE: {type: String},
  PROD_DESCR: {type: String},
  PROD_TYP_CDE: {type: String},
  DTE_EFF_FROM: {type: String},
  DTE_EFF_TO: {type: String},
  ORGN_PROV_DTE: {type: String},
  DELR_PREM_CDE: {type: String}
});

module.exports.user = mongoose.model('user', userSchema);
module.exports.data = mongoose.model('data', dataSchema);
module.exports.voice = mongoose.model('voice', voiceSchema);
module.exports.sio = mongoose.model('sio', sioSchema);
module.exports.service = mongoose.model('service', serviceSchema);
module.exports.product = mongoose.model('product', productSchema);
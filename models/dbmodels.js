const mongoose = require('mongoose');
const Base = require('./basemodel');

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

const voiceSchema = new mongoose.Schema({
    MOU_DEDICATED_NETWORK: {type:String},
    MOU_COMMERCIAL_NETWORK: {type:String},
    MOU_VOLTE_DEDICATED_NETWORK: {type:String},
    MOU_VOLTE_COMMERCIAL_NETWORK: {type:String}
});

const dataSchema = new mongoose.Schema({
    UPLOAD_DEDICATED_NETWORK: {type:String},
    DOWNLOAD_DEDICATED_NETWORK: {type:String},
    UPLOAD_COMMERCIAL_NETWORK: {type:String},
    DOWNLOAD_COMMERCIAL_NETWORK: {type:String},
    APN: {type:String}
});

const sioSchema = new mongoose.Schema({
	IMEI: {type:String},
	LAST_CONNECTION_TIMESTAMP: {type:String},
	DEVICE_TYPE: {type:String},
	DEVICE_NAME: {type:String}
});

const productSchema = new mongoose.Schema({
	PROD_CDE: {type:String},
	PROD_DESCR: {type:String},
	ORGN_PROV_DTE: {type:String},
	DELR_PREM_CDE: {type:String}
});

const serviceSchema = new mongoose.Schema({
	SRVC_TYP_CDE: {type:String},
	INIT_ACT_DTE: {type:String},
	SRVC_PROV_CDE: {type:String},
	BILLING_NAME: {type:String},
	ACCT_STAT: {type:String},
	ACCT_STAT_EFF_DTE: {type:String},
	LAST_BILL_DTE: {type:String},
	NEXT_BILL_DTE: {type:String},
	DFLT_BILL_CYCL_DAY: {type:String},
	BILL_PDCY_NBR_MNTH: {type:String},
	CUST_NBR: {type:String}, 
	CIDN: {type:String},
	CUSTOMER_NAME: {type:String},
	CONTACT_NAME: {type:String},
	CONT_TYP_CDE: {type:String},
	FLEXIPLAN: {type:String},
	FLEXIPLAN_DESCRIPTION: {type:String},
	FLEXIPLAN_DTE_EFF_FROM: {type:String},
	FLEXIPLAN_DTE_EFF_TO: {type:String},
	FLEXIPLAN_ORGN_PROV_DTE: {type:String},
	FLEXIPLAN_DEALER_CODE: {type:String},
	SIM_DTE_EFF_FROM: {type:String},
	SIM_DTE_EFF_TO: {type:String},
	ACCT_SRVC_STAT: {type:String},
	SRVC_STATUS_FROM: {type:String}, 
	SRVC_STATUS_TO: {type:String},
	SRVC_STAT_RESN_CDE: {type:String},
	REASON_CODE: {type:String}
});

module.exports.user = mongoose.model('user', userSchema);
module.exports.voice = Base.discriminator('VOICE_20200617',voiceSchema);
module.exports.data = Base.discriminator('DATA_20200617',dataSchema);
module.exports.sio = Base.discriminator('SIO_20200618',sioSchema);
module.exports.product = Base.discriminator('PRODUCT_20200617',productSchema);
module.exports.service = Base.discriminator('SERVICE_20200617',serviceSchema);

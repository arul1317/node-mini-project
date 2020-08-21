const mongoose  =require('mongoose')

const Schema = mongoose.Schema

const dataSchema  =new Schema 
({
  
  //Definition for all fields 

  // Super Schema   
  aadhar:{
        type:String
    }, 
    address1: 
    {
        type:String
    },
     address2: {
        type:String
    }, 
    city: {
        type:String
    }, state: {
        type:String
    }, country: {
        type:String
    }, mobile: {
        type:String
    }, emailid: 
    {
        type:String
    },

    name: {
        type:String
    },
    age: {
        type:String
    },
    subject: {
        type:String
    },

    DATE: {
        type:String
    },
        MSISDN :{
            type:String
        },
        IMSI:{
            type:String
        },
        UPLOAD_DEDICATED_NETWORK:{
            type:String
        },
        DOWNLOAD_DEDICATED_NETWORK:{
            type:String
        },
        UPLOAD_COMMERCIAL_NETWORK:{
            type:String
        },
        DOWNLOAD_COMMERCIAL_NETWORK:{
            type:String
        },
        APN:{
            type:String
        },
        ACCT_NBR:{
            type:String
        },


DATE:{
    type:String
},


MSISDN:{
    type:String
},
ACCT_SRVC_NBR:{
    type:String
},
ACCT_SRVC_STAT:{
    type:String
},
ACCT_STAT:{
    type:String
},
ACCT_STAT_EFF_DTE:{
    type:String
},
APN:{
    type:String
},
BILLING_NAME:{
    type:String
},
BILL_PDCY_NBR_MNTH:{
    type:String
},
CIDN:{
    type:String
},
CONTACT_NAME:{
    type:String
},
CONT_TYP_CDE:{
    type:String
},
CUSTOMER_NAME:{
    type:String
},
CUST_NBR:{
    type:String
},
DATE:{
    type:String
},
DELR_PREM_CDE:{
    type:String
},
DEVICE_NAME:{
    type:String
},
DEVICE_TYPE:{
    type:String
},
DFLT_BILL_CYCL_DAY:{
    type:String
},
DOWNLOAD_COMMERCIAL_NETWORK:{
    type:String
},
DOWNLOAD_DEDICATED_NETWORK:{
    type:String
},
DTE_EFF_FROM:{
    type:String
},
DTE_EFF_TO:{
    type:String
},
FLEXIPLAN:{
    type:String
},
FLEXIPLAN_DEALER_CODE:{
    type:String
},
FLEXIPLAN_DESCRIPTION:{
    type:String
},
FLEXIPLAN_DTE_EFF_FROM:{
    type:String
},
FLEXIPLAN_DTE_EFF_TO:{
    type:String
},
FLEXIPLAN_ORGN_PROV_DTE:{
    type:String
},
IMEI:{
    type:String
},
IMSI:{
    type:String
},
INIT_ACT_DTE:{
    type:String
},
LAST_BILL_DTE:{
    type:String
},
LAST_CONNECTION_TIMESTAMP:{
    type:String
},
MOBILE_NUMBER:{
    type:String
},
MOU_COMMERCIAL_NETWORK:{
    type:String
},
MOU_DEDICATED_NETWORK:{
    type:String
},
MOU_VOLTE_COMMERCIAL_NETWORK:{
    type:String
},
MOU_VOLTE_DEDICATED_NETWORK:{
    type:String
},
MSISDN:{
    type:String
},
NEXT_BILL_DTE:{
    type:String
},
ORGN_PROV_DTE:{
    type:String
},
PROD_CDE:{
    type:String
},
PROD_DESCR:{
    type:String
},
PROD_TYP_CDE:{
    type:String
},
REASON_CODE:{
    type:String
},
SIM_DTE_EFF_FROM:{
    type:String
},
SIM_DTE_EFF_TO:{
    type:String
},
SIM_SERIAL_NUMBER:{
    type:String
},
SRVC_PROV_CDE:{
    type:String
},
SRVC_STATUS_FROM:{
    type:String
},
SRVC_STATUS_TO:{
    type:String
},
SRVC_STAT_RESN_CDE:{
    type:String
},
SRVC_TYP_CDE:{
    type:String
},
SUB_ACCT_NBR:{
    type:String
},
UPLOAD_COMMERCIAL_NETWORK:{
    type:String
},
UPLOAD_DEDICATED_NETWORK:{
    type:String
},
    
   
},{timestamps: true})

   const s_data = mongoose.model('s_data',dataSchema)  

   module.exports = s_data   // exporting schema 
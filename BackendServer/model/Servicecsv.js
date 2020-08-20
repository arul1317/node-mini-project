const mongoose = require('mongoose');
const Base = require('./Base');

/*Inherit schema from base schema*/
const service = new mongoose.Schema(
    {
        SRVC_TYP_CDE: mongoose.Schema.Types.String,
        INIT_ACT_DTE: mongoose.Schema.Types.String,
        SRVC_PROV_CDE:mongoose.Schema.Types.String, 
        BILLING_NAME:mongoose.Schema.Types.String,
        ACCT_STAT:mongoose.Schema.Types.String,
        ACCT_STAT_EFF_DTE:mongoose.Schema.Types.String,
        LAST_BILL_DTE:mongoose.Schema.Types.String,
        NEXT_BILL_DTE:mongoose.Schema.Types.String,  
        DFLT_BILL_CYCL_DAY:mongoose.Schema.Types.String,
        BILL_PDCY_NBR_MNTH:mongoose.Schema.Types.String,  
        CUST_NBR:mongoose.Schema.Types.String,  
        CIDN:mongoose.Schema.Types.String,  
        CUSTOMER_NAME:mongoose.Schema.Types.String,  
        CONTACT_NAME:mongoose.Schema.Types.String,  
        CONT_TYP_CDE:mongoose.Schema.Types.String,  
        FLEXIPLAN:mongoose.Schema.Types.String,  
        FLEXIPLAN_DESCRIPTION:mongoose.Schema.Types.String,  
        FLEXIPLAN_DTE_EFF_FROM:mongoose.Schema.Types.String,  
        FLEXIPLAN_DTE_EFF_TO:mongoose.Schema.Types.String,  
        FLEXIPLAN_ORGN_PROV_DTE:mongoose.Schema.Types.String,  
        FLEXIPLAN_DEALER_CODE:mongoose.Schema.Types.String,  
        SIM_DTE_EFF_FROM:mongoose.Schema.Types.String,  
        SIM_DTE_EFF_TO:mongoose.Schema.Types.String,  
        ACCT_SRVC_STAT:mongoose.Schema.Types.String,  
        SRVC_STATUS_FROM:mongoose.Schema.Types.String,  
        SRVC_STATUS_TO:mongoose.Schema.Types.String,  
        SRVC_STAT_RESN_CDE:mongoose.Schema.Types.String,  
        REASON_CODE:mongoose.Schema.Types.String, 
    }
)

module.exports = Base.discriminator('CDR_BLACKHAWK_SERVICE_20200617_073703.dat',service);

const mongoose = require('mongoose');
const Base = require('./Base');

/*Inherit schema from base schema*/
const product = new mongoose.Schema(
    {
        PROD_CDE: mongoose.Schema.Types.String,
        PROD_DESCR:mongoose.Schema.Types.String, 
        ORGN_PROV_DTE:mongoose.Schema.Types.String,
        DELR_PREM_CDE:mongoose.Schema.Types.String,  
    }
)

module.exports = Base.discriminator('CDR_BLACKHAWK_PRODUCT_20200617_073703.dat',product);

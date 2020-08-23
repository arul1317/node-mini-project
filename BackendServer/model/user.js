const mongoose = require('mongoose');
const Base = require('./Base');

/*Inherit schema from base schema*/
const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
        },
        age:{
            type: String,
         },
         aadhar:{
            type: String,
        },
        address1:{
            type: String,
        },
        address2:{
            type: String
        },
        city:{
            type: String
        },
        state:{
            type: String
        },
        country:{
            type: String
        },
        mobile:{
            type: String
        },
        emailid:{
            type: String
        },
      
    }
);

module.exports = Base.discriminator('sample.csv',userSchema);

const mongoose = require('mongoose');
const Base = require('./Base');

/*Inherit schema from base schema*/
const voice = new mongoose.Schema(
    {
    MOU_DEDICATED_NETWORK: mongoose.Schema.Types.String,
    MOU_COMMERCIAL_NETWORK: mongoose.Schema.Types.String,
    MOU_VOLTE_DEDICATED_NETWORK: mongoose.Schema.Types.String,
    MOU_VOLTE_COMMERCIAL_NETWORK: mongoose.Schema.Types.String,
    }
)
module.exports = Base.discriminator('CDR_BLACKHAWK_VOICE_20200617_084000.dat',voice);
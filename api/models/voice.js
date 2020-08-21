const mongoose = require('mongoose');

const voiceSchema = new mongoose.Schema({
    DATE: mongoose.Schema.Types.String,
    MSISDN: mongoose.Schema.Types.String,
    IMSI: mongoose.Schema.Types.String,
    MOU_DEDICATED_NETWORK: mongoose.Schema.Types.String,
    MOU_COMMERCIAL_NETWORK: mongoose.Schema.Types.String,
    MOU_VOLTE_DEDICATED_NETWORK: mongoose.Schema.Types.String,    
    MOU_VOLTE_COMMERCIAL_NETWORK: mongoose.Schema.Types.String
});

module.exports = mongoose.model('CDR_BLACKHAWK_VOICE_20200617_084000.dat', voiceSchema);
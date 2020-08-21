const express = require('express');
const router = express.Router();

const data = require('../models/data');
const product = require('../models/product');
const service = require('../models/service');
const voice = require('../models/voice');
const sio = require('../models/sio');
const sample = require('../models/sample');

router.put('/update/:file', async(req, res, next) => {
    let file = req.params.file;
    console.log(req.body);
    try {
        switch(file){
            case 'CDR_BLACKHAWK_DATA_20200617_084351.dat': {
                await data.insertMany(req.body, (err, response) => {
                    if(err) throw err;
                    res.json(response);
                });
                break;
            }
            case 'CDR_BLACKHAWK_PRODUCT_20200617_073703.dat': {
                await product.insertMany(req.body, (err, response) => {
                    if(err) throw err;
                    res.json(response);
                });
                break;
            }
            case 'CDR_BLACKHAWK_SERVICE_20200617_073703.dat': {
                await service.insertMany(req.body, (err, response) => {
                    if(err) throw err;
                    res.json(response);
                });
                break;
            }
            case 'CDR_BLACKHAWK_VOICE_20200617_084000.dat': {
                await voice.insertMany(req.body, (err, response) => {
                    if(err) throw err;
                    res.json(response);
                });
                break;
            }
            case 'CDR_BLACKHAWK_SIO_20200618_060000.dat': {
                await sio.insertMany(req.body, (err, response) => {
                    if(err) throw err;
                    res.json(response);
                });
                break;
            }
            default:
                await sample.insertMany(req.body, (err, response) => {
                    if(err) throw err;
                    res.json(response);
                });
        }
    } catch (err) {
        console.log(err);
        next();
    }
});

router.get('/:file', (req, res, next) => {
    
});

router.get('/first', async (req, res, next) => {
    try {  
        const record = await data.findOne();
        res.status(200).json(record);
  
    } catch (e) {
        next(e);
    }
});

router.get('/last', async (req, res, next) => {
    try {
        const record = await data.find({}).sort({ _id: -1 }).limit(1);
        res.status(200).json(record);
  
    } catch (e) {
        next(e);
    }
});

module.exports = router;
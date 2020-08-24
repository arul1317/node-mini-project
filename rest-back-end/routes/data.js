const express = require("express");
const Data = require('../models/data');

const router = express.Router();

router.post(
  '/',
  async (req, res, next) => {
    try {
      console.log("data get");
      Data.insertMany(req.body, (err, resp) => {
        if (err) throw err;
        console.log("res sent from data");
        res.status(201).json(resp);
      });


    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/getfirstdoc', async (req, res, next) => {
    try {
      console.log("data || Rxd req for 1st doc");

      await Data.findOne({})
        .exec((err, data) => {
          if (err || !data) {
            throw err

          } else {
            console.log(data);
            res.status(200).json(data);
            console.log("1st doc sent");
          }

        });
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/getlastdoc', async (req, res, next) => {
    try {
      console.log("data || Rxd req for last doc");
      await Data.find({}).sort({ _id: -1 }).limit(1)
        .exec((err, data) => {
          if (err||!data){throw err;} 
          console.log(data);
          res.status(200).json(data);
          console.log("last doc sent");
        })

    } catch (e) {
      next(e);
    }
  }
);


module.exports = router;
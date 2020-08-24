const express = require("express");

const PData = require('../models/personaldata');


const router = express.Router();

router.post(
  '/',
  async (req, res, next) => {
    try {
      console.log("PData get");
      PData.insertMany(req.body, (err, resp) => {
        if (err) throw err;
        console.log("res sent from PData");
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
      console.log("PData || Rxd req for 1st doc");

      await PData.findOne({})
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
      console.log("PData || Rxd req for last doc");
      await PData.find({}).sort({ _id: -1 }).limit(1)
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
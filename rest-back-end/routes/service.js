const express = require("express");
const Service = require('../models/service');


const router = express.Router();

router.post(
  '/',
  async (req, res, next) => {
    try {
      console.log("Service get");
      Service.insertMany(req.body, (err, resp) => {
        if (err) throw err;
        console.log("res sent from Service");
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
      console.log("Service || Rxd req for 1st doc");

      await Service.findOne({})
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
      console.log("Service || Rxd req for last doc");
      await Service.find({}).sort({ _id: -1 }).limit(1)
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
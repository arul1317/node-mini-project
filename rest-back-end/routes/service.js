const express = require("express");
const Service = require('../models/service');


const router = express.Router();

router.post(
  '/',
  async (req, res, next) => {
    try {
      console.log(`service get from `);
      await Service.insertMany(req.body);
      res.status(201).json({ message: "done" });
      console.log("res sent from service");
    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/getfirstdoc', async (req, res, next) => {
    try {
      console.log("service || Rxd req for 1st doc");
      const dat = await Service.findOne();
      console.log(dat);
      res.status(200).json(dat);
      console.log("1st doc sent");

    } catch (e) {
      next(e);
    }
  }
);


router.get(
  '/getlastdoc', async (req, res, next) => {
    try {
      console.log("service || Rxd req for last doc");
      const dat = await Service.find({}).sort({ _id: -1 }).limit(1);
      console.log(dat);
      res.status(200).json(dat);
      console.log("last doc sent");

    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
const express = require("express");
const Data = require('../models/data');

const router = express.Router();

router.post(
  '/',
  async (req, res, next) => {
    try {
      console.log("data get");
      Data.insertMany(req.body);
      console.log("res sent from data");
      res.status(201).json({ message: "done" });

    } catch (e) {
      next(e);
    }
  }
);

router.get(
  '/getfirstdoc', async (req, res, next) => {
    try {
      console.log("data || Rxd req for 1st doc");

      const dat = await Data.findOne();
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
      console.log("data || Rxd req for last doc");
      const dat = await Data.find({}).sort({ _id: -1 }).limit(1);
      console.log(dat);
      res.status(200).json(dat);
      console.log("last doc sent");

    } catch (e) {
      next(e);
    }
  }
);


module.exports = router;
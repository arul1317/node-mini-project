const express = require("express");

const PData = require('../models/personaldata');


const router = express.Router();

router.post(
  '/',
  async (req, res, next) => {
    try {
      console.log("personalData get");
      await PData.insertMany(req.body);
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
      console.log("Pdata || Rxd req for 1st doc");
      const dat = await PData.findOne();
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
      console.log("Pdata || Rxd req for last doc");
      const dat = await PData.find({}).sort({ _id: -1 }).limit(1);
      console.log(dat);
      res.status(200).json(dat);
      console.log("last doc sent");

    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
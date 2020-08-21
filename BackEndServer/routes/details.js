const express = require('express');
const mongoose = require('mongoose');

const Detail = require('../models/details');

const router = express.Router();

router.post('/',async(req,res,next)=>{
    try{
        let inp = await req.body;
        for(let i=0;i<inp.length;i++){
            console.log("loop "+i)
            await Detail.collection.insertMany(inp[i]);
        }
        console.log("after await");
        res.send("details added");
        res.end()
    }
    catch(err){
        console.log(err);
        next();
    }
})

router.get('/',async(req,res,next)=>{
    try{
      const op_first = await Detail.find({},'-_id').sort({_id:1}).limit(1)
      const op_last = await Detail.find({},'-_id').sort({_id:-1}).limit(1);
      res.json({
        "first entry":op_first[0],
        "last entry" :op_last[0],
      });      
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;

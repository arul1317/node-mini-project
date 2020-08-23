const express = require('express');
const router = express.Router();
const Base = require('../model/Base');
require('../model/Datacsv');
require('../model/Productcsv');
require('../model/Servicecsv');
require('../model/Siocsv');
require('../model/Voicecsv');
require('../model/user');

/*Put route for all the files*/
router.put('/upload/:filename',
    async (req, res, next) => {
      var file = req.params.filename;
        try {
          console.log(req.body);
          await  Base.discriminators[file].insertMany(req.body,(err,resp)=>{
            if (err) throw err;
            res.json(resp);
        });   
        } catch (e) {
            console.log(e);
          next();
        }
      }
)

/*get route for all the files*/
router.get('/:file',(req,res,next)=>{
  var name = req.params.file
  var arr=[];
  Base.findOne().where({__t:name})
          .exec(async (err,data)=>{
            if(err || !data){
              console.log(err);
              next()
            }
            else{
              arr.push(data)
            await Base.findOne().sort({_id:-1}).limit(1).where({__t:name})
                    .exec((err,last)=>{ 
                      if(err || !last){
                        console.log(err);
                        next()
                      }
                      else{
                        arr.push(last)
                      }
                      res.status(200).json(arr);
                    })  
            } 
           })
})
module.exports = router;
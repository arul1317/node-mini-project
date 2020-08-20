const express = require('express');
const router = express.Router();
const Base = require('../model/Base');
const User = require('../model/Datacsv');
const CSV2 = require('../model/Productcsv');
const Service = require('../model/Servicecsv');
const Sio = require('../model/Siocsv');
const Voice = require('../model/Voicecsv');
const Sample = require('../model/user');

/*Put route for all the files*/
router.put('/upload/:filename',
    async (req, res, next) => {
      var file = req.params.filename;
      console.log(req.body);
        try {
          switch(file){
            case 'CDR_BLACKHAWK_DATA_20200617_084351.dat':{
              await  User.insertMany(req.body,(err,resp)=>{
                if (err) throw err;
                res.json(resp);
            });
             break;
            }
            case 'CDR_BLACKHAWK_PRODUCT_20200617_073703.dat' :{
              await  CSV2.insertMany(req.body,(err,resp)=>{
                if (err) throw err;
                res.json(resp);
            });
             break;              
            }
            case 'sample.csv' :{
             await  Sample.insertMany(req.body,(err,resp)=>{
                 if (err) throw err;
                 res.json(resp);
             });
              break;
            }
            case 'CDR_BLACKHAWK_SERVICE_20200617_073703.dat' :{
              await  Service.insertMany(req.body,(err,resp)=>{
                if (err) throw err;
                res.json(resp);
            });
             break;
            }
            case 'CDR_BLACKHAWK_SIO_20200618_060000.dat' :{
              await  Sio.insertMany(req.body,(err,resp)=>{
                if (err) throw err;
                res.json(resp);
            });
             break;
             }
            default :
            await  Voice.insertMany(req.body,(err,resp)=>{
              if (err) throw err;
              res.json(resp);
          });         
         }
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
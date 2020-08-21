
const Data = require('../models/dbmodels').data;
const readdata = require('../fileprocessing/readcsv').readdata;
const fs = require('fs');
const es = require('event-stream');

const router = require('express').Router();

var JSONStream = require('JSONStream');

router.post(
	'/', 
	(request, response, next) => {
		try {
			readdata();
			const jsonfile = './sampledata/CDR_BLACKHAWK_DATA_20200617_084351.json';
			var lastfilesize = 0;
			const writeInterval = setInterval(()=>{
				var currentfilesize = fs.statSync(jsonfile).size;
				var sizechange = currentfilesize - lastfilesize;
				if(sizechange==0) {
					clearInterval(writeInterval);
					var counter=0;
					bulk = Data.collection.initializeOrderedBulkOp();
					var stream = fs.createReadStream(jsonfile, {encoding:'utf8'}, {flags: 'r'});
					stream
					.pipe(JSONStream.parse('*'))
					.pipe( es.mapSync( function(line) {
						bulk.insert( new Data(line) );
						counter++;
						if(counter==1000) {
							bulk.execute();
							counter=0;
							bulk = Data.collection.initializeOrderedBulkOp();
						}
					}) )
					.on('end', async()=> {
						if(counter>0)
							await bulk.execute();
						fs.unlinkSync(jsonfile);
						await Data.find().sort({_id:1}).limit(1).exec( function(err, record) {
							if(err)
								console.log(err);
							console.log('First record:');
							console.log(record);
						})
						Data.find().sort({_id:-1}).limit(1).exec( function(err, record) {
							if(err)
								console.log(err);
							console.log('Last record:');
							console.log(record);
						})						
					});	
				}
				lastfilesize = currentfilesize;
			}, 10000);
			response.write('data records inserted.');			
		} catch(e) {
			throw e;
		}		
});

router.get(
  '/:id', async (req, res, next) => {
    try {
		const data = await Data.findById(req.params.id);
		console.log('Find data record by id: ', req.params.id);
		if(!data)
			res.status(404).send('Item not Found');
		else
			res.json(data);
	} catch (e) {
      next(e);
    }
  });

module.exports = router;
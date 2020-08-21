
const Service = require('../models/dbmodels').service;
const readservice = require('../fileprocessing/readcsv').readservice;
const fs = require('fs');
const es = require('event-stream');

const router = require('express').Router();

var JSONStream = require('JSONStream');

router.post(
	'/', 
	(request, response, next) => {
		try {
			readservice();
			const jsonfile = './sampledata/CDR_BLACKHAWK_SERVICE_20200617_073703.json';
			var lastfilesize = 0;
			const writeInterval = setInterval(()=>{
				var currentfilesize = fs.statSync(jsonfile).size;
				var sizechange = currentfilesize - lastfilesize;
				if(sizechange==0) {
					clearInterval(writeInterval);
					var counter=0;
					bulk = Service.collection.initializeOrderedBulkOp();
					var stream = fs.createReadStream(jsonfile, {encoding:'utf8'}, {flags: 'r'});
					stream
					.pipe(JSONStream.parse('*'))
					.pipe( es.mapSync( function(line) {
						bulk.insert( new Service(line) );
						counter++;
						if(counter==1000) {
							bulk.execute();
							counter=0;
							bulk = Service.collection.initializeOrderedBulkOp();
						}
					}) )
					.on('end', async()=> {
						if(counter>0)
							await bulk.execute();
						fs.unlinkSync(jsonfile);
						await Service.find().sort({_id:1}).limit(1).exec( function(err, record) {
							if(err)
								console.log(err);
							console.log('First record:');
							console.log(record);
						})
						Service.find().sort({_id:-1}).limit(1).exec( function(err, record) {
							if(err)
								console.log(err);
							console.log('Last record:');
							console.log(record);
						})						
					});	
				}
				lastfilesize = currentfilesize;
			}, 10000);
			response.write('Service records inserted.');	
		} catch(e) {
			throw e;
		}		
});

router.get(
  '/:id', async (req, res, next) => {
    try {
		const service = await Service.findById(req.params.id);
		console.log('Find service record by id: ', req.params.id);
		if(!service)
			res.status(404).send('Item not Found');
		else
			res.json(service);
	} catch (e) {
      next(e);
    }
  });

module.exports = router;
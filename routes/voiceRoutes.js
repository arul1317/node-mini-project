
const Voice = require('../models/dbmodels').voice;
const readvoice = require('../fileprocessing/readcsv').readvoice;
const fs = require('fs');
const es = require('event-stream');

const router = require('express').Router();

var JSONStream = require('JSONStream');

router.post(
	'/', 
	(request, response, next) => {
		try {
			readvoice();
			const jsonfile = './sampledata/CDR_BLACKHAWK_VOICE_20200617_084000.json';
			var lastfilesize = 0;
			const writeInterval = setInterval(()=>{
				var currentfilesize = fs.statSync(jsonfile).size;
				var sizechange = currentfilesize - lastfilesize;
				if(sizechange==0) {
					clearInterval(writeInterval);
					var counter=0;
					bulk = Voice.collection.initializeOrderedBulkOp();
					var stream = fs.createReadStream(jsonfile, {encoding:'utf8'}, {flags: 'r'});
					stream
					.pipe(JSONStream.parse('*'))
					.pipe( es.mapSync( function(line) {
						bulk.insert( new Voice(line) );
						counter++;
						if(counter==1000) {
							bulk.execute();
							counter=0;
							bulk = Voice.collection.initializeOrderedBulkOp();
						}
					}) )
					.on('end', async()=> {
						if(counter>0)
							await bulk.execute();
						fs.unlinkSync(jsonfile);
						await Voice.find().sort({_id:1}).limit(1).exec( function(err, record) {
							if(err)
								console.log(err);
							console.log('First record:');
							console.log(record);
						})
						Voice.find().sort({_id:-1}).limit(1).exec( function(err, record) {
							if(err)
								console.log(err);
							console.log('Last record:');
							console.log(record);
						})
					});	
				}
				lastfilesize = currentfilesize;
			}, 10000);
			response.write('Voice records inserted.');			
		} catch(e) {
			throw e;
		}		
});

router.get(
  '/:id', async (req, res, next) => {
    try {
		const voice = await Voice.findById(req.params.id);
		console.log('Find voice record by id: ', req.params.id);
		if(!voice)
			res.status(404).send('Item not Found');
		else
			res.json(voice);
	} catch (e) {
      next(e);
    }
  });

module.exports = router;

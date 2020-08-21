
const User = require('../models/dbmodels').user;
const readuser = require('../fileprocessing/readcsv').readuser;
const fs = require('fs');
const es = require('event-stream');

const router = require('express').Router();

var JSONStream = require('JSONStream');

router.post(
	'/', 
	(request, response, next) => {
		try {
			readuser();
			const jsonfile = './sampledata/USER_SAMPLES.json';
			var lastfilesize = 0;
			const writeInterval = setInterval(()=>{
				var currentfilesize = fs.statSync(jsonfile).size;
				var sizechange = currentfilesize - lastfilesize;
				if(sizechange==0) {
					clearInterval(writeInterval);
					var counter=0;
					bulk = User.collection.initializeOrderedBulkOp();
					var stream = fs.createReadStream(jsonfile, {encoding:'utf8'}, {flags: 'r'});
					stream
					.pipe(es.split(" "))
					.pipe(JSONStream.parse('*'))
					.pipe( es.mapSync( function(line) {
						bulk.insert( new User(line) );
						counter++;
						if(counter==1000) {
							bulk.execute();
							counter=0;
							bulk = User.collection.initializeOrderedBulkOp();
						}
					}) )
					.on('end', async()=> {
						if(counter>0)
							await bulk.execute();
						fs.unlinkSync(jsonfile);
						await User.find().sort({_id:1}).limit(1).exec( function(err, record) {
							if(err)
								console.log(err);
							console.log('First record:');
							console.log(record);
						})
						User.find().sort({_id:-1}).limit(1).exec( function(err, record) {
							if(err)
								console.log(err);
							console.log('Last record:');
							console.log(record);
						})						
					});	
				}
				lastfilesize = currentfilesize;
			}, 10000);
			response.write('User records inserted.');	
		} catch(e) {
			throw e;
		}		
});

router.get(
  '/:id', async (req, res, next) => {
    try {
		const user = await User.findById(req.params.id);
		console.log('Find user record by id: ', req.params.id);
		if(!user)
			res.status(404).send('Item not Found');
		else
			res.json(user);
	} catch (e) {
      next(e);
    }
  });

module.exports = router;
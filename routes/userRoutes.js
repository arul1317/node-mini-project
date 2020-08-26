
const User = require('../models/dbmodels').user;
const fs = require('fs');
const es = require('event-stream');
const router = require('express').Router();
var JSONStream = require('JSONStream');

router.post(
	'/', 
	(request, response, next) => {
		try {
			const jsonfile = './sampledata/temp.json';
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
				stream.close();
				fs.unlinkSync(jsonfile);
				await User.find().sort({_id:1}).limit(1).exec( function(err, record) {
					if(err)
						console.log(err);
					console.log('First USER record in database:');
					console.log(record);
				})
				User.find().sort({_id:-1}).limit(1).exec( function(err, record) {
					if(err)
						console.log(err);
					console.log('Last USER record in database:');
					console.log(record);
				})
			});	
			response.write('USER records inserted.');	
		} catch(e) {
			throw e;
		}		
});

module.exports = router;
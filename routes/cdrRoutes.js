
const fs = require('fs');
const es = require('event-stream');
const router = require('express').Router();
var JSONStream = require('JSONStream');

router.post(
	'/:typeofdata', 
	(request, response, next) => {
		try {
			var key = request.params.typeofdata;
			switch(key) {
				case 'VOICE': {
					var Model = require('../models/dbmodels').voice;
					break;
				}
				case 'DATA': {
					var Model = require('../models/dbmodels').data;
					break;
				}	
				case 'SIO': {
					var Model = require('../models/dbmodels').sio;
					break;
				}
				case 'SERVICE': {
					var Model = require('../models/dbmodels').service;
					break;
				}			
				case 'PRODUCT': {
					var Model = require('../models/dbmodels').product;
					break;
				}				
			}
			const jsonfile = './sampledata/temp.json';
			var counter=0;
			var bulk = Model.collection.initializeOrderedBulkOp();
			var stream = fs.createReadStream(jsonfile, {encoding:'utf8'}, {flags: 'r'});
			stream
			.pipe(JSONStream.parse('*'))
			.pipe( es.mapSync( function(line) {
				bulk.insert( new Model(line) );
				counter++;
				if(counter==1000) {
					bulk.execute();
					counter=0;
					bulk = Model.collection.initializeOrderedBulkOp();
				}
			}) )
			.on('end', async()=> {
				if(counter>0)
					await bulk.execute();
				stream.close();
				fs.unlinkSync(jsonfile);
				var first = await Model.find().sort({_id:1}).limit(1);
				var last = await Model.find().sort({_id:-1}).limit(1);
				response.send({
					"First record":first,
					"Last record":last
				}); 
			});			
		} catch(e) {
			throw e;
		}		
});

module.exports = router;


const fs = require('fs');
const csvjson = require('csvjson');
const request = require('request');
const Promise = require('promise'); 

module.exports.preprocess=(csvfile)=>{
	return new Promise(resolve => {
	try {
		const toObject = csvjson.stream.toObject();
		const stringify = csvjson.stream.stringify();
		if(csvfile.includes('USER')) {
			var key = 'user';
			var urlstring = `http://localhost:3000/${key}/`;
		} else {
			const myre = /^CDR_BLACKHAWK_([A-Z]+)_[0-9_]+\.csv$/;
			var key = myre.exec(csvfile)[1];
			var urlstring = `http://localhost:3000/cdr/${key}/`;
		}
		console.log(`File processing server converting ${key} records from csv to json.`);
		var stream1= fs.createReadStream('./sampledata/'+csvfile, 'utf-8');
		stream1
		.pipe(toObject)
		.pipe(stringify)
		.pipe(fs.createWriteStream('./sampledata/temp.json'));
		var lastfilesize = 0;
		const writeInterval = setInterval(()=>{
			var currentfilesize = fs.statSync('./sampledata/temp.json').size;
			var sizechange = currentfilesize - lastfilesize;			
			if(sizechange==0) {
				clearInterval(writeInterval);	
				stream1.close();
				fs.rename('./sampledata/'+csvfile, './archiveFolder/'+csvfile, function(err) {
					if (err) {
						console.log(err);
					} else {
						console.log(`${key} csv file archived.`);
					}
				});
				request.post({url: urlstring}, function(error, response, body){
					if (error) {
						console.log(error);
					} else{
						resolve(response.body);
					}
				});
			}
			lastfilesize = currentfilesize;
		}, 500);
	} catch(err) {
		throw err;
	}
	});
};


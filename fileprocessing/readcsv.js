
const fs = require('fs');
const csvjson = require('csvjson');
const toObject = csvjson.stream.toObject();
const stringify = csvjson.stream.stringify();

module.exports.readuser=() => {
	try {
		console.log('File processing server converting from csv to json.');
		var csvfile = 'USER_SAMPLES.csv';
		fs.createReadStream('./sampledata/'+csvfile, 'utf-8')
		.pipe(toObject)
		.pipe(stringify)
		.pipe(fs.createWriteStream('./sampledata/USER_SAMPLES.json'));
		fs.rename('./sampledata/'+csvfile, './archiveFolder/'+csvfile, function(err) {
			if (err) {
				console.log(err);
			}
			else {
				console.log('User csv file archived.');
			}
		});		
	} catch(err) {
		next(err);
	}
};

module.exports.readvoice=() => {
	try {
		console.log('File processing server converting from csv to json.');
		var csvfile = 'CDR_BLACKHAWK_VOICE_20200617_084000.csv';
		fs.createReadStream('./sampledata/'+csvfile, 'utf-8')
		.pipe(toObject)
		.pipe(stringify)
		.pipe(fs.createWriteStream('./sampledata/CDR_BLACKHAWK_VOICE_20200617_084000.json'));
		fs.rename('./sampledata/'+csvfile, './archiveFolder/'+csvfile, function(err) {
			if (err) {
				console.log(err);
			}
			else {
				console.log('Voice csv file archived.');
			}
		});
	} catch(err) {
		next(err);
	}
};

module.exports.readdata=() => {
	try {
		console.log('File processing server converting from csv to json.');
		var csvfile = 'CDR_BLACKHAWK_DATA_20200617_084351.csv';
		fs.createReadStream('./sampledata/'+csvfile, 'utf-8')
		.pipe(toObject)
		.pipe(stringify)
		.pipe(fs.createWriteStream('./sampledata/CDR_BLACKHAWK_DATA_20200617_084351.json'));
		fs.rename('./sampledata/'+csvfile, './archiveFolder/'+csvfile, function(err) {
			if (err) {
				console.log(err);
			}
			else {
				console.log('Data csv file archived.');
			}
		});		
	} catch(err) {
		next(err);
	}
};

module.exports.readsio=() => {
	try {
		console.log('File processing server converting from csv to json.');
		var csvfile = 'CDR_BLACKHAWK_SIO_20200618_060000.csv';
		fs.createReadStream('./sampledata/'+csvfile, 'utf-8')
		.pipe(toObject)
		.pipe(stringify)
		.pipe(fs.createWriteStream('./sampledata/CDR_BLACKHAWK_SIO_20200618_060000.json'));
		fs.rename('./sampledata/'+csvfile, './archiveFolder/'+csvfile, function(err) {
			if (err) {
				console.log(err);
			}
			else {
				console.log('Sio csv file archived.');
			}
		});		
	} catch(err) {
		next(err);
	}
};

module.exports.readservice=() => {
	try {
		console.log('File processing server converting from csv to json.');
		var csvfile = 'CDR_BLACKHAWK_SERVICE_20200617_073703.csv';
		fs.createReadStream('./sampledata/'+csvfile, 'utf-8')
		.pipe(toObject)
		.pipe(stringify)
		.pipe(fs.createWriteStream('./sampledata/CDR_BLACKHAWK_SERVICE_20200617_073703.json'));
		fs.rename('./sampledata/'+csvfile, './archiveFolder/'+csvfile, function(err) {
			if (err) {
				console.log(err);
			}
			else {
				console.log('Service csv file archived.');
			}
		});		
	} catch(err) {
		next(err);
	}
};

module.exports.readproduct=() => {
	try {
		console.log('File processing server converting from csv to json.');
		var csvfile = 'CDR_BLACKHAWK_PRODUCT_20200617_073703.csv';
		fs.createReadStream('./sampledata/'+csvfile, 'utf-8')
		.pipe(toObject)
		.pipe(stringify)
		.pipe(fs.createWriteStream('./sampledata/CDR_BLACKHAWK_PRODUCT_20200617_073703.json'));
		fs.rename('./sampledata/'+csvfile, './archiveFolder/'+csvfile, function(err) {
			if (err) {
				console.log(err);
			}
			else {
				console.log('Product csv file archived.');
			}
		});		
	} catch(err) {
		throw err;
	}
};



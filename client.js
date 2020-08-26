
const fs = require('fs');
const readcsv = require('./fileprocessing/readcsv');

const mainf = async()=>{
	try {
		const allfiles = fs.readdirSync( './sampledata');
		for( var f of allfiles ) {
			var res = await readcsv.preprocess(f);
			console.log(res);
		}
		console.log('All done');
	} catch(error){
		console.error(error);
	};	
}

mainf();
const path = require('path');
const fs = require('fs');
const mongodb = require("mongodb").MongoClient;
const csvtojson = require("csvtojson");
const moveFile = require('move-file');
const url = require('./config/database.config.js');
var express = require('express');
var app = express();

app.get('/', function (req, res) 
{
	mongodb.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("sara_db");
  dbo.collection("category").find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
	res.send(result);
    db.close();
  });
});
});


app.get('/verify', function (req, res) 
{
	var out=[];
	mongodb.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("sara_db");
  
  dbo.collection("category").findOne({}, function(err, result) {
	out.push(result);
});
dbo.collection('category').findOne({},{ sort: { _id: -1 } },(err, data) => {
	out.push(data);
	res.send(out);
  });
});
});

app.put('/', function (req, res) 
{
	//joining path of directory 
	const directoryPath = path.join(__dirname, 'csv_files');
	//passsing directoryPath and callback function
	//fs.readdir(directoryPath, function (err, files) 
	fs.readdir(directoryPath, function (err, files)
	{
		console.log(files);
		if(!isEmpty(files))
		{
			if (err) 
			{
				return console.log('Unable to scan directory: ' + err);
			} 
			//listing all files using forEach
			files.forEach(function (file) 
			{
				var src=__dirname+'\\csv_files\\'+file;
				var dest=__dirname+'\\archive\\'+file;
				
				csvtojson().fromFile(src).then(csvData => 
				{
					mongodb.connect(url,
					{
						useNewUrlParser: true, useUnifiedTopology: true 
					},
				  (err, client) => 
				  {
					if (err) 
						throw err;
					client.db("sara_db").collection("category").insertMany(csvData, (err, res) => 
					{
						if (err) 
							throw err;
						console.log(`Inserted: ${res.insertedCount} rows`);
						client.close();
						(async () => 
						{
							await moveFile(src, dest);
							//console.log(files +' has been moved to archive directory');
						})();
					});
				  });
				});
			});
			res.send({"Files " :files,"Message": "Data Inserted and File moved to archive folder!!!"});
		}
		else
		{
			res.send('No files in the directory!');
		}
	});
});

app.listen(3000, function () 
{
    console.log('Node server is running.. in port 3000');
});

function isEmpty(obj) 
{
    for(var key in obj) 
	{
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
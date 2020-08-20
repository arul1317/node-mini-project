Node JS Mini-project 


As part of this mini project we will create 2 Node js servers. 1st: Backend RESTful server will implement and provide REST API services to read and update data into a database, 2nd: File Processing server will read files and call the REST APIs provided by the backend RESTful server. 

  

Backend RESTful Server: 

Using Node Express.js create a server which provides get and put REST APIs. 
Using the attached sample files create json structure for the data to be used by REST APIs 
Using the attached sample file create the DB and the DB record structure 
Implement the “get” REST API by reading data from the database and convert it to JSON 
Implement the “put” REST API by updating / inserting data into database by converting the incoming JSON into the DB record structure. 

Note::::

below is starting tasks for bulk upload info to DB via RESTful server

write a nodejs script that reads a folder with multiple csv files. use fs.readdir(nodejs  (sample.csv attached)
convert the csv into json. use csvtojson npm module. (sample.json attached)
send the http request with converted json, using http npm module.
write a web server. use express npm module.
expose POST Endpoint, that accepts json (sample.json attached) and send success response if it is inserted to Mongo/ mysql DB.

 

File Processing Server:  

Copy attached 2 sample files into a folder (eg: c:\\temp\\mini-project).  
Read csv file using Node js methods. 
For each csv file in that folder, create a json array of records. For each record in that json array of records, send a http put request to Backend RESTful server, Log error code returned. 
Once all records from a csv file is sent to api, move that csv file to an archive folder, and also console log it. 
To verify that records have been inserted / updated successfully, call the http get function of the Backend RESTful server for the first and last record in DB and check that the returned value matches the first and last line in csv file. 

  

Note: Code should handle big csv files (csv of max 100K records). 

HINT: in case of 100k length json array, it will increase the memory footprint in local system(causing temporary hang), so use “Streams” to batch read and send http requests. with this method RESTful server benefits with reduced system load as well. 

HINT: use insertMany but if json array is of size 100K, use stream read and batched insertMany. 

  

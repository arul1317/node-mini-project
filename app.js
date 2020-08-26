
const app = require('express')();
const mongoose = require('mongoose');
const cdrRoutes = require('./routes/cdrRoutes');
const userRoutes = require('./routes/userRoutes');

app.use(function(req, res, next){
    req.setTimeout(30*60*1000);
    next();
});		

app.use('/cdr', cdrRoutes);
app.use('/user', userRoutes);

port = process.env.PORT || 3000;
//for setting PORT env variable, type this in cmd prompt: 'set PORT=5000', then ENter.
const server = app.listen(port, () => {
	try {
		console.log(`listening on port ${port}...`);
		mongoose.connect("mongodb://localhost:27017/test", {useNewUrlParser: true, useUnifiedTopology: true});
		console.log('Connected to mongodb database at port 27017');
	} catch(err) {
		throw(err);
	}
});
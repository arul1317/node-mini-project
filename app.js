
const app = require('express')();
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const dataRoutes = require('./routes/dataRoutes');
const voiceRoutes = require('./routes/voiceRoutes');
const sioRoutes = require('./routes/sioRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const productRoutes = require('./routes/productRoutes');

app.use('/user', userRoutes);
app.use('/data', dataRoutes);
app.use('/voice', voiceRoutes);
app.use('/sio', sioRoutes);
app.use('/product', productRoutes);
app.use('/service', serviceRoutes);

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
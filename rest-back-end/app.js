const express = require('express');
const mongo_start = require("./database");
const routes = require('./routes/index');
const { NotFoundError } = require('./lib/errors');

const app = express();

//startup mongodb
mongo_start();

app.use('/', express.json({ limit: '150mb' }));
app.use('/', routes);
app.use('/', (err, req, res, next) => {
  // default to 500 internal server error unless we've defined a specific error
  let code = 500;

  if (err instanceof NotFoundError) {
    code = 404;
  }
  res.status(code).json({
    message: err.message,
  });
});

const port = 3000;
app.listen(port, () => { console.log(`listening at ${port}`); })

module.exports = app;
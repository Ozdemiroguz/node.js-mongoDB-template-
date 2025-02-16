const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const db = require('./src/configs/database');
const routes = require('./src/routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

/** Middlewares */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    optionsSuccessStatus: 200,
  })
);

/** Routes */
app.get('/', (req, res) => {
  res.send('Hello World!');
});

routes(app);

app.use('*', (req, res, next) => {
  res.status(404).json({ error: { message: 'API not Found!' } });
});

/** Error Handler */
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).json({ error: { message: err?.message } });
});

db.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

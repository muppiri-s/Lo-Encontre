const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connectDB = require('./config/db_config');

// Load Config
dotenv.config({path: './config/.env'})

connectDB();
// // Routes
// app.use('/', require('./routes/routes'));

app.listen(5000);
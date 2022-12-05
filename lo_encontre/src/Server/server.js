require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/user/', userRoutes)
app.use('/api/category/', categoryRoutes)

// connect to db
// mongoose.connect(process.env.MONGO_URI).then(() => {
mongoose.connect("mongodb+srv://loEncontre:LoEncontre123@cluster0.fegvvyy.mongodb.net/").then(() => {
    app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
    })
}).catch((err) => {
    console.error('App starting error', err.stack);
})

app.listen(8000);
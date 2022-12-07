require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const dealsRoutes = require('./routes/deal')

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
  })

// routes
app.use('/api/user/', userRoutes)
app.use('/api/category/', categoryRoutes)
app.use('/api/deals', dealsRoutes)
// app.use('/app/deals/list/', dealsRoutes)

// connect to db
mongoose.connect("mongodb+srv://loEncontre:LoEncontre123@cluster0.fegvvyy.mongodb.net/UserProfile").then(() => {
    app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', 8000)
    })
}).catch((err) => {
    console.error('App starting error', err.stack);
})

app.listen(8000);
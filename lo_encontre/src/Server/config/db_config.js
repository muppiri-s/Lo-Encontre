const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const conn = await mongoose.connect("mongodb+srv://loEncontre:LoEncontre123@cluster0.fegvvyy.mongodb.net/", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(`Mongo DB Connected: ${conn.connection.host}`);
    } catch(err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;
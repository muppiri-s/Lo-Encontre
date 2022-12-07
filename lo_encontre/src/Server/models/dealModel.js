const mongoose = require('mongoose')

const Schema = mongoose.Schema

const dealSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    weight: {
        type: Number,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Deals', dealSchema)
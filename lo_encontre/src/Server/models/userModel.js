const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

// static signup method
userSchema.statics.signup = async function(email) {
    const exists = await this.findOne({email})
    if(exists) {
        throw Error('Email already in use')
    } 
    return user
}

module.exports = mongoose.model('User', userSchema)
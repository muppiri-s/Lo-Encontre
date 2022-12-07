const User = require('../models/userModel')

// login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.login(email, password)
        const user_id = user._id;
        res.status(200).json({email, user_id})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup a user
const signupUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.signup(email, user_id)
        const user_id = user._id;
        res.status(200).json({email, user_id})
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { loginUser, signupUser }
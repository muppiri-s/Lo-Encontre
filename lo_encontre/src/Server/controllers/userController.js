const User = require('../models/userModel')

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        // login not working?
        const user = await User.login(email, password)

        res.status(200).json({ email, user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

// signup user
const signupUser = async (req, res) => {
    const { email, password } = req.body

    try {
        // Email already in use is not working?
        const user = await User.signup(email, password)
        res.status(200).json({ email, user })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = { loginUser, signupUser }
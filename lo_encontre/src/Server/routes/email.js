const express = require('express');

// controller functions
const { emailController } = require('../controllers/emailController')

const router = express.Router()

// get email Route
router.get('/getemail', emailController)

module.exports = router
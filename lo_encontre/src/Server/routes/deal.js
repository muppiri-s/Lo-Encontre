const express = require('express')

const {
    getDeals,
    createDeal,
    deleteDeal,
} = require('../controllers/dealController')

const router = express.Router()

// GET all deals
router.get('/', getDeals)

// POST a new record
router.post('/', createDeal)

// DELETE a workout
router.delete('/:id', deleteDeal)

module.exports = router
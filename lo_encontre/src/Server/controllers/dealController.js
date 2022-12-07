const Deals = require('../models/dealModel')
const mongoose = require('mongoose')

// get all records
const getDeals = async (req, res) => {
  // console.log("Tets deal controller", res.user._id)
  const user_id = req.user
  // console.log("test id ",req.params)
  // const {user_id} = req.params
  const deal = await Deals.find({ user_id }).sort({ createdAt: -1 })

  res.status(200).json(deal)
}

// create new record
const createDeal = async (req, res) => {
  // const { title, weight, price } = req.body

  let title = req.body.title
  let weight = req.body.load
  let price = req.body.reps

// console.log("title", req)
  let emptyFields = []

  if (!title) {
    emptyFields.push('title')
  }
  if (!weight) {
    emptyFields.push('weight')
  }
  if (!price) {
    emptyFields.push('price')
  }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
  }

  try {
    const user_id = req.body.emailID
    // const deal = await deal.create({ title, load, reps, user_id })
    const deal = await Deals.create({ title, weight, price, email_id: user_id})
    res.status(200).json(deal)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a record
const deleteDeal = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such deals' })
  }

  const deal = await Deals.findOneAndDelete({ _id: id })

  if (!deal) {
    return res.status(400).json({ error: 'No such deal' })
  }

  res.status(200).json(deal)
}


module.exports = {
  getDeals,
  createDeal,
  deleteDeal,
}
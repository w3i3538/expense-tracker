const express = require('express')
const router = express.Router()

const categories = require('../../models/category')
const records = require('../../models/record')
const users = require('../../models/user')

let sortCategories

categories.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
        sortCategories = categories.map(category => category.category);
    })
    .catch(err => console.error(err))

router.get('/', (req, res) => {
    const userId = req.user._id

    records.find({ userId })
        .populate('categoryId')
        .lean()
        .sort({ _id: 'asc' })
        .then(records => {
            let totalCost = 0
            records.forEach(record => {
                totalCost += record.amount
            })
            return res.render('index', { records, categories: sortCategories, totalCost })
        })
        .catch(err => console.log(err))
})

module.exports = router
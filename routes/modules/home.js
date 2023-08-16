const express = require('express')
const router = express.Router()

const Categories = require('../../models/category')
const Records = require('../../models/record')
const Users = require('../../models/user')

let sortCategories

Categories.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(categories => {
        sortCategories = categories.map(category => category.category);
    })
    .catch(err => console.error(err))

router.get('/', (req, res) => {
    const userId = req.user._id

    Records.find({ userId })
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
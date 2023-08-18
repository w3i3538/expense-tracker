const express = require('express')
const router = express.Router()

const Categories = require('../../models/category')
const Records = require('../../models/record')
const Users = require('../../models/user')

router.get('/', async (req, res) => {
    const userId = req.user._id
    let sortCategories

    await Categories.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => {
            sortCategories = categories.map(category => category.category);
        })
        .catch(err => console.error(err))

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

router.get('/category', async (req, res) => {
    const userId = req.user._id
    const categoryName = req.query.sort
    let sortCategories

    await Categories.find()
        .lean()
        .sort({ _id: 'asc' })
        .then(categories => {
            sortCategories = categories.map(category => category.category);
        })
        .catch(err => console.error(err))

    Records.find({ userId })
        .populate('categoryId')
        .lean()
        .sort({ _id: 'asc' })
        .then(records => {
            if (categoryName === "") return records
            const filterRecords = records.filter(record => record.categoryId.category === categoryName)
            return filterRecords
        })
        .then(records => {
            let totalCost = 0
            records.forEach(record => {
                totalCost += record.amount
            })
            return res.render('index', { records, categories: sortCategories, totalCost })
        })
})
module.exports = router
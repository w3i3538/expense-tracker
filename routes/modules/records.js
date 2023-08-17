const express = require('express')
const router = express.Router()

const Records = require('../../models/record')
const Categories = require('../../models/category')

let sortCategories

Categories.find()
    .sort({ _id: 'asc' })
    .then(categories => {
        sortCategories = categories.map(category => ({
            id: category.id,
            category: category.category
        }))
    })
    .catch(err => console.error(err))

// 新增
router.get('/new', (req, res) => {
    return res.render("new", { categories: sortCategories })
})

// 新增
router.post('/', async (req, res) => {
    const userId = req.user._id

    return Records.create({ ...req.body, userId })
        .then(() => res.redirect("/"))
        .catch(err => console.log(err))
})


// 編輯
router.get('/:id/edit', (req, res) => {
    const { id } = req.params
    const userId = req.user._id

    return Records.findOne({ _id: id, userId })
        .populate('categoryId')
        .lean()
        .then(record => {
            res.render('edit', { record, categories: sortCategories })
        })
        .catch(err => console.log(err))
})

// 更新
router.put("/:id", (req, res) => {
    const { id } = req.params
    const userId = req.user._id

    return Records.findByIdAndUpdate({ _id: id, userId }, req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})


// 刪除
router.delete('/:id', (req, res) => {
    const { id } = req.params
    const userId = req.user._id

    return Records.findByIdAndDelete({ _id: id, userId })
        .then(() => res.redirect('/'))
        .catch((err) => console.log('err'))
})

module.exports = router
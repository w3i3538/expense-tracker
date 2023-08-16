const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const SEED_RECORDs = require("../../seed-records.json").records
const SEED_USERs = require("../../seed-users.json").users

const db = require('../../config/mongoose')
const user = require('../user')

db.once("open", async () => {

    try {
        // Seed User 建立
        await Promise.all(SEED_USERs.map(async SEED_USER => {
            const salt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(SEED_USER.password, salt)
            await User.create({
                name: SEED_USER.name,
                email: SEED_USER.email,
                password: hash
            })
        }))
        console.info('Seed_User done.')

        // Seed record 建立
        await Promise.all(SEED_RECORDs.map(async SEED_RECORD => {
            const user = await User.findOne({ name: SEED_RECORD.user })
            const category = await Category.findOne({ category: SEED_RECORD.category })
            await Record.create({
                name: SEED_RECORD.name,
                date: SEED_RECORD.date,
                amount: SEED_RECORD.amount,
                userId: user._id,
                categoryId: category._id
            })
        }))
        console.info('Seed_Record done.')
    } catch (err) {
        console.error(err)
    } finally {
        db.close()
    }

})
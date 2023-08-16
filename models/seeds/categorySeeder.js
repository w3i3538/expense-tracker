if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const Category = require('../category')
const SEED_CATEGORYs = require("../../seed-categories.json").categories

const db = require('../../config/mongoose')

db.once('open', async () => {
    try {
        await Promise.all(SEED_CATEGORYs.map(SEED_CATEGORY => (
            Category.create({
                category: SEED_CATEGORY.category,
                icon: SEED_CATEGORY.icon
            })

        )))
        console.info('Seed_Category done.')
    } catch (err) {
        console.error(err)
    } finally {
        db.close()
    }

})
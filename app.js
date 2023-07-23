const express = require('express')
const exphbs = require('express-handlebars')



if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


require('./config/mongoose')
const app = express()
const PORT = process.env.PORT || 3000

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use('/',(req,res)=>{
    res.render('index')
})

app.listen(PORT, ()=>{
    console.log(`App is running on http://localhost:${PORT}`)
})
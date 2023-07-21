const express = require('express')




if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}


require('./config/mongoose')
const app = express()
const PORT = process.env.PORT || 3000

app.use('/',(req,res)=>{
    res.send('home')
})

app.listen(PORT, ()=>{
    console.log(`App is running on http://localhost:${PORT}`)
})
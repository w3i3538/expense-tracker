const express = require('express')

const app = express()

app.use('/',(req,res)=>{
    res.send('home')
})

app.listen(3000, ()=>{
    console.log(`App is running on http://localhost:3000`)
})
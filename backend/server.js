const express = require('express')
const mongoose = require('mongoose')
const dotenv  = require('dotenv')
dotenv.config()
const cors = require('cors')
console.log('MONGO_URI exists:', !!process.env.MONGO_URI)
console.log('NODE_ENV:', process.env.NODE_ENV)

const app = express()

app.use(cors())
app.use(express.json())

const translateRoute = require('./routes/translate')
app.use('/api/translate',translateRoute)

// console.log('Route Registered')

const historyRoute = require('./routes/history')
app.use('/api/history', historyRoute)

app.get('/',(req,res) => {
    res.json({message : "NameScript API is running"})
})
const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("mongodb connected")

        app.listen(PORT, () =>{
            console.log(`Server is running on ${PORT}`)
        })
        
    })
    .catch((err) => {
        console.log(err) 

    })
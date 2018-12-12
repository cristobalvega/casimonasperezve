const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')

const vehicles = require('./routes/products')

mongoose.connect('mongodb://localhost:27017/vehicles', { useNewUrlParser: true })

const app = express()

app.use(morgan('dev'))

app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*")
    res.header("Access-Control-Allow-Headers","Origin, X-Request-With, Content-Type, Accept, Authorization")
    if(req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods","POST, PUT, PATCH, DELETE, GET")
        return res.status(200).json({})
    }
    next()
})

//Routes wich should handle request
app.use('/vehicles',vehicles)

app.use((req,res,next) => {
    const error = new Error('Not found')
    error.status= 404
    next(error)
})

app.use((error,req,res,next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app

const mongoose = require('mongoose')


const vehicles = mongoose.Schema({
    name: { type: String },
    description: { type: String },
    tires: Number,
    doors: Number,
    motors: Number,
    kilometers: Number
})

module.exports = mongoose.model('vehicles', productSchema)

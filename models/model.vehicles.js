const mongoose = require('mongoose')

const vehiclesSchema = mongoose.Schema({
    name: { type: String },
    description: { type: String },
    tires: Number,
    doors: Number,
    motors: Number,
    kilometers: Number,
    kilometers_initial: Number,
    kilometers_recorded: Number,
    kilometers_sealed: Number
})

module.exports = mongoose.model('vehicles', vehiclesSchema)

//IMPORTS
const express = require('express')
const router = express.Router()
const _vehicles = require('../models/vehicles')
const _ = require('underscore')

// Create all the vehicles
router.post('/init', (req, res) => {
    _.each(_.range(1, 10001, 1), x => {
        _vehicles.create({
            name: 'vehicles-' + x,
            description: 'Description of the vehicles ' + x,
            doors: _.random(0,4),
            kilometers_initial: _.random(1, 50), // Cuando el auto es nuevo, no tiene más de 50 kilometros
            kilometers_recorded: _.random(1, 100), // Cuando el carro está seminuevo
            kilometers_sealed: _.random(0, 1001) // Cuando el auto esta usado
        })
    })
    res.send('Autos creados')
})

//Get method to get all the vehicles created ever
router.get('/', (req, res) => {
    _vehicles.find()
        .then(vehicles => {
            vehicles ? res.json(vehicles) : res.send("No hay vehiculos")
        })
})


// Jugar con los kilometros para a venta de los automóviles
/*
 Kilometros = 0 == nuevo
 Kilometros = 5000 = seminuevo
 Kilometros = 10000 = usado
*/

router.get('/map/tires', (req, res) => {
    _vehicles.find()
        .then(vehicles => {
            vehicles ? res.json(vehicles.map(x => {
                x.kilometers_sealed = x.kilometers_initial - (x.kilometers_initial * (1 / x.kilometers_recorded))
                return x
            }
            )) :
                res.send("No hay Vehiculos por vender")
        })
})

router.get('/map/kilometers/:kilometers', (req, res) => {
    _vehicles.find()
        .then(vehicles => {
            vehicles ? res.json(vehicles.map(x => {
                x.kilometers_sealed = x.kilometers_initial + (x.kilometers_initial * (1 / req.params.kilometers))
                return x
            }
            )) :
                res.send("No hay Vehiculos por vender")
        })
})

router.get('/filter/doors', (req, res) => {
    _vehicles.find()
        .then(vehicles => {
            vehicles ? res.json(vehicles.filter(vehicles => vehicles.doors === 0)) :
                res.send("No hay Vehiculos por vender")
        })
})


// Jugar con los precios para el filter
/*
 PrecioDeAgencia = 200,000
 SalirDeLaAgencia = PrecioDeAgencia - 26.82%
 X Años de Uso = SalirDeLaAgencia - (x)(10%)
*/

router.get('/filter/name', (req, res) => {
    _vehicles.find()
        .then(vehicles => {
            vehicles ? res.json(vehicles.filter(vehicles => vehicles.name.length > 6)) :
                res.send("No hay Vehiculos por vender")
        })
})

router.get('/reduce/doors', (req, res) => {
    _vehicles.find()
        .then(vehicles => {
            vehicles ? res.json({ "vehicles": vehicles.map(vehicles => vehicles.doors).reduce((x, y) => x + y) }) :
                res.send("No hay Vehiculos por vender")
        })
})

router.get('/reduce/tires', (req, res) => {
    _vehicles.find()
        .then(vehicles => {
            vehicles ? res.json({ "vehicles": vehicles.map(vehicles => vehicles.tires).reduce((x, y) => x + y) }) :
                res.send("No hay Vehiculos por vender")
        })
})

module.exports = router

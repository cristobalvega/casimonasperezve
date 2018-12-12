//IMPORTS
const express = require('express')
const router = express.Router()
const _vehicles = require('../models/vehicles')
const mongoose = require('mongoose')
const _ = require('lodash')



//Get method to get all the products created ever
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
    _product.find()
        .then(products => {
            products ? res.json(products.map(x => {
                x.priceWithDiscount = x.price - (x.price * (1 / x.discount))
                return x
            }
            )) :
                res.send("No hay productos")
        })
})

router.get('/map/raise/:raise', (req, res) => {
    _product.find()
        .then(products => {
            products ? res.json(products.map(x => {
                x.priceWithRaise = x.price + (x.price * (1 / req.params.raise))
                return x
            }
            )) :
                res.send("No hay productos")
        })
})

router.get('/filter/stock', (req, res) => {
    _product.find()
        .then(products => {
            products ? res.json(products.filter(product => product.stock === 0)) :
                res.send("No hay productos")
        })
})


// Jugar con los precios para el filter
/*
 PrecioDeAgencia = 200,000
 SalirDeLaAgencia = PrecioDeAgencia - 26.82%
 X Años de Uso = SalirDeLaAgencia - (x)(10%)
*/

router.get('/filter/name', (req, res) => {
    _product.find()
        .then(products => {
            products ? res.json(products.filter(product => product.name.length > 6)) :
                res.send("No hay productos")
        })
})

router.get('/reduce/stock', (req, res) => {
    _product.find()
        .then(products => {
            products ? res.json({ "products": products.map(product => product.stock).reduce((x, y) => x + y) }) :
                res.send("No hay productos")
        })
})

router.get('/reduce/price', (req, res) => {
    _product.find()
        .then(products => {
            products ? res.json({ "products": products.map(product => product.price).reduce((x, y) => x + y) }) :
                res.send("No hay productos")
        })
})

router.post('/init', (req, res) => {
    _.each(_.range(1, 10001, 1), x => {
        _product.create({
            name: 'Product-' + x,
            description: 'Description of the product ' + x,
            price: _.random(1, 1001, true),
            discount: _.random(1, 41),
            stock: _.random(0, 1001)
        })
    })
    res.send('Initialized data')
})

module.exports = router

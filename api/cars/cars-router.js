// DO YOUR MAGIC
const express = require('express');
const knex = require('knex');

const Car = require('./cars-model')

const router = express.Router();

router.get('/', (req, res) => {
    Car.getAll()
        .then(cars => {
            res.json(cars)
        })
})



module.exports = router
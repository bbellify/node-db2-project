// DO YOUR MAGIC
const express = require('express');
const knex = require('knex');

const Car = require('./cars-model')

const {
    checkCarId,
    checkCarPayload,
    checkVinNumberValid,
    checkVinNumberUnique,
} = require('./cars-middleware')


const router = express.Router();

router.get('/', (req, res, next) => {
    Car.getAll()
        .then(cars => {
            if (!cars) {
                next({ status: 404, message: 'no cars found'})
            } else {
                res.json(cars)
            }
        })
        .catch(next)
})

router.get('/:id', checkCarId, (req, res) => {
    res.json(req.body.car)
})

router.post('/', checkCarPayload, checkVinNumberValid, (req, res, next) => {
    Car.create(req.body)
        .then(car => {
            res.status(201).json(car)
        })
        .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 400).json({
        message: `${err.message}`,
        stack: err.stack
    })
})



module.exports = router
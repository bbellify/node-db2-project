const Car = require('./cars-model')

const vinValidator = require('vin-validator')

const checkCarId = (req, res, next) => {
  const id = Number(req.params.id)
  
  Car.getAll()
    .then(rows => {
      const car = rows.find(car => car['id'] === id)
      if (!car) {
        next({ status: 404, message: `car with id ${req.params.id} is not found`})
      } else {
        req.body.car = car
        next()
      }
    })
    .catch(next)
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body

  if (vin === undefined ) {
    next({ error: 400, message: `vin is missing`})
  } else if (make === undefined ) {
    next({ error: 400, message: `make is missing`})
  } else if (model === undefined ) {
    next({ error: 400, message: `model is missing`})
  } else if (mileage === undefined ) {
    next({ error: 400, message: `mileage is missing`})
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const { vin } = req.body
  const isValid = vinValidator.validate(vin)

  if (!isValid) {
    next({ error: 400, message: `vin ${vin} is invalid`, })
  } else {
    next()
  }
}

const checkVinNumberUnique = (req, res, next) => {
  Car.getAll()
    .then(rows => {
      const isTaken = rows.find(car => car['vin'] === req.body.vin)
      if (isTaken) {
        next({ error: 400, message: `vin ${req.body.vin} already exists`})
      } else {
        next()
      }
    })
    .catch(next)
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}
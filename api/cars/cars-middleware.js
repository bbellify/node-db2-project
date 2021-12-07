const Car = require('./cars-model')

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
  // DO YOUR MAGIC
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkVinNumberUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}
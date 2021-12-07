const db = require('../../data/db-config')

const getAll = async () => {
  const rows = await db('cars')
  return rows
}

const getById = async (id) => {
  const [rec] = await db('cars')
    .where('id', id)
    return rec
}

const create = async (newInfo) => {
  // insert into cars (columns) values (values)
  const [newId] = await db('cars').insert(newInfo)
  
  const newCar = await getById(newId)
  return newCar
}

module.exports = {
  getAll,
  getById,
  create,
}
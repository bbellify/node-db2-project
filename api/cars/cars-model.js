const db = require('../../data/db-config')

const getAll = async () => {
  const rows = await db('cars')
  return rows
}

const getById = () => {
  // DO YOUR MAGIC
}

const create = () => {
  // DO YOUR MAGIC
}

module.exports = {
  getAll,
  getById,
  create,
}
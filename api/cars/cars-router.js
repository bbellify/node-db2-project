// DO YOUR MAGIC
const express = require('express');
const knex = require('knex');


const router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'hi' })
})



module.exports = router
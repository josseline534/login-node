'use strict'
const express = require('express')
const route = express.Router()

const controller = require('../controllers/user')

route.get('/', controller.init)

module.exports = route
'use strict'
const express = require('express')
const route = express.Router()

const controller = require('../controllers/user')

// metodo get
route.get('/', controller.init)
route.get('/login', controller.login)
route.get('/register', controller.register)
route.get('/profile', controller.profile)
route.get('/logout', controller.logout)

// metodo post
route.post('/login', controller.signIn)
route.post('/register', controller.signUp)


module.exports = route
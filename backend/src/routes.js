const express = require('express')
const routes = express.Router()
const PersonController = require('./controllers/PersonController')
const UserController = require('./controllers/UserController')

// User Routes
routes.post('/user/register', UserController.store)
routes.get('/user/login', UserController.login)
routes.get('/user/check', UserController.auth , UserController.check)

// Pages Routes

routes.get('/', UserController.auth, PersonController.index)
routes.post('/add', PersonController.store)
routes.get('/show', PersonController.show)
routes.post('/update', PersonController.update)
routes.delete('/delete', PersonController.delete)
routes.get('/filter', PersonController.filter)



module.exports = routes
const express = require('express')
const routes = express.Router()
const PersonController = require('./controllers/PersonController')

routes.get('/', PersonController.index)
routes.post('/add', PersonController.store)
routes.post('/show', PersonController.show)
routes.post('/update', PersonController.update)
routes.post('/delete', PersonController.delete)

module.exports = routes
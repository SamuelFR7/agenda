const express = require('express')
const routes = express.Router()
const PersonController = require('./controllers/PersonController')

routes.get('/', PersonController.index)
routes.post('/add', PersonController.store)
routes.get('/show', PersonController.show)
routes.post('/update', PersonController.update)
routes.delete('/delete', PersonController.delete)

module.exports = routes
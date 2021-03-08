const connection = require('./db')
const express = require('express')
const router = express.Router()
const CategoryController = require('./controllers/CategoryController')
const AuthorController = require('./controllers/AuthorController')
// const BookController = require('./controllers/BookController')

router.post('/categoria/nova',CategoryController.create)
router.get('/categorias/', CategoryController.index)
router.get('/categoria/:id', CategoryController.find)
router.put('/categoria/:id/atualizar',CategoryController.update)
router.delete('/categoria/:id/remover',CategoryController.delete)

router.post('/autor/novo',AuthorController.create)
router.get('/autores/', AuthorController.index)
router.get('/autor/:id', AuthorController.find)
router.put('/autor/:id/atualizar',AuthorController.update)
router.delete('/autor/:id/remover',AuthorController.delete)





module.exports = router

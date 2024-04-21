import cors from 'cors'
import express from 'express'

import {
	CardsController,
	StatisticsController,
	UserController,
	WordsController,
} from './controllers/controllers.js'
import { checkAuth, handleValidationErrors } from './utils/utils.js'
import { UserValidations } from './validations/validations.js'

const app = express()

app.use(express.json())
app.use(cors())

app.post(
	'/api/auth/login',
	UserValidations.loginValid,
	handleValidationErrors,
	UserController.login
)
app.post(
	'/api/auth/register',
	UserValidations.registerValid,
	handleValidationErrors,
	UserController.register
)
app.get('/api/auth/me', checkAuth, UserController.getMe)
app.patch('/api/auth/update', checkAuth, UserController.updateMe)
app.patch('/api/auth/pay', checkAuth, UserController.pay)
// FIXME:
app.delete('/api/auth/delete', checkAuth, UserController.remove)

app.post('/api/cards', checkAuth, CardsController.create)
app.get('/api/cards', CardsController.getAll)
app.get('/api/cards/:id', CardsController.getOne)
// FIXME:
app.patch('/api/cards/:id', CardsController.update)

app.get('/api/words', WordsController.getAll)

// FIXME:
app.put('/api/statistics', checkAuth, StatisticsController.update)

app.listen(5000, err => {
	if (err) {
		return console.log(err)
	}

	console.log('Server Ok')
})

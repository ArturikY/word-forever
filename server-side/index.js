import cors from 'cors'
import express from 'express'

import {
	CardsController,
	StatisticsController,
	UserController,
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

app.post('/api/cards', CardsController.create)

app.post('/api/statistics', StatisticsController.create)

app.listen(5500, err => {
	if (err) {
		return console.log(err)
	}

	console.log('Server Ok')
})

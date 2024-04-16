import cors from 'cors'
import express from 'express'

import {
	UserController,
	CardsController,
	StatisticsController,
} from './controllers/controllers.js'
import { checkAuth } from './utils/utils.js'

const app = express()

app.use(express.json())
app.use(cors({
	origin: "*",
	methods: ["GET", "POST"],
	allowedHeaders: ['Content-type', 'Authorization'],
	credentials: true,
}))

app.post('/api/auth/login', UserController.login)
app.post('/api/auth/register', UserController.register)
app.get('/api/auth/me', checkAuth, UserController.getMe)
app.patch('/api/auth/update', checkAuth, UserController.updateMe)

app.post('/api/cards', CardsController.create)

app.post('/api/statistics', StatisticsController.create)

app.listen(5500, err => {
	if (err) {
		return console.log(err)
	}

	console.log('Server Ok')
})

import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export const register = async (req, res) => {
	try {
		const user = await prisma.user.create({
			data: {
				login: req.body.login,
				password: req.body.password,
				child_name: req.body.child_name,
			},
			include: {
				statistics: true,
				cards: true,
			},
		})

		const token = jwt.sign(
			{
				id: user.id,
			},
			'words_secret_123',
			{
				expiresIn: '30d',
			}
		)

		res.json({ ...user, token })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed registration',
		})
	}
}

export const login = async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				login: req.body.login,
				password: req.body.password,
			},
			include: {
				statistics: true,
				cards: true,
			},
		})

		if (!user) {
			return res.status(404).json({
				message: 'User not found',
			})
		}

		const token = jwt.sign(
			{
				id: user.id,
			},
			'words_secret_123',
			{
				expiresIn: '30d',
			}
		)

		res.json({ ...user, token })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed authorization',
		})
	}
}

export const getMe = async (req, res) => {
	try {
		const user = await prisma.user.findUnique({
			where: {
				id: req.userId,
			},
			include: {
				statistics: true,
				cards: true,
			},
		})

		if (!user) {
			return res.status(404).json({ message: 'User not found' })
		}

		res.json({ ...user })
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'No access',
		})
	}
}

export const updateMe = async (req, res) => {
	try {
		const user = await prisma.user.update({
			where: {
				id: req.userId,
			},
			data: {
				login: req.body.login,
				password: req.body.password,
				child_name: req.body.child_name,
			},
			include: {
				statistics: true,
				cards: true,
			},
		})
		res.json({
			success: true,
			user: user,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to update a user',
		})
	}
}

export const pay = async (req, res) => {
	try {
		const user = await prisma.user.update({
			where: {
				id: req.userId,
			},
			data: {
				date_over: req.body.date_over,
				isTrial: true,
			},
		})
		res.json({
			...user,
			success: true,
		})
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to pay',
		})
	}
}

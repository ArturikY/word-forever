import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const create = async (req, res) => {
	try {
		const card = await prisma.card.create({
			data: {
				number: req.body.number,
				words: req.body.words,
				user: { connect: { id: req.userId } },
			},
			include: {
				user: include,
				words: include,
			},
		})
		res.json(card)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to create a card',
		})
	}
}

/* export const remove = async (req, res) => {
	try {
		const card = await prisma.card.delete({
			where: {
				id:
			}
		})
	} catch (err) {
		
	}
} */

/* export const getAll = async (req, res) => {
	try {
		const cards = await prisma.card.findMany()
		res.json(cards)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to get cards',
		})
	}
} */

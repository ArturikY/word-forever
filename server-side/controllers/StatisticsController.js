import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const create = async (req, res) => {
	try {
		const card = await prisma.statistics.create({
			data: {
				word: req.body.word,
				errors_count: req.body.errors_count,
				user: { connect: { id: req.userId } },
			},
			include: {
				user: include,
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

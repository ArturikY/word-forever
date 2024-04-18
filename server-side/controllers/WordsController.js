import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAll = async (req, res) => {
	try {
		const words = await prisma.word.findMany()
		res.json(words)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to get words',
		})
	}
}

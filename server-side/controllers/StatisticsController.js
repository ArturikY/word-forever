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

// FIXME:
export const getAll = async (req, res) => {
	try {
		const statistics = await prisma.statistics.findMany()
		res.json(statistics)
	} catch (err) {
		console.log(err)
		res.status(500).json({
			message: 'Failed to get statistics',
		})
	}
}

// FIXME:
export const update = async (req, res) => { 
    try { 
        const newWords = req.body.words; 
 
        // Получаем текущую статистику пользователя 
        const user = await prisma.user.findUnique({ 
            where: { 
                id: req.userId, 
            }, 
            include: { 
                statistics: true, 
            }, 
        }); 
 
        // Формируем массив объектов для обновления статистики 
        const statisticsUpdateData = newWords.map(word => { 
            const existingStatistic = user.statistics.find(statistic => statistic.word === word); 
            if (existingStatistic) { 
                return { 
                    where: { id: existingStatistic.id }, // Используем ID существующей статистики для обновления 
                    data: { errors_count: { increment: 1 } }, // Увеличиваем счетчик ошибок на 1 
                }; 
            } else { 
                return { 
                    data: { word: word, errors_count: 1 }, // Добавляем новую статистику с ошибкой 1 
                }; 
            } 
        }); 
 
        // Обновляем статистику пользователя 
        const updatedUser = await prisma.user.update({ 
            where: { 
                id: req.userId, 
            }, 
            data: { 
                statistics: { 
                    upsert: statisticsUpdateData, // Используем upsert для обновления или вставки статистики 
                }, 
            }, 
            include: { 
                statistics: true, 
            }, 
        }); 
 
        res.json(updatedUser.statistics); 
    } catch (err) { 
        console.log(err); 
        res.status(500).json({ 
            message: 'Failed to update statistics', 
        }); 
    } 
};

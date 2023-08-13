import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { user_fav_mvtv } = req.query;
        const [mvtvType, userId, mvtvId] = user_fav_mvtv || []
        let userDB = null;

        try {
            userDB = await prisma.user.findFirst({
                where: {
                    id: parseInt(userId)
                }
            })

            (userDB.length == 0) && res.status(200).json({ error: 'User not found', message: 'The requested user does not exist.' });

        } catch (error) {
            isNaN(parseInt(userId)) && res.status(200).json({ error: 'Invalid data passed', message: 'Please enter valid data' });
            res.status(200).json({ error: 'User not found', message: 'The requested user does not exist.' });
        }

        try {
            const mvtv = await prisma.userFavourites.findMany({
                where: {
                    userId: parseInt(userDB.id),
                    itemId: parseInt(mvtvId),
                    itemType: mvtvType
                }
            });
            res.status(201).json(mvtv);

        } catch (error) {
            res.status(200).json({ data: {} });
        }

    }
    else if (req.method === 'POST') {
        const { user_fav_mvtv } = req.query;
        const [mvtvType, userId, mvtvId] = user_fav_mvtv || []

        try {
            const mvtv = await prisma.userFavourites.create({
                data: {
                    userId: parseInt(userId),
                    itemId: parseInt(mvtvId),
                    itemType: mvtvType,
                },
            });
            res.status(201).json(mvtv);

        } catch (error) {
            res.status(500).end();
        }

    } else if (req.method === 'DELETE') {
        const { user_fav_mvtv } = req.query;
        const [mvtvType, userId, mvtvId] = user_fav_mvtv || []

        try {
            const mvtv = await prisma.userFavourites.deleteMany({
                where: { userId: parseInt(userId), itemId: parseInt(mvtvId), itemType: mvtvType }
            });
            res.status(204).end()
        } catch (error) {
            res.status(500).end();
        }
    } else {
        res.status(405).end(); // Method not allowed
    }/*else if (req.method === 'PUT') {
        const { id, isFavorite } = req.body;
        const movie = await prisma.movie.update({
            where: { id },
            data: { isFavorite },
        });
        res.status(200).json(movie);
    } else if (req.method === 'DELETE') {
        const { id } = req.body;
        await prisma.movie.delete({
            where: { id },
        });
        res.status(204).send();
    } else {
        res.status(405).end(); // Method not allowed
    }*/
}
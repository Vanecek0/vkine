import { PrismaClient } from "@prisma/client";
import { NextApiRequest as req, NextApiResponse as res } from "next";

export default async function getUser(req, res) {
    const prisma = new PrismaClient();

        const users = await prisma.user.findFirst({
            where: {
                username: req.query.uID
            },
            select: {
                username: true,
                name: true,
                email: true
            }
        })

    if (req.method !== 'GET') {
        res.status(500).json({ message: 'Sorry we only accept GET request.' })
    }
    res.json({ 
        results: users,
    });
}
import { PrismaClient } from '@prisma/client';
import { getSession, signOut, useSession } from 'next-auth/react';
import set from 'date-fns/set'

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' });
        return;
    }
    const prisma = new PrismaClient();
    try {
        const birthday = req.body.birthday.split('-');
        const newUser = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                isActive: true,
                provider: req.body.provider,
                createdAt: set(new Date(), { hours: 23, minutes: 59 }),
                userData: {
                    create: {
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        nickname: req.body.username,
                        bio: '',
                        birthday: set(new Date(birthday[0], birthday[1] - 1, birthday[2]), { hours: 23, minutes: 59 }),
                        phoneNumber: req.body.phone,
                        country: req.body.locale.code,
                        gender: parseInt(req.body.gender),
                        updatedAt: set(new Date(), { hours: 23, minutes: 59 })
                    }
                }
            }
        });

        res.status(200).json({ message: 'Success' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong' });
    } finally {
        await prisma.$disconnect();
    }
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    return {
        props: { data: {} }
    }
}
import { PrismaClient } from '@prisma/client';
import { getSession, useSession } from 'next-auth/react';
import React from 'react'

export default function userIndex({ data }) {
    const session = useSession();
    return (
        <div>index</div>
    )
}

export const getServerSideProps = async (context) => {
    const session = await getSession(context);
    const prisma = new PrismaClient();
    if (session) {
        try {
            const userData = await prisma.user.findFirst({
                where: {
                    email: session.user.email
                },
                select: {
                    username: true,
                    email: true
                }
            })
            if(!userData) {
                return {
                    redirect: {
                        destination: `/login`,
                        permanent: false,
                    },
                    props: {}
                }
            }
            return {
                redirect: {
                    destination: `/u/${userData.username}`,
                    permanent: false,
                },
                props: {}
            }
        } catch (error) {
            throw new Error(error)
        }
    } else {
        return {
            redirect: {
                destination: `/login`,
                permanent: false,
            },
            props: {}
        }
    }

}
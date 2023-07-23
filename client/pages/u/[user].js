import { PrismaClient } from '@prisma/client';
import { getSession, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import userStyle from './user.module.css'


export default function Profile({ data, actualUser }) {
    const user = data;
    const userData = user.userData;

    return (
        <div className='container-fluid'>
            <div className={`container ${userStyle.profileContainer}`}>
                <div className={`rounded-circle ${userStyle.profilePhoto}`}>
                    <Link href={`/u/${userData.nickname}`}><span>{userData.nickname[0].toUpperCase()}</span></Link>
                </div>
                <ProtectedSession user={data}>
                    <button onClick={() => signOut()}>Odhlásit se</button>
                </ProtectedSession>
            </div>
        </div>
    )
}

function ProtectedSession(props) {
    const session = useSession();
    return (
        <div className={props.wrapperClassName}>
            {session != null && session.status === "authenticated" ? (
                <>
                    {session.data.user.email === props.user.email ? (
                        <div className={props.className}>
                            {props.children}
                        </div>
                    ) : null}
                </>
            ) : ''}
        </div>
    )
}

export const getServerSideProps = async (context) => {
    const prisma = new PrismaClient();
    const { user } = context.query;
    var userData = null;
    try {
        userData = await prisma.user.findFirst({
            where: {
                username: user
            },
            select: {
                email: true,
                userData: {
                    select: {
                        firstname: true,
                        lastname: true,
                        nickname: true,
                        bio: true,
                        gender: true,
                        profileImage: true,
                        profileWallpaper: true,
                    }
                }
            },
        })
    } catch (error) {
        throw new Error(error)
    } finally {
        await prisma.$disconnect();
    }

    if (!userData) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data: JSON.parse(JSON.stringify(userData)),
        }
    }

}
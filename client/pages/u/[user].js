import { PrismaClient } from '@prisma/client';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import userStyle from './user.module.css'


export default function User({ data }) {
    const router = useRouter();
    const session = useSession();

    return (
        <div className='container-fluid'>
            <div className={`container ${userStyle.profileContainer}`}>
                <div className={`rounded-circle ${userStyle.profilePhoto}`}>
                    <Link href={`/u/${data.username}`}><span>{data.username[0].toUpperCase()}</span></Link>
                </div>
                {data.name}
                {session.status == "authenticated" ? (
                    <div className="container" style={{ padding: '100px' }}>
                        <button onClick={() => signOut()}>Odhlásit se</button>
                    </div>
                ) : ''}
            </div>
        </div>
    )

}

export const getServerSideProps = async (context) => {
    const prisma = new PrismaClient();
    const { user } = context.query;
    const userData = await prisma.user.findFirst({
        where: {
            username: user
        },
        select: {
            username: true,
            name: true,
            email: true
        }
    })

    if (!userData) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data: userData,
        }
    }

}
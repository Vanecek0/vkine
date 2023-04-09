import { PrismaClient } from "@prisma/client";
import { useSession, signIn, signOut } from 'next-auth/react';

const prisma = new PrismaClient();

export default function User({ data }) {
    const { authData, status } = useSession();
    if (status === 'loading') return <h1> loading... please wait</h1>;
    if (status === 'authenticated') {
        return (
            <div className="container">
                <h1>Hi {authData.user.name}</h1>
                <img src={authData.user.image} alt={data.user.name + ' photo'} />
                <button onClick={signOut}>sign out</button>
            </div>
        )
    }
    return (
        <div className="container" style={{padding: '100px'}}>
            <button onClick={() => signIn('google')}>sign in with gooogle</button>
        </div>
    )
}

export async function getServerSideProps() {
    const users = await prisma.user.findMany();
    return {
        props: {
            data: users
        }
    }
}
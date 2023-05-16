import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

const logintest = () => {
    const session = useSession();
    console.log(session)
    if (session.data) {
        return (
            <>
            {console.log(session.user)}
                <h1>Welcome</h1>
                <button onClick={() => signOut()}>Odhlasit se</button>
            </>
        )
    }
    else {
        return (
            <>
            <h1>You should login first</h1>
            <button onClick={() => signIn()}>Prihlasit se</button>
            </>
        )
    }
}

export default logintest
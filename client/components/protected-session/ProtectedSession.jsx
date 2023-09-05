import { useSession } from 'next-auth/react';
import React from 'react'

const ProtectedSession = (props) => {
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

export default ProtectedSession
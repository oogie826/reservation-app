import React from 'react'
import Main from './Main.tsx'
import SignIn from './SignIn.tsx'

import '../../styles/loginform.scss'

export default function LoginForm({ setLogged, logged }) {

    return (
        <>
            { logged 
                ? <Main /> 
                : <SignIn setLogged={setLogged}/> }
        </>
    )
}
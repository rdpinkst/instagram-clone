import React, { useState } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom"

function Homepage(){
    const [signedOut, setSignedOut] = useState(false);

    const logOut = async() => {
        signOut(auth).then(() => {
            setSignedOut(true);
            console.log("Logged Out")
        }).catch((error) => {
            console.log(error.message)
        })
    }

    return (
        <div>
            {signedOut && <Navigate to="/" replace={true} />}
            <h1>Logged in</h1>
            <button onClick={logOut}>Sign Out</button>
        </div>
    )
}

export default Homepage;
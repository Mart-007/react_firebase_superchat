import React from 'react'

 const SignOut = () => {
    return auth.currentUser &&(
        <>
            <div className="signOut-container">
                <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
            </div>  
        </>
    )
}

export default SignOut;

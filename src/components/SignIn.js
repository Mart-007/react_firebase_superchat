import React from 'react';

//to popUp the google sign 
const SignIn = () => {
    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider(); 
        auth.signInWithPopup(provider);
    }

    return(
        <>
            <div className="signIn-container">
                <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button>
                <p>Do not violate the community guidelines or you will be banned for life</p>
            </div>
        </>
    )
}

export default SignIn;
"use client"
import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';

function SignInButton() {
    const { data: session } = useSession();

    const handleSignIn = () => {
        // You can pass a provider name like 'google' to signIn
        signIn('google');
    };

    const handleSignOut = () => {
        signOut();
    };

    if (session && session.user) {
        return (
            <button onClick={handleSignOut} className="btn-neutral">
                Sign Out
            </button>
        );
    }

    return (
        <button onClick={handleSignIn} className="btn-neutral-outline">
            Sign In with Google
        </button>
    );
}

export default SignInButton;

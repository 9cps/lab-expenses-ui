'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function SignInButton() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <button onClick={() => signOut()} className="btn-neutral">
        Sign Out
      </button>
    );
  }

  return (
    <button onClick={() => signIn('google')} className="btn-neutral-outline">
      Sign In with Google
    </button>
  );
}

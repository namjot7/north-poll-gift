## Client side Authentication in NextAuth V4

### signin-form.tsx
````
"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInForm() {
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      email: form.get("email"),
      password: form.get("password"),
      redirect: false
    });
    if (res?.error) return setError("Invalid credentials");
    window.location.href = "/";
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div>
        <label htmlFor="email">email</label>
        <input id="email" className="border border-red-600  p-5" name="email" type="text" autoComplete="email" />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input id='password' className="border border-red-600  p-5" name="password" type="password" />
      </div>
      <button type="submit">Sign In</button>
      {error && <p>{error}</p>}
    </form>
  );
}
````
#
All the code for NextAuth is inside the 
### app/api/auth/[...nextauth] /route.ts file
````
import { prisma } from "@/db/prisma";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"

export const authOptions = {
    pages: {
        signIn: '/sign-in',
        error: '/sign-in',
        // signOut: '/sign-out',
    },
    session: {
        strategy: 'jwt' as const, // default option
        maxAge: 30 * 24 * 60 * 60, // 30 days --> seconds
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await prisma.user.findFirst({
                    where: { email: credentials.email }
                })
                if (!user || !user.password) return null;
                console.log({user,credentials},'user found in prisma');
                
                const match = await credentials.password == user.password;
                if (match) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                }
                return null; // no user found or incorrect password 
            }
        })
    ],
}
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
````

### middleware.ts
````
export { default } from "next-auth/middleware"

// Below pages with require Authentication
export const config = {
    matcher: ["/dashboard"]
}

````


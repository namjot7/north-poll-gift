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

## Dashboard If-else Cases
````
export default function DashboardPage({ userWithGroup }) {
  const session = userWithGroup; // simplified reference
  const group = session.groups?.[0]?.group; // assuming 1 group for now

  // ✅ Case 1 — No Groups
  if (!group) {
    return (
      <div className="space-y-4">
        <p>
          Welcome {session.user.name}! You’re not in a gift exchange yet.
        </p>
        <CreateGroupDialog />
        <JoinGroupDialog />
      </div>
    );
  }

  // ✅ Case 2 — In group, but assignments not generated yet
  if (group.members.length > 1 && group.assignments.length === 0) {
    return (
      <div className="space-y-4">
        <p>Group: {group.name} 🎄</p>
        <p>Members: {group.members.length}</p>
        <p>Waiting for the organizer to start the exchange...</p>

        <p className="text-sm text-muted-foreground">
          Invite others to join:
        </p>
        <div className="rounded-md p-2 border font-mono text-sm">
          {`https://yourapp.com/join/${group.id}`}
        </div>

        {session.user.id === group.createdBy && (
          <Button>Generate Assignments</Button>
        )}
      </div>
    );
  }

  // ✅ Case 3 — Assignments Done — Main Gift Dashboard
  if (group.assignments.length > 0 && group.finalGift == null) {
    const assignedPerson = group.assignments.find(
      (a) => a.giverId === session.user.id
    )?.receiver;

    return (
      <div className="space-y-4">
        <p>Welcome {session.user.name}, you are buying a gift for:</p>
        <h2 className="text-2xl font-semibold">{assignedPerson.name}</h2>
        <p>Budget: $100 - $200</p>

        <Button>Go to {assignedPerson.name}'s gift board</Button>
      </div>
    );
  }

  // ✅ Case 4 — Final Gift Chosen
  if (group.finalGift) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">🎁 Final Gift Selected!</h2>

        <p>You are buying for → {group.finalGift.receiver.name}</p>

        <div className="space-y-2 bg-muted p-4 rounded-md border">
          <p className="font-medium">{group.finalGift.giftName}</p>
          <p>${group.finalGift.price}</p>
          <a
            href={group.finalGift.link}
            className="text-blue-500 hover:underline"
          >
            {group.finalGift.link}
          </a>
        </div>

        <p>Remember to bring your gift on December 25th!</p>
      </div>
    );
  }
}

````
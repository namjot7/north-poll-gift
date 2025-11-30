import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/db/prisma";


export const config = {
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

                // console.log('auth.config.ts',{ user, credentials } );

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
    callbacks: {
        async session({ session, user, token }) {
            session.user.id = token.sub as string;
            return session
        },
    }
} satisfies NextAuthConfig;

export const { signIn, signOut, handlers, auth } = NextAuth(config);
'use server';

import { signInFormSchema } from "../validators";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { prisma } from "@/db/prisma";
import { signIn, signOut } from "@/auth.config";


export async function signInWithCredentials(
  prevState: { success: boolean, message: string },
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password')
    });

    await signIn('credentials', {
      email: user.email,
      password: user.password,
      redirectTo: "/dashboard",
    })

    return { success: true, message: "User signed in successfully." }
  }
  catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Signin failed" }
  }
}
export async function signUpUser(
  prevState: { success: boolean, message: string },
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    })

    await prisma.user.create({
      data: {
        name: user.name as string,
        email: user.email,
        password: user.password
      }
    })
    await signIn('credentials', {
      email: user.email,
      password: user.password,
      redirectTo: '/dashboard'
    })
    return { success: true, message: 'User created' }
  }
  catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: `User signup failed  ${error}` }
  }
}

export async function signOutUser() {
  await signOut();
}
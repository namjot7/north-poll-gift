'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { signInWithCredentials } from '@/lib/actions/user.actions';
import { signInDefaultValues } from '@/lib/constants';
import { Label } from '@radix-ui/react-label'
import Link from 'next/link';
import { useActionState } from 'react';

const SignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, {
    success: false,
    message: ''
  })

  return (
    <form action={action}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id='name' type="name" name='name' required
            defaultValue={signInDefaultValues.name}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id='email' type="email" name='email' required autoComplete='email'
            defaultValue={signInDefaultValues.email}
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input id='password'
            type="password" required name='password'
            defaultValue={signInDefaultValues.password}
          />
        </div>
        <div className="text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="underline text-blue-600">Sign up now</Link>
        </div>
        <Button type="submit" className="w-full">Login</Button>
      </div>
    </form>
  )
}

export default SignInForm;


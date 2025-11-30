'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { signUpUser } from '@/lib/actions/user.actions';
import { signInDefaultValues } from '@/lib/constants';
import { Label } from '@radix-ui/react-label'
import Link from 'next/link';
import { useActionState } from 'react';

const SignUpForm = () => {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: ''
    })

    return (
        <form action={action}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input type="name" name='name' required
                        defaultValue={signInDefaultValues.name}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input type="email" name='email' required autoComplete='email'
                        defaultValue={signInDefaultValues.email}
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input
                        type="password" required name='password'
                        defaultValue={signInDefaultValues.password}
                    />
                </div>
                <div className="text-sm text-muted-foreground">
                    Already have an account?{' '}
                    <Link href="/sign-in" className="underline text-blue-600">Login now</Link>
                </div>
                <Button type="submit" className="w-full">Create your account</Button>
            </div>
        </form>
    )
}

export default SignUpForm;

'use client'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { ServerActionType } from '@/types';
import { Label } from '@radix-ui/react-label'
import Link from 'next/link';
import { useActionState } from 'react';

const UserLoginForm = ({ serverAction, type }: {
    serverAction: ServerActionType,
    type: string
}) => {
    const [data, action] = useActionState(serverAction, {
        success: false,
        message: ''
    })
    return (
        <form action={action}>
            <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                    <Label className='text-gray-400' htmlFor="name">Name</Label>
                    <Input className="border-0" id='name' type="name" name='name' required />
                </div>
                <div className="grid gap-2">
                    <Label className='text-gray-400' htmlFor="email">Email</Label>
                    <Input className="border-0" id='email' type="email" name='email' required autoComplete='email' />
                </div>
                <div className="grid gap-2">
                    <Label className='text-gray-400' htmlFor="password">Password</Label>
                    <Input className="border-0" id='password' type="password" required name='password' />
                </div>
                {type == "login"
                    ? <div className="text-sm text-gray-400">
                        Don&apos;t have an account?{' '}
                        <Link href="/sign-up" className="underline">Sign up now</Link>
                    </div>
                    : <div className="text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link href="/sign-in" className="underline">Login now</Link>
                    </div>
                }
                {type == "login"
                    ? <Button type="submit" className="w-full">Login</Button>
                    : <Button type="submit" className="w-full">Create your account</Button>
                }
            </div>
        </form>
    )
}

export default UserLoginForm
import React from 'react'
import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Metadata } from "next"
import SignUpForm from './signup-form'

export const metadata: Metadata = {
    title: 'Sign Up'
}
const SignUpPage = () => {
    return (
        <div className="flex-center h-screen bg-gray-800">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Sign up</CardTitle>
                </CardHeader>
                <CardContent>
                    <SignUpForm />
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUpPage
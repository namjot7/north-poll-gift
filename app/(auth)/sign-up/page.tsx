import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Metadata } from "next"
import UserLoginForm from '@/components/shared/user-login-form'
import { signUpUser } from '@/lib/actions/user.actions'

export const metadata: Metadata = {
    title: 'Sign Up'
}
const SignUpPage = () => {
    return (
        <Card className="w-full max-w-sm bg-black/20 backdrop-blur-lg border-0 text-white">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Sign up</CardTitle>
                <CardDescription>Create your account</CardDescription>
            </CardHeader>
            <CardContent>
                <UserLoginForm serverAction={signUpUser} type='sign-up' />
            </CardContent>
        </Card>
    )
}

export default SignUpPage
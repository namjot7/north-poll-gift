import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Metadata } from "next"
import UserLoginForm from "@/components/shared/user-login-form";
import { signInWithCredentials } from "@/lib/actions/user.actions";

export const metadata: Metadata = {
    title: 'Sign In',
}
const SignInPage = () => {
    return (
        <Card className="w-full max-w-sm bg-black/20 backdrop-blur-lg border-0 text-white">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Sign In</CardTitle>
                <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <UserLoginForm serverAction={signInWithCredentials} type='login' />
            </CardContent>
        </Card>

    )
}
export default SignInPage;

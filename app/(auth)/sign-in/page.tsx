import {
    Card, CardContent, CardDescription, CardHeader, CardTitle,
} from "@/components/ui/card"
import { Metadata } from "next"
import SignInForm from "./signin-form";

export const metadata: Metadata = {
    title: 'Sign In',
}
const SignInPage = () => {
    return (
        <div className="flex-center h-screen bg-gray-800">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Sign In</CardTitle>
                    <CardDescription>Sign in to your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <SignInForm />
                </CardContent>
            </Card>
        </div>
    )
}
export default SignInPage;

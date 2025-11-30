import { auth, signOut } from "@/auth.config";
import { Button } from "@/components/ui/button"
import { signOutUser } from "@/lib/actions/user.actions";
import Link from "next/link";

const UserButton = async () => {
    const session = await auth();
    
    if (session) {
        const firstInitial = session?.user?.name?.slice(0, 1).toUpperCase() || "U";
        return (
            <div className="flex">
                <span className="bg-gray-500 px-3.5 py-1 rounded-full">
                    {firstInitial}
                </span>
                <form action={signOutUser}>
                    <Button type="submit">Sign Out</Button>
                </form>
            </div >
        )
    }
    return <Link href="/sign-in">Sign In</Link>
}
export default UserButton;
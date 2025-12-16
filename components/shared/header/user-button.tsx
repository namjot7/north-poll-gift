import { auth } from "@/auth.config";
import { Button } from "@/components/ui/button"
import { signOutUser } from "@/lib/actions/user.actions";
import Link from "next/link";

const UserButton = async () => {
    const session = await auth();
    
    if (session) {
        const firstInitial = session?.user?.name?.slice(0, 1).toUpperCase() || "U";
        return (
            <div className="flex-center gap-4">
                <span className="bg-black px-4 py-1.5 rounded-full select-none">
                    {firstInitial}
                </span>
                <form action={signOutUser}>
                    <Button type="submit">Sign Out</Button>
                </form>
            </div >
        )
    }
    return <Link className="btn-default rounded-full" href="/sign-in">Sign In</Link>
}
export default UserButton;
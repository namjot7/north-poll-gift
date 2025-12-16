import { auth } from "@/auth.config"
import { Button } from "@/components/ui/button";
import CreateGroupForm from "./create-group-form";
import JoinGroupForm from "./join-group-form";
import { getGroups } from "@/lib/actions/group.actions";
import Link from "next/link";
import { Metadata } from "next";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
    title: 'Dashboard'
}

const Dashboard = async () => {
    const session = await auth();
    const groups = await getGroups(session);
    // console.log(groups.length)

    return (
        <div className="wrapper relative text-white">
            <div className="flex justify-between">
                <h2 className="h1-bold mb-5 text-white">Dashboard</h2>
                <div className="flex gap-3">
                    <JoinGroupForm />
                    <CreateGroupForm />
                </div>
            </div>

            {/* Case 1 - User has no groups yet */}
            {groups.length === 0 && (
                <div>
                    <p className="text-xl">Welcome {session?.user?.name}! 🎉</p>
                    <p>It looks like you're not in a gift exchange yet. Let’s change that!</p>
                    <p>Start a new group or join one with friends and family — and let the fun begin!</p>
                    <button>Create a Group</button> {/* Or link to create/join a group */}
                </div>
            )}

            {/* Case 2 — User is in a group but assignments not yet generated */}
            {groups.length > 0 && (
                <>
                    <h3 className="h2-bold">Your Groups</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        {groups.map((group, idx) => (
                            <div key={group.id} className="card">
                                <h4 className="text-xl font-medium">{group.name}</h4>
                                <p>Members: {group.groupMembers.map(e => {
                                    return e.user.name + " ,";
                                })}</p>
                                <span className="text-sm text-muted-foreground">Created by - {group.createdBy}</span>
                                <Link href={`groups/${group.id}`}>
                                    <Button className="w-full"
                                    >Go to Group Page</Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Case 3 — Assignments are generated (main dashboard state) */}


            {/* Case 4 — Voting closed, winner selected (final state) */}

        </div>
    )
}

export default Dashboard
import { auth } from "@/auth.config"
import { Button } from "@/components/ui/button";
import CreateGroupForm from "./create-group-form";
import JoinGroupForm from "./join-group-form";
import { getGroups } from "@/lib/actions/group.actions";
import Link from "next/link";
import { Metadata } from "next";
import { FaArrowAltCircleRight, FaTrash } from "react-icons/fa";

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
                <h2 className="h2-bold mb-5">Dashboard</h2>
                <div className="flex gap-3">
                    <JoinGroupForm />
                    <CreateGroupForm />
                </div>
            </div>

            {/* Case 1 - User has no groups yet */}
            {groups.length === 0 && (
                <div>
                    <p className="text-xl mb-2 capitalize">Welcome {session?.user?.name}!</p>
                    <p>It looks like you're not in a gift exchange yet. Let&apos;s change that!</p>
                    <p>Start a new group or join one with friends and family — and let the fun begin!</p>
                </div>
            )}

            {/* Case 2 — User is in a group but assignments not yet generated */}
            {groups.length > 0 && (
                <>
                    <h3 className="h3-bold">Your Groups</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                        {groups.map((group, idx) => (

                            <div key={group.id} className="card">
                                <div className="flex-between mb-2">
                                    <h4 className="text-xl font-medium mb-1">{group.name}</h4>
                                    <span><FaTrash /></span>
                                </div>
                                <p>Date: </p>
                                <p className="capitalize">
                                    {group.groupMembers.map(e => {
                                        return e.user.name + ", ";
                                    })}
                                </p>
                                <span className="text-sm text-gray-400">
                                    Created by - {group.createdBy}
                                </span>
                                <Link href={`groups/${group.id}`} className="btn-default block w-18 mt-2">Details</Link>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default Dashboard
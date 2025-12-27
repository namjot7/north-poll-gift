'use client'
import { Button } from '@/components/ui/button'
import { IoIosShareAlt } from "react-icons/io";
import { toast } from "sonner";
import { MdExitToApp } from "react-icons/md";
import { leaveGroup } from '@/lib/actions/group.actions';
import { useRouter } from 'next/navigation';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ShareLeaveBtns = ({ groupId }: { groupId: string }) => {
    const router = useRouter();

    return (
        <div className='flex gap-2'>
            <Button onClick={async () => {
                await navigator.clipboard.writeText(groupId);
                toast.success("GroupId copied");
            }}>
                <IoIosShareAlt />Share
            </Button>

            {/* Leave group btn */}
            <AlertDialog>
                <AlertDialogTrigger className="btn-default flex-center gap-1  text-sm font-medium">
                    <MdExitToApp />Leave Group
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Leave this group?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={async () => {
                                await leaveGroup(groupId);
                                router.push('/dashboard');
                            }}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ShareLeaveBtns
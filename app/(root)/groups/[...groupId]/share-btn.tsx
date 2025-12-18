'use client'
import { Button } from '@/components/ui/button'
import { IoIosShareAlt } from "react-icons/io";
import { toast } from "sonner";

const ShareBtn = ({ groupId }: { groupId: string }) => {
    return (
        <Button onClick={async () => {
            await navigator.clipboard.writeText(groupId);
            toast.success("GroupId copied");
        }}>
            Share<IoIosShareAlt />
        </Button>
    )
}

export default ShareBtn
'use client'
import { Button } from "@/components/ui/button"
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { deleteGift } from "@/lib/actions/gift-suggestions.actions";
import { getVotes, handleVote } from "@/lib/actions/vote.actions";

const GiftButtons = ({
    giftId, userId, boardId
}: {
    giftId: string,
    userId: string,
    boardId: string,
}) => {
    const [votes, setVotes] = useState({
        giftId, downvotes: 0, upvotes: 0, score: 0
    });
    const [open, setOpen] = useState(false);

    const handleVoteBtn = async (value: number) => {
        await handleVote(giftId, value, userId);
        handleGetVotes();
    };
    const handleGetVotes = async () => {
        const data = await getVotes(giftId);
        setVotes(data);
    };

    const handleDelete = async () => {
        const res = await deleteGift(giftId, boardId);

        // if (res.success) {
        //     toast.success(groupName + " Deleted")
        // }
    };
    // useEffect(() => {
    //     if (data.success) {
    //         setOpen(false);
    //     }
    // }, [data])

    useEffect(() => {
        handleGetVotes();
    }, [])

    return (
        <div className="flex-between">
            <div className="flex gap-2">
                <button className="flex-center gap-1 hover:scale-110 cursor-pointer"
                    onClick={() => handleVoteBtn(1)}>
                    <ArrowBigUp size={21} strokeWidth={1} fill={votes.upvotes ? "#fff" : ""} />
                    <span>{votes.upvotes}</span>
                </button>
                <button className="flex-center gap-1 hover:scale-110 cursor-pointer"
                    onClick={() => handleVoteBtn(-1)}>
                    <ArrowBigDown size={21} strokeWidth={1} fill={votes.downvotes ? "#fff" : ""} />
                    <span>{votes.downvotes}</span>
                </button>
            </div>
            <div className="flex">

                {/* Rename btn */}
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild className="cursor-pointer hover:bg-gray-100/10 rounded-md p-2">
                        <button><MdEdit /></button>
                    </DialogTrigger>
                    <DialogContent className="w-sm">
                        <DialogHeader>
                            <DialogTitle>Rename group</DialogTitle>
                        </DialogHeader>
                        <form>
                            <div className="grid gap-2 mb-5">
                                <Label htmlFor="groupName">Group Name</Label>
                                <Input id="groupName" name="groupName" type="text" required />

                                <Input id="groupId" name="groupId" type="text" hidden readOnly />
                            </div>
                            <Button type="submit" className="w-full">Rename</Button>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Delete btn */}
                <AlertDialog>
                    <AlertDialogTrigger className="cursor-pointer hover:bg-gray-100/10 p-2 rounded-md">
                        <FaTrash />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete this gift?</AlertDialogTitle>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    )
}

export default GiftButtons;
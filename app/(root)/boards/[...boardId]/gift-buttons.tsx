'use client'
import { Button } from "@/components/ui/button"
import { ArrowBigUp, ArrowBigDown, Trash2, Pencil } from 'lucide-react';
import { useActionState, useEffect, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { deleteGift, updateGiftSuggestion } from "@/lib/actions/gift-suggestions.actions";
import { getVotes, handleVote } from "@/lib/actions/vote.actions";
import { Gift } from "@/types";
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
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { DialogDescription } from "@radix-ui/react-dialog";

const GiftButtons = ({ gift, userId }: {
    gift: Gift,
    userId: string,
}) => {
    const [data, action] = useActionState(updateGiftSuggestion, {
        success: false, message: ""
    })
    const [votes, setVotes] = useState({
        giftId: gift.id, downvotes: 0, upvotes: 0, score: 0
    });
    const [open, setOpen] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleVoteBtn = async (value: number) => {
        await handleVote(gift.id, value, userId);
        handleGetVotes();
    };
    const handleGetVotes = async () => {
        const data = await getVotes(gift.id);
        setVotes(data);
    };
    const handleDelete = async () => {
        const res = await deleteGift(gift.id, gift.boardId);
        if (res.success) toast.success("Deleted successfully")
    };

    const handleUpdateGift = async () => {
        // const formData=new FormData();
        // const res = await updateGiftSuggestion();
        // console.log(res)
        // formData.append
    }
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
            {/* Upvote and Downvote buttons */}
            <div className="flex gap-2">
                <button className="flex-center gap-1 cursor-pointer hover:text-emerald-400"
                    onClick={() => handleVoteBtn(1)}>
                    <ArrowBigUp className="w-5" fill={votes.upvotes ? "#fff" : ""} />
                    <span>{votes.upvotes}</span>
                </button>

                <button className="flex-center gap-1 cursor-pointer hover:text-red-400"
                    onClick={() => handleVoteBtn(-1)}>
                    <ArrowBigDown className="w-5" fill={votes.downvotes ? "#fff" : ""} />
                    <span>{votes.downvotes}</span>
                </button>
            </div>

            {/* Edit and delete buttons */}
            <div className="flex">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild className="cursor-pointer hover:bg-gray-100/10 rounded-md p-2">
                        <button><Pencil className="w-5 h-5" /></button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Edit Gift Suggestion</DialogTitle>
                            <DialogDescription />
                        </DialogHeader>
                        <form action={action}>
                            <div className="grid gap-2 mb-5">
                                <div>
                                    <Label htmlFor="giftName">Name</Label>
                                    <Input id="giftName" name="giftName" type="text" required defaultValue={gift.name} />
                                </div>
                                <div>
                                    <Label htmlFor="link">Link</Label>
                                    <Input id="link" name="link" type="text" required defaultValue={gift.link} />
                                </div>
                                <div>
                                    <Label htmlFor="link">Upload image</Label>

                                    {/* Remove the current image when user uploads a new image */}
                                    {!file && <img src={gift.image} className="w-44" alt="product image" />}

                                    {/* New uploaded image */}
                                    {file && <img src={URL.createObjectURL(file)} className="w-44" alt="product image" />}

                                    <Input type="file" accept="image/*" required
                                        onChange={e => setFile(e.target.files?.[0] ?? null)} />
                                </div>

                                {/* <Input id="groupId" name="groupId" type="text" hidden readOnly /> */}
                            </div>
                            <Button type="submit" className="w-full">Update</Button>
                        </form>
                    </DialogContent>
                </Dialog>

                <AlertDialog>
                    <AlertDialogTrigger className="cursor-pointer hover:bg-gray-100/10 p-2 rounded-md">
                        <Trash2 className="w-5 h-5" />
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
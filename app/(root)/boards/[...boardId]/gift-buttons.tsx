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
import { useUploadThing } from "@/lib/uploadthing";

const GiftButtons = ({ gift, userId }: {
    gift: Gift,
    userId: string,
}) => {
    const [votes, setVotes] = useState({
        giftId: gift.id, downvotes: 0, upvotes: 0, score: 0
    });
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(gift.name ?? "");
    const [link, setLink] = useState(gift.link ?? "");
    const [image, setImage] = useState<string | undefined>(gift.image ?? undefined);
    const [file, setFile] = useState<File | null>(null);

    // Upload image to UploadThing
    const { startUpload, isUploading } = useUploadThing("imageUploader");

    const handleVoteBtn = async (value: number) => {
        await handleVote(gift.id, value, userId);
        handleGetVotes();
    };
    const handleGetVotes = async () => {
        const data = await getVotes(gift.id);
        setVotes(data);
    };
    const handleDelete = async () => {
        const res = await deleteGift(gift.id, gift.boardId, gift.imageKey ?? "");
        if (res.success) toast.success("Deleted successfully")
    };

    const handleUpdateGift = async () => {
        const formData = new FormData();

        formData.append('name', name);
        formData.append('link', link);
        formData.append('prevImageKey', gift.imageKey ?? "");

        let imageUrl = image;

        if (file) {
            const res = await startUpload([file]);
            if (!res) return;
            imageUrl = res[0].ufsUrl;
            formData.append('imageKey', res[0].key);
        }
        formData.append('image', imageUrl!);

        // for (const element of formData) {
        //     console.log(element)
        // }
        const res = await updateGiftSuggestion(gift.id, gift.boardId, formData);

        if (res.success) {
            toast.success('Updated successfully');
            setOpen(false);
            setName("");
            setLink("");
            setFile(null);
            setImage(undefined);
        }
    }
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
                        </DialogHeader>
                        <DialogDescription></DialogDescription>
                        <form action={handleUpdateGift}>
                            <div className="grid gap-2 mb-5">
                                <div>
                                    <Label htmlFor="giftName">Name</Label>
                                    <Input id="giftName" name="giftName" type="text"
                                        onChange={e => setName(e.target.value)} value={name}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="link">Link (optional)</Label>
                                    <Input id="link" name="link" type="text"
                                        onChange={e => setLink(e.target.value)} value={link}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="link">Upload image</Label>

                                    {/* Remove the current image when user uploads a new image */}
                                    {!file && <img src={image} className="w-44" alt="product image" />}

                                    {/* New uploaded image */}
                                    {file && <img src={URL.createObjectURL(file)} className="w-44" alt="product image" />}

                                    <Input type="file" accept="image/*"
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
'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useActionState, useEffect, useState } from "react";
import { deleteGroup, renameGroup } from "@/lib/actions/group.actions";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
import { Pencil, Trash2 } from "lucide-react";

const EditDeleteBtns = ({ groupId, groupName }: {
    groupId: string, groupName: string
}) => {
    const [open, setOpen] = useState(false);
    const [data, action] = useActionState(renameGroup, {
        success: false, message: ''
    });

    const handleDelete = async () => {
        const res = await deleteGroup(groupId);
        if (res.success) toast.success(groupName + " Deleted")
    };

    // close the shadCn dialog when action succeeds
    useEffect(() => {
        if (data.success) {
            setOpen(false);
        }
    }, [data])

    return (
        <div>
            {/* Rename btn */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild className="cursor-pointer hover:bg-gray-100/10 rounded-md p-2">
                    <button><Pencil className='w-5' /></button>
                </DialogTrigger>
                <DialogContent className="w-sm">
                    <DialogHeader>
                        <DialogTitle>Rename group</DialogTitle>
                    </DialogHeader>
                    <form action={action}>
                        <div className="grid gap-2 mb-5">
                            <Label htmlFor="groupName">Group Name</Label>
                            <Input id="groupName" name="groupName" type="text" required defaultValue={groupName} />
                            <Input value={groupId} id="groupId" name="groupId" type="text" hidden readOnly />
                        </div>
                        <Button type="submit" className="w-full">Rename</Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete btn */}
            <AlertDialog>
                <AlertDialogTrigger className="cursor-pointer hover:bg-gray-100/10 p-2 rounded-md">
                    <Trash2 className="w-5" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the whole group
                            and remove everyone's data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default EditDeleteBtns;

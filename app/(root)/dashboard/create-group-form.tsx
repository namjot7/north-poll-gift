'use client';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect, useState } from "react";
import { createGroup } from "@/lib/actions/group.actions";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner";
import { Plus } from "lucide-react";

const CreateGroupForm = () => {
    const [open, setOpen] = useState(false);
    const [data, action] = useActionState(createGroup, {
        success: false, message: ''
    })
    useEffect(() => {
        if (data.success) {
            setOpen(false);
            toast.success('Group created successfully.');
        }
    }, [data])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default"><Plus/>Create</Button>
            </DialogTrigger>
            <DialogContent className="w-sm">
                <DialogHeader>
                    <DialogTitle>Create a group</DialogTitle>
                </DialogHeader>
                <form action={action}>
                    <div className="grid gap-2 mb-5">
                        <Label htmlFor="groupName">Group Name</Label>
                        <Input id="groupName" name="groupName" type="text" required
                        />
                    </div>
                    <Button type="submit" className="w-full">Create</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CreateGroupForm
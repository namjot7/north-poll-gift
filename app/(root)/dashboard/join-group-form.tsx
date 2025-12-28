'use client';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useEffect, useState } from "react";
import { joinGroup } from "@/lib/actions/group.actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Users } from "lucide-react";

const JoinGroupForm = () => {
    const [open, setOpen] = useState(false);

    const [data, action] = useActionState(joinGroup, {
        success: false, message: ''
    })
    useEffect(() => {
        // To prevent toast on initial load
        if (!data.message) return;

        toast[data.success ? "success" : "error"](data.message); // toast["success"]  --> same as toast.success

        if (data.success) setOpen(false);
    }, [data.success, data.message])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default"><Users />Join</Button>
            </DialogTrigger>
            <DialogContent className="w-sm">
                <DialogHeader>
                    <DialogTitle>Join a group</DialogTitle>
                </DialogHeader>
                <form action={action}>
                    <div className="grid gap-2 mb-5">
                        <Label htmlFor="groupId">Group Id</Label>
                        <Input id="groupId" name="groupId" type="text" required />
                    </div>
                    <Button type="submit" className="w-full">Join</Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default JoinGroupForm;
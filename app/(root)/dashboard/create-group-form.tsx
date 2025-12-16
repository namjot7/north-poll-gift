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
import { useActionState } from "react";
import { createGroup } from "@/lib/actions/group.actions";
import { Button } from "@/components/ui/button";

const CreateGroupForm = () => {
    const [data, action] = useActionState(createGroup, {
        success: false, message: ''
    })
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="default">Create</Button>
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
            </form>
        </Dialog>
    )
}

export default CreateGroupForm
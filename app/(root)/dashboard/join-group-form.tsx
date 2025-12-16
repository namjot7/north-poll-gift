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
import { joinGroup } from "@/lib/actions/group.actions";
import { Button } from "@/components/ui/button";

const JoinGroupForm = () => {
    const [data, action] = useActionState(joinGroup, {
        success: false, message: ''
    })
    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button variant="default">Join</Button>
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
            </form>
        </Dialog>
    )
}
export default JoinGroupForm;
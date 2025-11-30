'use client';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
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
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Create a group</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={action}>
                    <div>
                        <div className="grid gap-2 mb-5">
                            <Label htmlFor="groupName">Name</Label>
                            <Input id="groupName" name="groupName" type="text" required
                            />
                        </div>
                        <Button type="submit" className="w-full">Create</Button>
                    </div>
                </form>
            </CardContent>
        </Card>

    )
}

export default CreateGroupForm
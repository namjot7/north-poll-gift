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
import { joinGroup } from "@/lib/actions/group.actions";
import { Button } from "@/components/ui/button";

const JoinGroupForm = () => {
    const [data, action] = useActionState(joinGroup, {
        success: false, message: ''
    })
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Join a group</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={action}>
                    <div>
                        <div className="grid gap-2 mb-5">
                            <Label htmlFor="groupId">Group Id</Label>
                            <Input id="groupId" name="groupId" type="text" required />
                        </div>
                        <Button type="submit" className="w-full">Join</Button>
                    </div>
                </form>
            </CardContent>
        </Card>

    )
}

export default JoinGroupForm
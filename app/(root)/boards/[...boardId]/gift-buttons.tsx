'use client'
import { auth } from "@/auth.config";
import { Button } from "@/components/ui/button"
import { upVoteGift } from "@/lib/actions/gift-suggestions.actions";
import { User } from "@/types";
import Link from "next/link"

const GiftButtons = ({
    link, id, user
}: {
    link: string,
    id: string,
    user: User
}) => {
    const upVote = async (giftId: string) => {
        await upVoteGift(giftId, user?.id);
    };
    return (
        <div className='flex gap-2'>
            <Link href={link} target="_blank">Check Now</Link>
            <Button variant={'default'} onClick={() => upVote(id)}>Upvote</Button>
        </div>
    )
}

export default GiftButtons
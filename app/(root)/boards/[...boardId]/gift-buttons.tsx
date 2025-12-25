'use client'
import { Button } from "@/components/ui/button"
import { getVotes, handleVote } from "@/lib/actions/vote.actions";
import { ArrowBigUp, ArrowBigDown } from 'lucide-react';
import Link from "next/link"
import { useEffect, useState } from "react";

const GiftButtons = ({
    link, giftId, userId
}: {
    link?: string,
    giftId: string,
    userId: string
}) => {
    const [votes, setVotes] = useState({
        giftId,
        downvotes: 0,
        upvotes: 0,
        score: 0
    });

    const handleVoteBtn = async (value: number) => {
        await handleVote(giftId, value, userId);
        handleGetVotes();
    };
    const handleGetVotes = async () => {
        const data = await getVotes(giftId);
        setVotes(data);
    }
    useEffect(() => {
        handleGetVotes();
    }, [])

    return (
        <div className=''>
            {link && <Link href={link} target="_blank" className="mb-3 block">Check Now</Link>}

            <div className="flex gap-2">
                <Button className="bg-green-600 hover:bg-green-700"
                    onClick={() => handleVoteBtn(1)}>
                    <ArrowBigUp />
                    <span>{votes.upvotes}</span>
                </Button>
                <Button className="bg-red-600 hover:bg-red-700"
                    onClick={() => handleVoteBtn(-1)}>
                    <ArrowBigDown />
                    <span>{votes.downvotes}</span>
                </Button>
            </div>
        </div>
    )
}

export default GiftButtons
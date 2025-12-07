'use server';
import { prisma } from "@/db/prisma"


// GET votes
export async function getVotes(giftId: string) {
    // const upVotes = await prisma.vote.count({
    //     where: { giftId, value: 1 }
    // })
    // const downVotes = await prisma.vote.count({
    //     where: { giftId, value: 1 }
    // })
    const [upvotes, downvotes] = await Promise.all([
        prisma.vote.count({ where: { giftId, value: 1 } }),
        prisma.vote.count({ where: { giftId, value: -1 } })
    ]);

    return { giftId, upvotes, downvotes, score: upvotes - downvotes };
    // return { giftId, upVotes, downVotes };
}

// CREATE, UPDATE, DELETE
export async function handleVote(giftId: string, value: number, userId: string) {

    // Check if vote exists
    const existingVote = await prisma.vote.findUnique({
        where: {
            userId_giftId: { giftId, userId } // composite unique key
        }
    })
    // Vote does not exist, Create NEW 
    if (!existingVote) {
        await prisma.vote.create({
            data: {
                userId: userId,
                giftId: giftId,
                value: value,
            }
        })
    }
    // Delete the vote
    else if (existingVote.value == value) {
        await prisma.vote.delete({
            where: { id: existingVote.id }
        })
    }
    // Update the vote
    else {
        await prisma.vote.update({
            where: { id: existingVote.id },
            data: { value: value }
        })
    }
    return { success: true, message: "Voted" }
}

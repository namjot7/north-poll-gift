'use server';

import { prisma } from "@/db/prisma"

export const getBoardById = async ({ boardId }: { boardId: string }) => {
    // console.log(boardId)

    const board = await prisma.board.findFirst({
        where: { id: boardId },
        include: {
            giftSuggestions: true,
            owner: true,
        },
    })
    // console.log(board)
    return board;
}
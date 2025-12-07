'use server';
import { prisma } from "@/db/prisma";
import { giftSuggestionFormSchema } from "../validators";
import { auth } from "@/auth.config";

export async function submitGiftSuggestionForm(
    prevState: unknown,
    formData: FormData
) {
    const session = await auth()
    const suggestedByUser = session?.user?.name;

    const giftSuggestion = giftSuggestionFormSchema.parse({
        name: formData.get('name'),
        imageUrl: formData.get('imageUrl'),
        link: formData.get('link'),
        price: Number(formData.get('price')),
        suggestedBy: suggestedByUser,
        boardId: formData.get('boardId'),
    });
    // console.log(giftSuggestion)

    await prisma.giftSuggestion.create({ data: giftSuggestion })

    return {
        success: true, message: "Form submitted successfully."
    }
}
export async function getGiftSuggestions({ boardId }: { boardId: string }) {
    const res = await prisma.giftSuggestion.findMany({
        where: { boardId: boardId[0] }
    });
    // console.log(res)
    return res;
}

// export async function upVoteGift({ giftId, userId }: {
//     giftId: string, userId: string
// }) {
export async function upVoteGift(giftId: string, userId: string) {
    // console.log(giftId)
    console.log('upvote this')
    // const gift = await prisma.giftSuggestion.findFirst({
    //     where: { id: giftId }
    // })
    // if (!gift) throw new Error("Gift not found");
    // await prisma.vote.create({
    //     data: {
    //         userId: userId,
    //         giftId: giftId,
    //         value: 1,
    //     }
    // })
    // console.log(gift)
}
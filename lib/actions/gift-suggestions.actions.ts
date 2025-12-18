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
        boardId: formData.get('boardId'),
        suggestedBy: suggestedByUser,
    });

    await prisma.giftSuggestion.create({ data: giftSuggestion })

    return {
        success: true, message: "Form submitted successfully."
    }
}
export async function getGiftSuggestions({ boardId }: { boardId: string }) {
    const gifts = await prisma.giftSuggestion.findMany({
        where: { boardId: boardId[0] }
    });
    const normalGifts = gifts.map(gift => ({
        ...gift,
        price: gift.price.toNumber(),
    }))
    // console.log(normalGifts)
    return normalGifts;
}
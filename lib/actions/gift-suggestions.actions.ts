'use server';
import { prisma } from "@/db/prisma";
import { giftSuggestionFormSchema, updateGiftSuggestionFormSchema } from "../validators";
import { auth } from "@/auth.config";
import * as cheerio from "cheerio";
import { revalidatePath, revalidateTag } from "next/cache";
import { UTApi } from "uploadthing/server";

// To delete files from the UploadThing Database
const utapi = new UTApi();

export async function getLinkDetails(url: string) {
    if (!url || !url.startsWith("http")) {
        return ({ status: 400 });
    }
    try {
        const res = await fetch(url, {
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                "Accept-Language": "en-US,en;q=0.9",
            },
        });

        const html = await res.text();
        const $ = cheerio.load(html);

        const title =
            $('meta[property="og:title"]').attr("content") ??
            $("title").text() ??
            undefined;

        const image =
            $('meta[property="og:image"]').attr("content") ??
            undefined;

        const shortTitle = title.split(',')[0];
        // console.log(shortTitle)
        // console.log({ title, image })
        return ({ title, image, shortTitle });
    }
    catch (err) {
        return ({ error: "Failed to fetch preview", status: 500 });
    }
}

export async function getGiftSuggestions({ boardId }: { boardId: string }) {
    const gifts = await prisma.giftSuggestion.findMany({
        where: { boardId: boardId[0] },
    });
    return gifts;
}
export async function submitGiftSuggestionForm(
    formData: FormData,
    boardId: string
) {
    const session = await auth()
    const suggestedByUser = session?.user?.name;

    const giftSuggestion = giftSuggestionFormSchema.parse({
        name: formData.get('name'),
        image: formData.get('image'),
        imageKey: formData.get('imageKey') || "",
        link: formData.get('link'),
        boardId: formData.get('boardId'),
        suggestedBy: suggestedByUser,
    });
    // console.log(formData)
    // console.log(giftSuggestion)

    await prisma.giftSuggestion.create({ data: giftSuggestion })
    revalidatePath(`/boards/${boardId}`); // to get real-time updates in data

    return { success: true, message: "Form submitted successfully." }
}

export async function updateGiftSuggestion(
    giftId: string,
    formData: FormData
) {
    const giftData = updateGiftSuggestionFormSchema.parse({
        name: formData.get('name'),
        link: formData.get('link'),
        image: formData.get('image'),
        imageKey: formData.get('imageKey') ?? "",
    });
    // console.log(formData)
    // console.log(giftData)

    const prevKey = formData.get('prevImageKey');
    if (prevKey && typeof prevKey === "string") {
        await utapi.deleteFiles(prevKey);
    }

    const res = await prisma.giftSuggestion.update({
        where: { id: giftId },
        data: giftData
    })
    // revalidateTag('/')
    // console.log(res)
    return { success: true, message: "Gift updated successfully" };
}

export async function deleteGift(
    giftId: string,
    boardId: string,
) {
    // console.log(giftId, boardId[0])
    await prisma.giftSuggestion.delete({ where: { id: giftId } });
    revalidatePath(`/board/${boardId[0]}`);
    return { success: true, message: "Gift deleted successfully" };
}
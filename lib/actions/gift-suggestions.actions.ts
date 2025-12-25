'use server';
import { prisma } from "@/db/prisma";
import { giftSuggestionFormSchema } from "../validators";
import { auth } from "@/auth.config";
import * as cheerio from "cheerio";

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

export async function submitGiftSuggestionForm(
    formData: FormData
) {
    const session = await auth()
    const suggestedByUser = session?.user?.name;

    console.log(formData)

    const giftSuggestion = giftSuggestionFormSchema.parse({
        name: formData.get('name'),
        image: formData.get('image'),
        link: formData.get('link'),
        boardId: formData.get('boardId'),
        suggestedBy: suggestedByUser,
    });
    console.log(giftSuggestion)
    await prisma.giftSuggestion.create({ data: giftSuggestion })

    return {
        success: true, message: "Form submitted successfully."
    }
}
export async function getGiftSuggestions({ boardId }: { boardId: string }) {
    const gifts = await prisma.giftSuggestion.findMany({
        where: { boardId: boardId[0] }
    });
    return gifts;
}
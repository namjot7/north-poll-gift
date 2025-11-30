'use server';
import { giftSuggestionFormSchema } from "../validators";

export async function submitGiftSuggestionForm(
    prevState: unknown,
    formData: FormData
) {
    const gift_suggestion = giftSuggestionFormSchema.parse({
        name: formData.get('name'),
        imageUrl: formData.get('imageUrl'),
        link: formData.get('link'),
        price: formData.get('price'),

    });
    console.log(gift_suggestion)

    // Second way to get input data
    // const entries = Object.fromEntries(formData.entries())



    return {
        success: true, message: "Form submitted successfully."
    }
}
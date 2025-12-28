import z from "zod";

export const signInFormSchema = z.object({
    name: z.string().optional(),
    email: z.email(),
    password: z.string().min(4, 'Password should have atleast 4 characters.'),
})

export const UserSchema = z.object({
    id: z.string(),
    name: z.string().optional(),
    email: z.email(),
})

export const giftSuggestionFormSchema = z.object({
    name: z.string(),
    image: z.string().optional(),
    imageKey: z.string().optional(),
    link: z.string().optional(),
    suggestedBy: z.string(),
    boardId: z.string(),
})

export const updateGiftSuggestionFormSchema = z.object({
    name: z.string(),
    image: z.string().optional(),
    imageKey: z.string().optional(),
    link: z.string().optional(),
})

export const GiftSchema = z.object({
    id: z.string(),
    name: z.string(),
    image: z.string().optional(),
    imageKey: z.string().optional(),
    link: z.string().optional(),
    suggestedBy: z.string(),
    boardId: z.string(),
})
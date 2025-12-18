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

export const createGroupSchema = z.object({
    name: z.string().min(2, "Group name must be at least 2 characters"),
})

export const giftSuggestionFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    imageUrl: z.string(),
    price: z.number().optional(),
    link: z.string().optional(),
    suggestedBy: z.string(),
    boardId: z.string(),
})

export const GiftSchema = z.object({
    id: z.string(),
    name: z.string().min(2, "Name must be at least 2 characters"),
    imageUrl: z.string(),
    price: z.number(),
    link: z.string(),
    suggestedBy: z.string(),
    boardId: z.string(),
})
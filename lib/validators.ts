import z from "zod";

export const signInFormSchema = z.object({
    name: z.string().optional(),
    email: z.email(),
    password: z.string().min(4, 'Password should have atleast 4 characters.'),
})

export const createGroupSchema = z.object({
    name: z.string().min(2, "Group name must be at least 2 characters"),
})

export const giftSuggestionFormSchema = z.object({
    name: z.string().min(2, "Group name must be at least 2 characters"),
    link: z.string().optional(),
    imageUrl: z.string().optional(),
    price: z.string().optional(),
})
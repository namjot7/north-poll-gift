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

export const BoardSchema = z.object({
    id: z.string(),
    name: z.string(),
})

// export const GroupMemberSchema = z.object({
//     id: z.string(),
//     groupId: z.string(),
//     userId: z.string(),
//     user:z.array(UserSchema),
//     // group:z.array(GroupSchema)
// })

// export const GroupSchema = z.object({
//     id: z.string(),
//     name: z.string(),
//     createdBy: z.string(),
//     groupMembers: z.array(GroupMemberSchema),
//     boards: z.array(BoardSchema),
// })


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
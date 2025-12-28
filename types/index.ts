import z from "zod";
import { GiftSchema, UserSchema } from "@/lib/validators";
import { Prisma } from "@prisma/client";

export type User = z.infer<typeof UserSchema>;
export type Gift = z.infer<typeof GiftSchema>;

type formState = {
    success: boolean, message: string
}
export type ServerActionType = (
    prevState: formState, formData: FormData
) => Promise<formState>;

// get type from the QUERY done in Actions
const GroupArgs = Prisma.validator<Prisma.GroupDefaultArgs>()({
    include: {
        groupMembers: {
            include: {
                user: true,
            },
        },
    },
});
// Given this exact query config, tell me the return type Prisma will produce
export type Group = Prisma.GroupGetPayload<typeof GroupArgs>;


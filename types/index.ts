import { GiftSchema, UserSchema } from "@/lib/validators";
import z from "zod";

export type User = z.infer<typeof UserSchema>;
export type Gift = z.infer<typeof GiftSchema>;

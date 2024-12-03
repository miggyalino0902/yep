import { z } from "zod";

export const prizeSchema = z.object({
    email: z.string({ required_error: "Email is Required" }),
});
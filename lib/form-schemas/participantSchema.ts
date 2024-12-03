import { Cluster } from "@prisma/client";
import { z } from "zod";

export const participantSchema = z.object({
  name: z.string({ required_error: "Name is Required"}).min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z
    .string({ required_error: "Email is Required" })
    .email({ message: "Invalid email address" })
    .refine((email) => email.endsWith("@poplarhomes.com"), {
        message: "Email must be a valid Poplar email",
    }),
  cluster: z.nativeEnum(Cluster, { required_error: "Cluster is Required" }),
  role: z.string({required_error: "Role is Required"}), 
});

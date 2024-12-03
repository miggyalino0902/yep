
import { Prisma } from "@prisma/client";

export type ParticipantPrisma = Prisma.ParticipantsGetPayload<{
    include: {
        prize: true;
    };
}>;
import { Participants } from "@prisma/client";
import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { registerParticipant } from "../services/participantServices";

const useRegisterParticipant = (
  mutationOptions: UseMutationOptions<
    Participants,
    Error,
    { participantData: Partial<Participants> }
  >
) =>
  useMutation({
    mutationFn: ({ participantData }) => registerParticipant(participantData),
    ...mutationOptions,
  });


export { useRegisterParticipant };
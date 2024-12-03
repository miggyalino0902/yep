import { useQuery } from "@tanstack/react-query";
import { getParticipantPrize } from "../services/participantServices";

export const useGetParticipantPrize = (id: string) => {
    return useQuery({
        queryKey: ["participants"],
        queryFn: () => getParticipantPrize(id),
    })
}
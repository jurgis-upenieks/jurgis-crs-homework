import {useQueryClient} from "@tanstack/react-query";
import {sendRemoveAddress} from "@/features/Address/api/sendRemoveAddress";

export const useRemoveAddress = () => {
  const queryClient = useQueryClient();

  return async (id: number): Promise<void> =>
    queryClient.fetchQuery({
      queryKey: [`REMOVE_ADDRESS`],
      queryFn: () => sendRemoveAddress(id),
      staleTime: 0,
    });
};
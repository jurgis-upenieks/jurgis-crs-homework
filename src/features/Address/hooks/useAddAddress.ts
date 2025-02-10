import {useQueryClient} from "@tanstack/react-query";
import {Address} from "./../types/AddressTypes";
import {sendAddAddress} from "./../api/sendAddAddress";

export const useAddAddress = () => {
  const queryClient = useQueryClient();

  return async (address: Address): Promise<void> =>
    queryClient.fetchQuery({
      queryKey: [`ADD_ADDRESS`],
      queryFn: () => sendAddAddress(address),
      staleTime: 0,
    });
};
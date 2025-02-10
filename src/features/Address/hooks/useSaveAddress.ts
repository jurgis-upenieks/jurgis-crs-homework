import {useQueryClient} from "@tanstack/react-query";
import {Address} from "./../types/AddressTypes";
import {sendSaveAddress} from "./../api/sendSaveAddress";

export const useSaveAddress = () => {
  const queryClient = useQueryClient();

  return async (address: Address): Promise<void> =>
    queryClient.fetchQuery({
      queryKey: [`SAVE_ADDRESS`],
      queryFn: () => sendSaveAddress(address),
      staleTime: 0,
    });
};
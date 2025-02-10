import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider, useQuery} from "@tanstack/react-query";
import {FC, ReactNode, useCallback, useState} from "react";
import {Address} from "./../types/AddressTypes";
import {AddressesContext} from "./../store/AddressesContext";
import {fetchAddresses} from "./../api/fetchAddresses";

const queryClient = new QueryClient();

const AddressesApiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [refetchInterval, setRefetchInterval] = useState<number | false>(5000);

  const { data: addresses, refetch } = useQuery<Address[]>({
    queryKey: ['GET_ADDRESSES'],
    queryFn: fetchAddresses,
    refetchInterval,
  });

  const enablePeriodicRefetch = useCallback(async () => {
    setRefetchInterval(5000);
    await refetch();
  }, [refetch]);

  const disablePeriodicRefetch = useCallback(() => {
    setRefetchInterval(false);
  }, []);

  const singleRefetch = useCallback(async () => {
    await refetch();
  }, [refetch]);

  return (
    <AddressesContext.Provider value={{ addresses, enablePeriodicRefetch, disablePeriodicRefetch, singleRefetch }}>
      {children}
    </AddressesContext.Provider>
  );
};

export const AddressesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AddressesApiProvider>{children}</AddressesApiProvider>
    </QueryClientProvider>
  );
};
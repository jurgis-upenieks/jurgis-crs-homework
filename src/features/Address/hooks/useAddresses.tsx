import {AddressesContext, AddressesContextValue} from "./../store/AddressesContext";
import {useContext} from "react";

export const useAddresses = (): AddressesContextValue => {
  const context = useContext(AddressesContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
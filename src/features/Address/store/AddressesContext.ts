import {createContext} from "react";
import {Address} from "./../types/AddressTypes";

export interface AddressesContextValue {
  addresses?: Address[];
  enablePeriodicRefetch: () => void;
  disablePeriodicRefetch: () => void;
  singleRefetch: () => void;
}

export const AddressesContext = createContext<AddressesContextValue | undefined>(undefined);
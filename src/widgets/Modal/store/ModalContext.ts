import {createContext, ReactNode} from "react";
import {ModalActions} from "./../hooks/useModal";
import {ModalProps} from "@/widgets/Modal/ui/Modal";

export type ModalContextType = {
  isOpen: boolean;
  details: ModalProps
};


export interface ModalProviderProps {
  children: ReactNode;
}

export const ModalActionsContext = createContext<ModalActions | undefined>(undefined);
export const ModalContext = createContext<ModalContextType | undefined>(undefined);

import {useContext} from "react";
import {ModalActionsContext} from "./../store/ModalContext";
import {ModalProps} from "./../ui/Modal";

export type ModalActions = {
  openModal: (details: ModalProps) => void;
};

export const useModal = (): ModalActions => {
  const context = useContext(ModalActionsContext);
  if (!context) {
    throw new Error();
  }
  return context;
};
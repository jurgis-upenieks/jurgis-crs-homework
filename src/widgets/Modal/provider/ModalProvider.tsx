import {Modal} from "@/widgets";
import {FC, useCallback, useRef, useState} from "react";
import {ModalActionsContext, ModalContext, ModalContextType, ModalProviderProps} from "./../store/ModalContext";
import {ModalProps, ModalRef} from "./../ui/Modal";

export const ModalProvider: FC<ModalProviderProps> = ({ children }) => {
  const [modalState, setModalState] = useState<ModalContextType>({
    isOpen: false,
    details: {title: "", detailsText: "", buttons: [], onButtonClick: undefined}
  });
  const modal = useRef<ModalRef>(null);

  const openModal = useCallback((details: ModalProps) => {
    setModalState({
      isOpen: true,
      details
    });
    modal?.current?.open();
  }, []);

  return (
    <ModalContext.Provider value={modalState}>
      <ModalActionsContext.Provider value={{ openModal }}>
        {children}
        <Modal ref={modal} title={modalState.details.title} detailsText={modalState.details.detailsText} buttons={modalState.details.buttons} onButtonClick={modalState.details.onButtonClick}/>
      </ModalActionsContext.Provider>
    </ModalContext.Provider>
  );
};

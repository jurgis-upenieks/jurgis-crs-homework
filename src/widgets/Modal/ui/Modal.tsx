import {forwardRef, useImperativeHandle, useRef} from "react";
import {ButtonsSC, CloseButtonSC, CloseIconSC, ContentSC, FormSC, HeaderSC, ModalSC, TitleSC} from "./styles";
import {createPortal} from "react-dom";
import {Button} from "@/features";

export type ModalButton = {
  text: string;
  variant: "primary" | "secondary";
};

export type ModalProps = {
  title?: string;
  detailsText?: string;
  buttons: ModalButton[];
  onButtonClick?: (userResponse: string) => void;
};

export type ModalRef = {
  open: () => void;
};

export const Modal = forwardRef<ModalRef, ModalProps>(({ title, detailsText, buttons, onButtonClick: handleButtonClick }: ModalProps, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current?.showModal();
    },
  }));

  return createPortal((
      <ModalSC ref={dialog}>
        <FormSC method="dialog">
          <HeaderSC>
            <TitleSC>{title}</TitleSC>
            <CloseButtonSC>
              <CloseIconSC/>
            </CloseButtonSC>
          </HeaderSC>
          <ContentSC>
            <p role="alert">{detailsText}</p>
            <ButtonsSC>
              {buttons.map((button) => (
                <Button
                  key={`modal__${title}__button__${button.text}`}
                  variant={button.variant}
                  onClick={() => handleButtonClick?.(button.text)}
                  autoFocus={button.variant === "primary"}
                >
                  {button.text}
                </Button>
              ))}
            </ButtonsSC>
          </ContentSC>
        </FormSC>
      </ModalSC>
    ),
    document.getElementById('body') as HTMLElement
  );
});

Modal.displayName = "Modal";
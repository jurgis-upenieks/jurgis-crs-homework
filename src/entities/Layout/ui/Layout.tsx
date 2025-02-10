import {Header, useModal} from "@/widgets";
import {PanelSC} from "./styles";
import {ReactNode, useEffect} from "react";
import {useSpinner} from "@/entities";
import {setSpinnerCallbacks} from "@/shared";

type Props = {
  children: ReactNode;
};


export const Layout = ({children}: Props) => {
  const { showSpinner, hideSpinner } = useSpinner();
  const { openModal } = useModal();

  useEffect(() => {
    setSpinnerCallbacks(
      () => showSpinner(),
      () => hideSpinner(),
      () => openModal({title: 'Error calling back-end', detailsText: 'Try again later. The back-end server might being temporarily serviced.', buttons: [{text: 'Ok', variant: "primary"}]})
    );
  }, [showSpinner, hideSpinner, openModal]);

  return <>
    <Header/>
    <PanelSC>{children}</PanelSC>
  </>;
}

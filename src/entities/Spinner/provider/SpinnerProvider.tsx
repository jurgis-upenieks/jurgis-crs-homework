import {ReactNode, useCallback, useState} from "react";
import {SpinnerContext} from './../store/SpinnerContext'
import {Spinner} from "./../ui/Spinner";

type Props = {
  children: ReactNode;
};

export const SpinnerProvider = ({ children }: Props) => {
  const [isSpinning, setIsSpinning] = useState(false);

  const showSpinner = useCallback(() => setIsSpinning(true), []);
  const hideSpinner = useCallback(() => setIsSpinning(false), []);

  return (
    <SpinnerContext.Provider value={{ isSpinning, showSpinner, hideSpinner }}>
      {children}
      {isSpinning && <Spinner />}
    </SpinnerContext.Provider>
  );
};

import {useContext} from "react";
import {SpinnerContext} from "./../store/SpinnerContext";

export const useSpinner = () => {
  const context = useContext(SpinnerContext);
  if (!context) {
    throw new Error();
  }
  return context;
};

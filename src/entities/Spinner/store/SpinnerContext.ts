import { createContext } from 'react';

export const SpinnerContext = createContext({
  isSpinning: false,
  showSpinner: () => {},
  hideSpinner: () => {},
});

import {ButtonHTMLAttributes, ReactNode} from "react";
import {ButtonSC} from "./styles";

type Props = {
  variant?: "primary" | "secondary";
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, variant = 'primary', ...remainingProps }: Props) => (
  <ButtonSC {...remainingProps} variant={variant}>
    {children}
  </ButtonSC>
);
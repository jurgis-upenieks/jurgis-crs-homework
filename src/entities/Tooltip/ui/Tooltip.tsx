import {HTMLAttributes, ReactNode} from "react";
import {TooltipBubbleSC, TooltipWrapperSC} from "./styles";

type Props = {
  label: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>;

export const Tooltip = ({ label, children, ...remainingProps }: Props) => (
  <TooltipWrapperSC {...remainingProps}>
    {children}
    <TooltipBubbleSC>
      {label}
    </TooltipBubbleSC>
  </TooltipWrapperSC>
);